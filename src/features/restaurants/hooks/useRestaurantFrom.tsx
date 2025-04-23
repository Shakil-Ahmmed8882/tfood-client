// useRestaurantFormLogic.ts
import { FormEvent, useCallback, useRef, useState } from "react";
import { useCreateRestaurantMutation, useUpdateRestaurantMutation } from "@/store/features/restaurants/restaurantApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { toast } from "sonner";
import { TRestaurantFromValues } from "../schema.restaurant";
import { GenericFormRef } from "@/components/form/GenericForm";
import { USER_ROLES } from "@/constants";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";


interface RestaurantFormProps {
  restaurant?: Partial<TRestaurantFromValues>;
  onOpenChange: (open: boolean) => void;
}

export const useRestaurantForm = ({ restaurant, onOpenChange }: RestaurantFormProps) => {
  const user = useAppSelector(selectCurrentUser);
  // console.log(restaurant);
  const [createRestaurant, { isLoading: isCreating }] = useCreateRestaurantMutation();
  const [updateRestaurant, { isLoading: isUpdating }] = useUpdateRestaurantMutation();
  const [logo, setLogo] = useState<File | null>(null);
  const formRef = useRef<GenericFormRef<TRestaurantFromValues>>(null);

  const isLoading = isCreating || isUpdating;

  // Memoize handleSubmit to prevent unnecessary re-renders
  const handleSubmit = useCallback(
    async (values: FormEvent<HTMLFormElement> | TRestaurantFromValues) => {
      const toastId = toast.loading(restaurant ? "Updating restaurants..." : "Creating restaurants...");
      const formData = new FormData();
      try {
        if (logo) {
          formData.append("logo", logo);
        }

        if (restaurant?.id) {
          // Update existing restaurant
          formData.append("data", JSON.stringify(values));
          formData.append("id", restaurant.id);
         const res=  await updateRestaurant(formData).unwrap();
          // console.log('update res>>',res);


        } if(user?.role === USER_ROLES.SHOP_OWNER && !restaurant?.id){
          // If user is a shop owner and restaurant id is not present, create new restaurant{
          // Create new restaurant
          const formDataWithId = { ...values, user: user!.userId };
          formData.append("data", JSON.stringify(formDataWithId));
        console.log(Object.values(formDataWithId));
          await createRestaurant(formData).unwrap();
        }
         if(user?.role === USER_ROLES.ADMIN && !restaurant?.id){
          const formDataWithId = { ...values};
          formData.append("data", JSON.stringify(formDataWithId));
          await createRestaurant(formData).unwrap();
        }

        setLogo(null);
        onOpenChange(false);
        toast.success(restaurant ? "Restaurant updated!" : "New restaurant created!", { id: toastId });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to save restaurant", { id: toastId });
      }
    },
    [logo, restaurant, user, createRestaurant, updateRestaurant, onOpenChange]
  );




  // Memoize handleFileUpload
  const handleFileUpload = useCallback((file: File) => {
    if (!file) return;
    
    setLogo(file);
    return URL.createObjectURL(file);
  }, []);


  return { isLoading, handleSubmit, handleFileUpload, user ,formRef};
};
