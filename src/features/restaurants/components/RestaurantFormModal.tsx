import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { GenericForm } from "@/components/form/GenericForm";
import { TextField } from "@/components/form/fields/TextField";
import { ImageUploadField } from "@/components/form/fields/ImageUploadField";
import { SelectField } from "@/components/form/fields/SelectField";
import {
  initialRestaurantValues,
  RestaurantSchema,
  TRestaurantFromValues,
} from "../schema.restaurant";
import { useRestaurantForm } from "../hooks/useRestaurantFrom";
import { USER_ROLES } from "@/constants";
import { HasRole } from "@/lib/pm/AuthGuard";
import { restaurantStatusOptions } from "./constants";
import { ShopOwnerDropdown } from "./ShopOwnerDropdown";

interface RestaurantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant?: Partial<TRestaurantFromValues>;
}

export function RestaurantFormModal({
  open,
  onOpenChange,
  restaurant,
}: RestaurantFormProps) {
  const { isLoading, handleFileUpload, handleSubmit, formRef } =
    useRestaurantForm({ restaurant, onOpenChange });

  // Memoize form fields to prevent unnecessary re-renders
  const FormFields = () => (
    <div className="space-y-4">
      <ImageUploadField<TRestaurantFromValues>
        name="logo"
        label="Shop Logo"
        onUpload={handleFileUpload}
        className="border-gray-50 w-full"
        disabled={isLoading}
      />

      <HasRole requiredRole={USER_ROLES.ADMIN}>
        <SelectField
          name="status"
          label="Status"
          options={restaurantStatusOptions}
        />
      </HasRole>
      <HasRole requiredRole={USER_ROLES.ADMIN}>
        <ShopOwnerDropdown />
      </HasRole>

      <TextField<TRestaurantFromValues>
        name="name"
        placeholder="Enter Shop Name"
        required
        label="Shop Name"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="website"
        placeholder="Enter Shop Website"
        label="Shop Website"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="contact"
        placeholder="Enter Shop Contact"
        required
        label="Shop Contact"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="location"
        placeholder="Enter Shop Location"
        label="Shop Location"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="type"
        placeholder="Enter your Shop Type"
        label="Shop Type"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="description"
        placeholder="Enter your description"
        label="Shop Description"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="category"
        placeholder="Enter your Shop category"
        label="Shop Category"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <ReusableModal
      open={open}
      onOpenChange={onOpenChange}
      title={restaurant ? "Edit Restaurant" : "Add Restaurant"}
    >
      <GenericForm
        schema={RestaurantSchema}
        initialValues={restaurant || initialRestaurantValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <FormFields />
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={cn(
              "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
            )}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </GenericForm>
    </ReusableModal>
  );
}
