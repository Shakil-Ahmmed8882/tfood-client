import { useState, useMemo } from "react";
import { useCreateMenuMutation, useEditMenuMutation } from "@/store/features/menu/menuApi";
import { useMenuModal } from "./useMenuModal";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { TMenuFormValues } from "../schema.menu";
import { TMenu } from "../menu.type";


// More explicit type definitions
type NewImage = { type: "new"; file: File };
type ExistingImage = { type: "existing"; url: string };
type ImageType = NewImage | ExistingImage;

type FormMode = "create" | "edit";

interface UseMenuFormManagerProps {
  menuItem?: TMenu;
  setIsModalOpen?: (open: boolean) => void;
}

export const useMenuFormManager = ({ 
  menuItem, 
  setIsModalOpen 
}: UseMenuFormManagerProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [createMenu, { isLoading: isCreateLoading }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdateLoading }] = useEditMenuMutation();
  const { isModalOpen } = useMenuModal();

  const mode: FormMode = menuItem ? "edit" : "create";
  const isLoading = mode === "create" ? isCreateLoading : isUpdateLoading;

  // More type-safe initial images
  const initialImages: ImageType[] = useMemo(() => 
    menuItem?.related_images?.map(url => ({ 
      type: "existing" as const,  // Explicitly set as constant
      url 
    })) || [],
    [menuItem]
  );

  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  // Type predicates for filtering
  const existingImages = images.filter(
    (img): img is ExistingImage => img.type === "existing"
  );
  const newImages = images.filter(
    (img): img is NewImage => img.type === "new"
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: NewImage[] = Array.from(e.target.files).map(file => ({ 
      type: "new" as const, 
      file 
    }));
    setImages(prev => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    const image = images[index];
    if (image.type === "existing") {
      setImagesToRemove(prev => [...prev, image.url]);
    }
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: TMenuFormValues | any) => {
    if (!user?.email) {
      toast.error("User authentication required");
      return;
    }

    const toastId = toast.loading(`${mode === "create" ? "Creating" : "Updating"} menu...`);
    
    try {
      const formData = new FormData();
      const menuData = {
        ...values,
        ...(mode === "edit" ? { 
          relatedImagesToRemove: imagesToRemove 
        } : { 
          creator: user.email 
        })
      };

      formData.append("data", JSON.stringify(menuData));
      newImages.forEach(({ file }) => formData.append("related_images", file));

      if (mode === "edit" && menuItem?.id) {
        formData.append("id", menuItem.id);
      }

      const result = await (mode === "edit" ? updateMenu : createMenu)(formData).unwrap();
      
      if (result.success) {
        toast.success(`Menu ${mode === "create" ? "created" : "updated"} successfully!`, { id: toastId });
        setIsModalOpen?.(false);
        setImages([]);
      }
    } catch (error) {
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} menu.`, { id: toastId });
      console.error("Menu submission error:", error);
    }
  };

  return {
    images,
    existingImages,
    newImages,
    isModalOpen,
    isLoading,
    isCreating: isCreateLoading,
    isUpdating: isUpdateLoading,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    setIsModalOpen
  };
};