import { useState, useRef, useMemo, FormEvent } from "react";
import { GenericFormRef } from "@/components/form/GenericForm";
import { TMenu } from "@/features/menu";
import { TMenuFormValues } from "@/features/menu/schema.menu";
import { 
  useCreateMenuMutation, 
  useEditMenuMutation 
} from "@/store/features/menu/menuApi";
import { useMenuModal } from "./useMenuModal";
import { toast } from "sonner";
import useRestaurants from "@/features/restaurants/hooks/useRestaurants";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useMenuCategories from "./useMenuCategories";

type ImageType = { 
  type: "new"; 
  file: File 
} | { 
  type: "existing"; 
  url: string 
};

type FormMode = "create" | "edit";

interface UseMenuFormManagerProps {
  menuItem?: TMenu;
  setIsModalOpen: (open: boolean) => void;
}

const getToastMessages = (mode: FormMode) => ({
  loading: `${mode === "create" ? "Creating" : "Updating"} menu...`,
  success: `Menu ${mode === "create" ? "created" : "updated"} successfully!`,
  error: `Failed to ${mode === "create" ? "create" : "update"} menu.`
});

export const useMenuFormManager = ({
  menuItem,
  setIsModalOpen
}: UseMenuFormManagerProps) => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  // console.log(restaurantId);
  // Auth and Data
  const user = useAppSelector(selectCurrentUser);
  const formRef = useRef<GenericFormRef<TMenuFormValues>>(null);

  // API Operations with loading states
  const [createMenu, { isLoading: isCreateLoading }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdateLoading }] = useEditMenuMutation();
  
  // Restaurant Data
  const { data: restaurants, isLoading: isRestaurantsLoading } = useRestaurants({ 
    filters: { owner_email: user?.email || "" } 
  });

  // Menu Data
  const {data: menu_categories, isLoading: isMenuCategoriesLoading} = useMenuCategories({filters: {creator: user?.email || ""}});


  // Image State Management
  const initialImages = useMemo(() => 
    menuItem?.related_images?.map(url => ({ type: "existing" as const, url })) || [],
    [menuItem]
  );

  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  // Modal and Mode
  const { isModalOpen } = useMenuModal();
  const mode: FormMode = menuItem ? "edit" : "create";
  const isLoading = mode === "create" ? isCreateLoading : isUpdateLoading;

  // Derived Values
  const existingImages = useMemo(() => 
    images.filter((img): img is { type: "existing"; url: string } => 
      img.type === "existing"
    ),
    [images]
  );

  const newImages = useMemo(() => 
    images.filter((img): img is { type: "new"; file: File } => 
      img.type === "new"
    ),
    [images]
  );

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
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

  // Form Submission
  const prepareFormData = (values: TMenuFormValues | FormEvent<HTMLFormElement>): FormData => {
    if (!user?.email) {
      throw new Error("User authentication required");
    }

    const formData = new FormData();
    const menuData = {
      ...values,
      ...(mode === "edit" ? { relatedImagesToRemove: imagesToRemove } : { creator: user.email })
    };

    formData.append("data", JSON.stringify(menuData));
    newImages.forEach(({ file }) => formData.append("related_images", file));

    if (mode === "edit" && menuItem?.id) {
      formData.append("id", menuItem.id);
    }

    return formData;
  };

  const handleSubmit = async (values: TMenuFormValues | FormEvent<HTMLFormElement>) => {
    const { loading, success, error } = getToastMessages(mode);
    const toastId = toast.loading(loading);
    try {
      const formData = prepareFormData(values);
      const result = await (mode === "edit" ? updateMenu : createMenu)(formData).unwrap();

      if (result.success) {
        toast.success(success, { id: toastId });
        setIsModalOpen(false);
        setImages([]);
      }
    } catch (err) {
      const errorObj = err as FetchBaseQueryError;
      const errorMessage = typeof errorObj.data === "object" 
        ? (errorObj.data as { message?: string })?.message || error
        : error;

      toast.error(errorMessage, { id: toastId });
      console.error("Menu submission error:", errorObj);
    }
  };

  return {
    // State
    images,
    existingImages,
    newImages,
    isModalOpen,
    
    // Refs
    formRef,
    
    // Loading States
    isLoading,
    isCreating: isCreateLoading, // Explicit create loading state
    isUpdating: isUpdateLoading, // Explicit update loading state
    isMenuCategoriesLoading,  // Explicit update loading state
    isRestaurantsLoading,
    
    // Data
    restaurants,
    menu_categories,
    
    // Handlers
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    
    // Setters
    setIsModalOpen,
    
    // Mode
    // isEditMode: mode === "edit",
    setRestaurantId
  };
};