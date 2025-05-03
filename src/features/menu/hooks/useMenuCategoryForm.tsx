import { useCreateMenuCategoryMutation, useUpdateMenuCategoryMutation } from "@/store/features/menu-category/menuCategoryApi";
import { toast } from "sonner";
import { TMenuCategory, } from "../menu.type";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { TMenuCategoryFormValues } from "../schema.menu";

export const useMenuCategoryForm = (menuCategory?: TMenuCategory) => {
  const user = useAppSelector(selectCurrentUser);
  const [createMenuCategory, { isLoading: isCreateLoading }] = useCreateMenuCategoryMutation();
  const [updateMenuCategory, { isLoading: isUpdateLoading }] = useUpdateMenuCategoryMutation();

  const handleSubmit = async (values: TMenuCategoryFormValues | any) => {
    const toastId = toast.loading("Saving menu category...");
    values.creator = user?.email;
    
    try {
      if (menuCategory) {
        values.id = menuCategory.id;
        await updateMenuCategory(values).unwrap();
        toast.success("Menu category updated successfully", { id: toastId });
      } else {
        await createMenuCategory(values).unwrap();
        toast.success("Menu category saved successfully", { id: toastId });
      }
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to save menu category", { id: toastId });
      return false;
    }
  };

  return {
    handleSubmit,
    isLoading: isCreateLoading || isUpdateLoading,
    isEditing: !!menuCategory,
  };
};