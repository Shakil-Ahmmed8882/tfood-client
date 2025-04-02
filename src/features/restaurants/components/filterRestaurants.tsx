import { TableFilter } from "@/components/table/TableFilter";
import useRestaurants from "../hooks/useRestaurants";
import { SingleTabSkeleton } from "@/components/skeleton/tabSkeleton";

/**
 * MenuTableTopHeadings Component:
 * - Displays the title and action buttons (search, filter, add menu).
 * - Purpose: Allow admin to search, filter, and add menu items.
 * - Example: Admin clicks 'Add Menu' -> Opens modal/form for menu creation.
 */
export const FilterRestaurants = () => {

  const {data, isLoading} = useRestaurants({ filters: {} });
  const restaurantOptions = data?.map((f) => ({name:f.name, value:f.id})) || []
  

  if(isLoading) return <SingleTabSkeleton/> 

  return (
    <>
    
    <TableFilter {...{isLoading}}
     filterArray={restaurantOptions}  title="Restaurant" fieldName="restaurant" />
    </>
  );
};
