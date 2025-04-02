export { useGetAllRestaurantsQuery } from "@/store/features/restaurants/restaurantApi";
export { RestaurantCard } from "./components/RestaurantCard";
export { default as RestaurantSkeleton } from "./components/RestaurantSkeleton";
export { CustomSuspense } from "@/components/wrapper/CustomSuspense";
export { CustomErrorBoundary } from "@/components/wrapper/CustomErrorBoundary";
export { NoItemFound } from "@/components/wrapper/noItemFoundContainer";
export { default as ShouldPaginateWrapper } from "@/components/wrapper/shouldPaginateWrapper";
export { CustomPagination } from "@/components/custom-ui/pagination";
export type { TRestaurant } from "./type.restaurant";







// ____________________ contants _______________________
export const restaurantCategoryOptions = [
  { name: "food", value: "food" },
  { name: "Italian", value: "Italian" },
  { name: "sweet", value: "sweet" },
  { name: "fast food", value: "fast food" },
];
export const restaurantTableHeadsOptions = [
    "SI NO.",
    "Name",
    "Date",
    "Location",
    "Type",
    "Subscription",
    "Status",
    "Action",
  ];