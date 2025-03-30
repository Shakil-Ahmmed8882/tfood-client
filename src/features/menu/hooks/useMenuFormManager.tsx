import { useState, useRef } from "react";
import { GenericFormRef } from "@/components/form/GenericForm";
import { TMenu } from "@/features/menu";
import { TMenuFormValues } from "@/features/menu/schema.menu";
import {
  useCreateMenuMutation,
  useEditMenuMutation,
} from "@/store/features/menu/menuApi";
import { useMenuModal } from "./useMenuModal";
import { toast } from "sonner";
import { FormEvent } from "react"; // Import FormEvent
import useRestaurants from "@/features/restaurants/hooks/useRestaurants";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
interface UseMenuFormManagerProps {
  menuItem?: TMenu;
  setIsModalOpen: (open: boolean) => void;
}

export const useMenuFormManager = ({
  menuItem,
  setIsModalOpen,
}: UseMenuFormManagerProps) => {
  const user = useAppSelector(selectCurrentUser);

  const filters = { owner_email: user?.email || "" };

  const {
    data: restaurants,

    isLoading: isRestaurantsLoading,
    isFetching: isRestaurantsFetching,
  } = useRestaurants({ filters });

  console.log(restaurants);

  const [createMenu, { isLoading: isCreating }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdating }] = useEditMenuMutation();
  const { isModalOpen } = useMenuModal();
  const [existingImages, setExistingImages] = useState<string[]>(
    menuItem?.related_images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const formRef = useRef<GenericFormRef<TMenuFormValues>>(null);

  const isEditMode = !!menuItem;

  const prepareFormData = (values: TMenuFormValues): FormData => {
    const formData = new FormData();
    const data = isEditMode
      ? { ...values, relatedImagesToRemove: removeImages }
      : values;

    formData.append("data", JSON.stringify(data));
    newImages.forEach((image) => formData.append("related_images", image));
    if (isEditMode && menuItem?.id) formData.append("id", menuItem.id);
    return formData;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (index: number) => {
    setRemoveImages((prev) => [...prev, existingImages[index]]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (
    values: TMenuFormValues | FormEvent<HTMLFormElement>
  ) => {
    // Runtime check to handle FormEvent case (though it won’t occur with GenericForm)
    if ("preventDefault" in values) {
      values.preventDefault();
      return; // Or extract values from formRef.current if needed
    }

    const formValues = values as TMenuFormValues; // Type assertion since we know it’s TMenuFormValues
    const toastId = toast.loading(
      isEditMode ? "Menu updating..." : "Menu creating..."
    );
    try {
      const formData = prepareFormData(formValues);
      const result = await (isEditMode ? updateMenu : createMenu)(
        formData
      ).unwrap();

      if (result.success) {
        toast.success(
          isEditMode
            ? "Menu updated successfully!"
            : "Menu created successfully!",
          { id: toastId, duration: 2000 }
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to save menu. Please try again.", {
        id: toastId,
        duration: 2000,
      });
      console.error("Error saving menu:", error);
    }
  };

  return {
    existingImages,
    newImages,
    removeImages,
    formRef,
    handleImageUpload,
    handleRemoveExistingImage,
    handleRemoveNewImage,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    isCreating,
    isUpdating,
    isEditMode,
    restaurants,
    isRestaurantsFetching,
    isRestaurantsLoading,
  };
};
