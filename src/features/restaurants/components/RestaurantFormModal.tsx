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
import { DateField } from "@/components/form/fields/DateField";
import { TimePickerField } from "@/components/form/fields/TimePickerField";

interface RestaurantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant?: Partial<TRestaurantFromValues>;
}

export function RestaurantFormModal({
  open,
  onOpenChange,
  restaurant,
}: any & RestaurantFormProps) {

  const { isLoading, handleFileUpload, handleSubmit, formRef } =
    useRestaurantForm({ restaurant, onOpenChange });
  // Memoize form fields to prevent unnecessary re-renders
  // console.log(restaurant);
    // Normalize restaurant data
    const normalizedRestaurant = {
      ...initialRestaurantValues,
      ...restaurant,
      subscription: {
          startDate: restaurant?.subscription?.startDate
              ? new Date(restaurant.subscription.startDate)
              : null,
          endDate: restaurant?.subscription?.endDate
              ? new Date(restaurant.subscription.endDate)
              : null,
      },
  };


  const FormFields = () => (
    <div className="space-y-4">
      <ImageUploadField<TRestaurantFromValues>
        name="logo"
        label="Logo"
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
      <HasRole requiredRole={USER_ROLES.ADMIN}>
      <div className="grid grid-cols-2 gap-4">
        <DateField<TRestaurantFromValues>
          name="subscription.startDate"
          label="Subscription start date"
        />
        <DateField<TRestaurantFromValues>
          name="subscription.endDate"
          label="Subscription end date"
        />
      </div>
      </HasRole>
      <TextField<TRestaurantFromValues>
        name="name"
        placeholder="Enter Restaurant Name"
        required={true}
        label="Name"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
    <div className="flex gap-4 w-full">

    <TimePickerField name="operating_hours.open" label="Opening Time"/>
    <TimePickerField name="operating_hours.close" label="Closing Time"/>
    </div>

      <TextField<TRestaurantFromValues>
        name="website"
        placeholder="Enter your Website-(optional)"
        label="Website"
        inputClass="border-gray-50"
        disabled={isLoading}
      />

      <TextField<TRestaurantFromValues>
        name="contact"
        placeholder="Enter your Contact"
        required={true}
        label="Contact"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="location"
        placeholder="Enter your Location"
        label="Location"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      {/* <TextField<TRestaurantFromValues>
        name="type"
        placeholder="Enter your Shop Type"
        label="Shop Type"
        inputClass="border-gray-50"
        disabled={isLoading}
      /> */}
      <TextField<TRestaurantFromValues>
        name="description"
        placeholder="Enter your description"
        label="Description"
        inputClass="border-gray-50"
        disabled={isLoading}
      />
      <TextField<TRestaurantFromValues>
        name="category"
        placeholder="Enter your category"
        label="Category"
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
        initialValues={normalizedRestaurant}
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
      <div>
    </div>
    </ReusableModal>
  );
}
