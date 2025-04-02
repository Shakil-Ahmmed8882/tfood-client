import { SingleTabSkeleton } from "@/components/skeleton/tabSkeleton";
import { TableFilter } from "@/components/table/TableFilter";
import useMenuCategories from "@/features/menu/hooks/useMenuCategories";
import { useMemo } from "react";

/**
 * MenuTableTopHeadings Component:
 * - Displays the title and action buttons (search, filter, add menu).
 * - Purpose: Allow admin to search, filter, and add menu items.
 * - Example: Admin clicks 'Add Menu' -> Opens modal/form for menu creation.
 */
export const FilterByMenuCategory = () => {

    const {data, isLoading} = useMenuCategories({ filters: {} });
  
    // Memoize the computed arrays to prevent unnecessary re-renders
    const menuFoodCategoryOptions = useMemo(() => data?.map((f) => ({name:f.name, value:f.name})) || [], [data]);
  
  
  if(isLoading) return <SingleTabSkeleton/> 

  return (
    <>
    <TableFilter {...{isLoading}}
     filterArray={menuFoodCategoryOptions}  title="Menu category" fieldName="food_category" />
    </>
  );
};
