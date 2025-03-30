import { TRestaurant, useGetAllRestaurantsQuery } from "@/features/restaurants";
import { useGetShopOwnerRestaurantsQuery } from "@/store/features/shop-owner/shopOwnerApi";

interface UseRestaurantsProps {
  userRole: "admin" | "shop_owner";
  shopOwnerId?: string; // Optional, required only for shop_owner role
}

export const useGetRestaurantsByRole = ({ userRole, shopOwnerId }: UseRestaurantsProps) => {
  // Fetch all restaurants for admin
  const {
    data: adminRestaurantsData,
    isFetching: isAdminRestaurantsFetching,
    isLoading: isAdminRestaurantsLoading,
  } = userRole === "admin"
    ? useGetAllRestaurantsQuery(undefined)
    : { data: undefined, isFetching: false, isLoading: false };

  // Fetch shop owner's restaurants
  const {
    data: shopOwnerRestaurantsData,
    isFetching: isShopOwnerRestaurantsFetching,
    isLoading: isShopOwnerRestaurantsLoading,
  } = userRole === "shop_owner" && shopOwnerId
    ? useGetShopOwnerRestaurantsQuery(shopOwnerId)
    : { data: undefined, isFetching: false, isLoading: false };

  // Determine the restaurants based on role
  const restaurants = userRole === "admin"
    ? (adminRestaurantsData?.data as TRestaurant[])
    : (shopOwnerRestaurantsData?.data as TRestaurant[]);

  const isFetching = userRole === "admin"
    ? isAdminRestaurantsFetching
    : isShopOwnerRestaurantsFetching;

  const isLoading = userRole === "admin"
    ? isAdminRestaurantsLoading
    : isShopOwnerRestaurantsLoading;

  return {
    restaurants,
    isFetching,
    isLoading,
  };
};