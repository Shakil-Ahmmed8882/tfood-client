import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { TMenu, TMenuCategory } from "../menu.type";
import { GenericForm } from "@/components/form/GenericForm";
import {
  initialMenuFormValues,
  menuFormSchema,
  TMenuFormValues,
} from "../schema.menu";
import { TextField } from "@/components/form/fields/TextField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMenuFormManager } from "../hooks/useMenuFormManager";
import { SelectField } from "@/components/form/fields/SelectField";
import { TRestaurant } from "@/features/restaurants";

interface MenuModalFormProps {
  menuItem?: TMenu;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const MenuModalForm: React.FC<MenuModalFormProps> = ({
  menuItem,
  isModalOpen,
  setIsModalOpen,
}) => {
  const {
    existingImages,
    newImages,
    formRef,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    isCreating,
    isUpdating,
    restaurants,
    menu_categories,
  } = useMenuFormManager({ menuItem, setIsModalOpen });

  // const v= formRef.current?.getValues("restaurant");
  
// console.log(formRef.current?.getValues());
  return (
    <ReusableModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title="Edit Menu"
      subtitle="Edit menu details"
    >
      <GenericForm
        schema={menuFormSchema}
        initialValues={menuItem ?? initialMenuFormValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="space-y-4">
          {restaurants && (
            <SelectField<TMenuFormValues>
              name="restaurant"
              label="Select Restaurant"
              placeholder="Select a Restaurant"
              options={restaurants?.map((r: TRestaurant) => {
                return {
                  value: r.id,
                  text: r.name,
                };
              })}
            />
          )}
          <TextField<TMenuFormValues> name="title" label="Title" />
          <TextField<TMenuFormValues>
            name="price"
            label="Price"
            type="number"
          />
          <TextField<TMenuFormValues> name="description" label="Description" />
          {/* <TextField<TMenuFormValues>
            name="food_category"
            label="Food Category"
          /> */}
          {menu_categories && (
            <SelectField<TMenuFormValues>
              name="food_category"
              label="Food Category"
              placeholder="Select a Category"
              options={menu_categories?.map((c: TMenuCategory) => {
                return {
                  value: c.name,
                  text: c.name,
                };
              })}
            />
          )}
        </div>
        <div className="space-y-4 my-3">
          <FormLabel htmlFor="image-upload mb-2">Images</FormLabel>
          <Input
            id="image-upload"
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        <div className="space-y-4">
          {existingImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Existing Images</h4>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((image, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={image.url}
                      alt={`Menu Item ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {newImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">New Images</h4>
              <div className="flex flex-wrap gap-2">
                {newImages.map((image, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt={`New Image ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
          >
            {isCreating
              ? "Creating..."
              : isUpdating
              ? "Updating..."
              : menuItem
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </GenericForm>
    </ReusableModal>
  );
};

MenuModalForm.displayName = "MenuModalForm";
