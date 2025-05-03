import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { TMenu } from "../menu.type";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
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
import { useEffect, useRef, useState } from "react";

import { CategoryOptionsDropdown } from "./CategoryOptionsDropdown";
import { RestaurantOptionsDropdown } from "./RestaurantOptionsDropwn";

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
  const formRef = useRef<GenericFormRef<TMenuFormValues>>(null);
  const [restaurantId, setRestaurantId] = useState<string>("");

  const {
    existingImages,
    newImages,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    isCreating,
    isUpdating,
  } = useMenuFormManager({ menuItem, setIsModalOpen });
  // console.log(resId,menu_categories);
  useEffect(() => {
    if (menuItem?.restaurant) {
      setRestaurantId(menuItem.restaurant as string); 
    }
  }, [menuItem?.restaurant]);

  const handleSelectChange = (value: string) => {
    setRestaurantId(value); 
  };
  // console.log({ restaurantId, menuItem });
  return (
    <ReusableModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={menuItem ? "Edit Menu" : "Add Menu"}
      subtitle={menuItem ? "Edit menu details" : "Add menu details"}
    >
      <GenericForm
        schema={menuFormSchema}
        initialValues={menuItem ?? initialMenuFormValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="space-y-4">
          {/* {restaurantOptions && (
            <SelectField<TMenuFormValues>
              name="restaurant"
              label="Select Restaurant"
              placeholder="Select a Restaurant"
              onChange={handleSelectChange}
              loading={isRestaurantsLoading}
              options={restaurantOptions}
            />
          )} */}

            <RestaurantOptionsDropdown handleSelectChange={handleSelectChange}/>

          <TextField<TMenuFormValues> name="title" label="Title" />
          <TextField<TMenuFormValues>
            name="price"
            label="Price"
            type="number"
          />
          <TextField<TMenuFormValues> name="description" label="Description" />


            <CategoryOptionsDropdown restaurantId={restaurantId} />

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
