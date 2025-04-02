import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useTableContext } from ".";
import { FilterSkeleton } from "../skeleton/filterSkeleton";
import { truncateText } from "@/utils/turncateText";

type TableFilterProps = {
  fieldName: string;
  filterArray: { name: string; value: string }[];
  isLoading?: boolean;
  title?: string;
};

/**
 * TableFilter Component
 *
 * Provides a dropdown filter for table data.
 * Uses a `DropdownMenu` component to allow users to select a filter value.
 * Calls `updateFilter` in the table context to update the filter state.
 */
export const TableFilter = ({
  fieldName = "category",
  filterArray = [],
  isLoading,
  title = "Filter",
}: TableFilterProps) => {
  /**
   * Local State for Filter Value
   *
   * Holds the selected filter value.
   * Updates when a user selects a new category from the dropdown.
   */
  const [filterName, setFilterName] = useState("");
  const [filterValue, setFilterValue] = useState("");

  /**
   * Access Table Context
   *
   * Extracts `updateFilter` function to update the filter state globally.
   * Retrieves the current filter state to check for changes.
   */
  const { updateFilter } = useTableContext();

  /**
   * Effect Hook: Synchronize Filter State
   *
   * Runs whenever `filterValue` or `fieldName` changes.
   * Ensures the table filter is updated only when the selected value changes.
   */
  useEffect(() => {
    updateFilter({ name: fieldName, value: filterValue });
  }, [filterValue, fieldName, updateFilter]);

  /**
   * Memoized Categories List
   *
   * Stores the available filter options.
   * Memoization prevents unnecessary recalculations on re-renders.
   */
  const categories = filterArray;

  const onChangeFilter = (value: string) => {
    const filter =
      filterArray.find((item) => item.value === value)?.name || "All";
      setFilterName(filter); 
      setFilterValue(value)
  };


  return (
    <DropdownMenu>
      {/**
       * Dropdown Trigger Button
       *
       * Displays the selected filter value or a placeholder if none is selected.
       * Uses an outlined button with an icon for better UI clarity.
       */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4" />
          {truncateText(filterName || title, 15)}
        </Button>
      </DropdownMenuTrigger>

      {/**
       * Dropdown Content
       *
       * Displays the list of filter options inside a dropdown.
       * Includes a label and separator for better structure.
       */}
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuSeparator />

        {/**
         * Radio Group for Filter Selection
         *
         * Allows users to pick a filter value.
         * Updates `filterValue` state when an option is selected.
         */}
        <DropdownMenuRadioGroup
          value={filterValue}
          onValueChange={onChangeFilter}
        >
          {isLoading && <FilterSkeleton />}
          {categories &&
            categories.map((item) => (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.name}
              </DropdownMenuRadioItem>
            ))}
          <DropdownMenuRadioItem key={"all"} value={""}>
            All
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
