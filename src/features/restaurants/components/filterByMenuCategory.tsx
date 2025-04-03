import { SingleTabSkeleton } from "@/components/skeleton/tabSkeleton";
import { TableFilter } from "@/components/table/TableFilter";
import useMenuCategories from "@/features/menu/hooks/useMenuCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

/**
 * FilterByMenuCategory Component:
 * Purpose: Provides a filtering interface for menu categories.
 * Use Case: Admin wants to filter menu items by category name or search.
 * Output: Renders a TableFilter component with menu category options.
 */
export const FilterByMenuCategory = () => {

    /**
     * State and Debouncing Logic:
     * Purpose: Manages the search query and debounces it for efficient searching.
     * Use Case: User types in the search input -> Debounced value is used to fetch data.
     * Output: Updated search query and debounced search value.
     */
    const [searchQuery, onChangeFilterSearch] = useState<string>("");
    const debouncedSearchValue = useDebounce<string>(searchQuery, 300);

    /**
     * Data Fetching and Options Generation:
     * Purpose: Fetches menu category data based on search and generates filter options.
     * Use Case: Component mounts or search query changes -> Fetches data and maps to options.
     * Output: Menu category data and filter options array for the TableFilter.
     */
    const {data, isLoading, isFetching} = useMenuCategories({ searchQuery:debouncedSearchValue, filters: {} });
    const menuFoodCategoryOptions = isLoading || isFetching ? [] : data?.map((f) => ({name:f.name, value:f.name})) || []

    /**
     * Loading State Handling:
     * Purpose: Displays a skeleton loader during data loading.
     * Use Case: While menu category data is loading -> Shows a loading indicator.
     * Output: SingleTabSkeleton component during loading.
     */
    if(isLoading) return <SingleTabSkeleton/> 

    /**
     * Rendering the TableFilter:
     * Purpose: Renders the TableFilter component with search and filter functionality.
     * Use Case: User interacts with the search input or filter dropdown -> Filters menu category list.
     * Output: TableFilter component with search and filter capabilities.
     */
    return (
        <>
            <TableFilter 
                isLoading={isLoading || isFetching}
                {...{searchQuery, onChangeFilterSearch}}
                shouldSearch={true}
                filterArray={menuFoodCategoryOptions} 
                title="Menu category" 
                fieldName="food_category" 
            />
        </>
    );
};