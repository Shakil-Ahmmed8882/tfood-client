import { TableFilter } from "@/components/table/TableFilter";
import useRestaurants from "../hooks/useRestaurants";
import { SingleTabSkeleton } from "@/components/skeleton/tabSkeleton";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

/**
 * FilterRestaurants Component:
 * Purpose: Provides a filtering interface for restaurants.
 * Use Case: Admin wants to filter restaurants by name or search.
 * Output: Renders a TableFilter component with restaurant options.
 */
export const FilterRestaurants = () => {

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
     * Purpose: Fetches restaurant data based on search and generates filter options.
     * Use Case: Component mounts or search query changes -> Fetches data and maps to options.
     * Output: Restaurant data and filter options array for the TableFilter.
     */
    const {data, isLoading, isFetching} = useRestaurants({searchQuery:debouncedSearchValue, filters: {} });
    const restaurantOptions = isFetching || isLoading ? [] : data?.map((f) => ({name:f.name, value:f.id})) || []

    /**
     * Loading State Handling:
     * Purpose: Displays a skeleton loader during data loading.
     * Use Case: While restaurant data is loading -> Shows a loading indicator.
     * Output: SingleTabSkeleton component during loading.
     */
    if(isLoading) return <SingleTabSkeleton/> 

    /**
     * Rendering the TableFilter:
     * Purpose: Renders the TableFilter component with search and filter functionality.
     * Use Case: User interacts with the search input or filter dropdown -> Filters restaurant list.
     * Output: TableFilter component with search and filter capabilities.
     */
    return (
        <>
            <TableFilter 
                isLoading={isLoading || isFetching}
                {...{searchQuery, onChangeFilterSearch}}
                shouldSearch={true}
                filterArray={restaurantOptions} 
                title="Restaurant" 
                fieldName="restaurant" 
            />
        </>
    );
};