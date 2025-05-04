import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import React, { useRef } from "react";
import {
  initialMenuCategoryFormValues,
  menuCategoryFormSchema,
  TMenuCategoryFormValues,
} from "../schema.menu";
import { TMenuCategory } from "../menu.type";
import { TextField } from "@/components/form/fields/TextField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMenuCategoryForm } from "../hooks/useMenuCategoryForm";
import { RestaurantOptionsDropdown } from "./RestaurantOptionsDropwn";

interface MenuCategoryModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  menuCategory?: TMenuCategory;
}

export const MenuCategoryModalForm: React.FC<MenuCategoryModalFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  menuCategory,
}) => {
  const formRef = useRef<GenericFormRef<TMenuCategoryFormValues>>(null);
  const { handleSubmit, isLoading, isEditing } =
    useMenuCategoryForm(menuCategory);
  const handleFormSubmit = async (values: TMenuCategoryFormValues | any) => {
    const success = await handleSubmit(values);
    if (success) {
      setIsModalOpen(false); // Close modal on success
      formRef.current?.reset(); // Reset form
    }
  };
  return (
    <ReusableModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={isEditing ? "Edit Category" : "Create Category"}
      subtitle={
        isEditing
          ? "Edit an existing category"
          : "Create a new category"
      }
    >
      <GenericForm
        schema={menuCategoryFormSchema}
        initialValues={menuCategory ?? initialMenuCategoryFormValues}
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className="space-y-4">
            <RestaurantOptionsDropdown/>

          <TextField<TMenuCategoryFormValues>
            name="name"
            label="Category Name"
            placeholder="Category Name"
          />

          {/* <TextField<TMenuCategoryFormValues>
            name="description"
            label="Description"
            placeholder="Description"
          /> */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className={cn(
              "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
            )}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </div>
        </div>

      </GenericForm>
    </ReusableModal>
  );
};
