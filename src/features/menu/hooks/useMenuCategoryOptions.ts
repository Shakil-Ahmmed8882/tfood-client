import useMenuCategories from "./useMenuCategories";

export const useMenuCategoryOptions = ({restaurantId}:{restaurantId: string}) => {
      const {data: menuCategories, isLoading: isMenuCategoriesLoading} = useMenuCategories({filters: {restaurant: restaurantId || ""}});
      const categoriesOptions = menuCategories?.map((category) => ({
        value: category.name,
        text: category.name,
      })) || [];
    return {categoriesOptions, isMenuCategoriesLoading}
};
