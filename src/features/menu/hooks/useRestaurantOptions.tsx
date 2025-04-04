import useRestaurants from "@/features/restaurants/hooks/useRestaurants";
import { TRestaurant } from "@/features/restaurants";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
type TRestaurantOption = {
  value: string;
  text: string;
};
export const useRestaurantOptions = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: restaurants, isLoading: isRestaurantsLoading } = useRestaurants({
    filters: { owner_email: user?.email || "" },
  });

  const restaurantOptions: TRestaurantOption[] = restaurants?.map((r: TRestaurant) => ({
    value: r.id,
    text: r.name,
  })) || [];

  return {
    restaurantOptions,
    isRestaurantsLoading,
    
  };
};