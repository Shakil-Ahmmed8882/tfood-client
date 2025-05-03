import { useState, useMemo } from "react";
import { useCreateMenuMutation, useEditMenuMutation } from "@/store/features/menu/menuApi";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { TMenuFormValues } from "../schema.menu";
import { TMenu } from "../menu.type";
import { FieldValues } from "react-hook-form";

// Define types for image handling
type NewImage = { type: "new"; file: File };       // Represents a newly uploaded image file
type ExistingImage = { type: "existing"; url: string };  // Represents an already existing image URL
type ImageType = NewImage | ExistingImage;         // Union type for all image types

type FormMode = "create" | "edit";                 // Possible form modes

interface UseMenuFormManagerProps {
  menuItem?: TMenu;                // Optional menu item for edit mode
  setIsModalOpen?: (open: boolean) => void;  // Optional modal state setter
}

/**
 * Custom hook for managing menu form state and operations
 * Handles both creation and editing of menu items
 * Manages image uploads, form submission, and loading states
 */
export const useMenuFormManager = ({ 
  menuItem, 
  setIsModalOpen 
}: UseMenuFormManagerProps) => {
  // Get current user from Redux store
  const user = useAppSelector(selectCurrentUser);
  
  // API mutation hooks for creating and updating menus
  const [createMenu, { isLoading: isCreateLoading }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdateLoading }] = useEditMenuMutation();
  

  // Determine if we're in create or edit mode based on whether menuItem is provided
  const mode: FormMode = menuItem ? "edit" : "create";
  
  // Loading state based on current mode
  const isLoading = mode === "create" ? isCreateLoading : isUpdateLoading;

  // Initialize images array - converts existing image URLs to ImageType objects
  const initialImages: ImageType[] = useMemo(() => 
    menuItem?.related_images?.map(url => ({ 
      type: "existing" as const,  // Explicitly set as constant for type safety
      url 
    })) || [],
    [menuItem]
  );

  // State for managing images (both existing and new)
  const [images, setImages] = useState<ImageType[]>(initialImages);
  
  // State to track images that need to be removed (existing images only)
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  // Filter helpers to separate image types with proper type narrowing
  const existingImages = images.filter(
    (img): img is ExistingImage => img.type === "existing"
  );
  const newImages = images.filter(
    (img): img is NewImage => img.type === "new"
  );

  /**
   * Handles new image uploads from file input
   * @param e - File input change event
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // Convert FileList to array of NewImage objects
    const newFiles: NewImage[] = Array.from(e.target.files).map(file => ({ 
      type: "new" as const, 
      file 
    }));
    
    // Add new images to state
    setImages(prev => [...prev, ...newFiles]);
  };

  /**
   * Removes an image from the form
   * @param index - Index of image to remove in the images array
   */
  const handleRemoveImage = (index: number) => {
    const image = images[index];
    
    // If removing an existing image, track its URL for server-side removal
    if (image.type === "existing") {
      setImagesToRemove(prev => [...prev, image.url]);
    }
    
    // Remove the image from state
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Handles form submission for both create and edit modes
   * @param values - Form values from the menu form
   */
  const handleSubmit = async (values: TMenuFormValues | FieldValues) => {
    // Validate user is authenticated
    if (!user?.email) {
      toast.error("User authentication required");
      return;
    }

    // Show loading toast
    const toastId = toast.loading(`${mode === "create" ? "Creating" : "Updating"} menu...`);
    
    try {
      // Prepare form data for submission
      const formData = new FormData();
      
      // Construct menu data object
      const menuData = {
        ...values,
        ...(mode === "edit" ? { 
          relatedImagesToRemove: imagesToRemove  // Include images to remove in edit mode
        } : { 
          creator: user.email                  // Include creator in create mode
        })
      };

      // Append data as JSON string
      formData.append("data", JSON.stringify(menuData));
      
      // Append new image files
      newImages.forEach(({ file }) => formData.append("related_images", file));

      // If in edit mode, append menu ID
      if (mode === "edit" && menuItem?.id) {
        formData.append("id", menuItem.id);
      }

      // Call appropriate mutation based on mode
      const result = await (mode === "edit" ? updateMenu : createMenu)(formData).unwrap();
      
      // Handle success
      if (result.success) {
        toast.success(`Menu ${mode === "create" ? "created" : "updated"} successfully!`, { id: toastId });
        setIsModalOpen?.(false);  // Close modal if setter is provided
        setImages([]);           // Reset images state
      }
    } catch (error) {
      // Handle error
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} menu.`, { id: toastId });
      console.error("Menu submission error:", error);
    }
  };

  // Expose state and handlers to consuming components
  return {
    images,                  // All images (existing + new)
    existingImages,          // Only existing images
    newImages,              // Only new images
    isLoading,              // General loading state
    isCreating: isCreateLoading,  // Specific create loading state
    isUpdating: isUpdateLoading,  // Specific update loading state
    handleImageUpload,      // Image upload handler
    handleRemoveImage,      // Image removal handler
    handleSubmit,          // Form submission handler
    setIsModalOpen        // Modal state setter
  };
};