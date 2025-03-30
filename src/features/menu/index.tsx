export { useGetAllMenusQuery } from "@/store/features/menu/menuApi";
export { MenuCard } from "./components/MenuCard";
export { default as MenuSkeleton } from "./components/MenuSkeleton";
export { CustomSuspense } from "@/components/wrapper/CustomSuspense";
export { CustomErrorBoundary } from "@/components/wrapper/CustomErrorBoundary";
export { NoItemFound } from "@/components/wrapper/noItemFoundContainer";
export { default as ShouldPaginateWrapper } from "@/components/wrapper/shouldPaginateWrapper";
export { CustomPagination } from "@/components/custom-ui/pagination";
export type { TMenu } from "./menu.type";



// ____________________ contants _______________________
export const menuFoodCategoryOptions = ["category_1", "Main Course"]
export const menuTableHeadsOptions = ["Sl No.", "Title", "Price", "Restaurant Name", "Create Date", "Location", "Type", "Action"]
