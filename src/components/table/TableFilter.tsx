import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useTableContext } from ".";

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
}: {
  fieldName: string;
  filterArray: string[];
}) => {
  /**
   * Local State for Filter Value
   *
   * Holds the selected filter value.
   * Updates when a user selects a new category from the dropdown.
   */
  const [filterValue, setFilter] = useState("");

  /**
   * Access Table Context
   *
   * Extracts `updateFilter` function to update the filter state globally.
   * Retrieves the current filter state to check for changes.
   */
  const { updateFilter, filter } = useTableContext();

  /**
   * Effect Hook: Synchronize Filter State
   *
   * Runs whenever `filterValue` or `fieldName` changes.
   * Ensures the table filter is updated only when the selected value changes.
   */
  useEffect(() => {
    if (filter.name !== fieldName || filter.value !== filterValue) {
      updateFilter({ name: fieldName, value: filterValue });
    }
  }, [filterValue, fieldName, filter, updateFilter]);

  /**
   * Memoized Categories List
   *
   * Stores the available filter options.
   * Memoization prevents unnecessary recalculations on re-renders.
   */
  const categories = filterArray

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
          {filterValue || "Select"}
        </Button>
      </DropdownMenuTrigger>

      {/**
       * Dropdown Content
       *
       * Displays the list of filter options inside a dropdown.
       * Includes a label and separator for better structure.
       */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter {fieldName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/**
         * Radio Group for Filter Selection
         *
         * Allows users to pick a filter value.
         * Updates `filterValue` state when an option is selected.
         */}
        <DropdownMenuRadioGroup value={filterValue} onValueChange={setFilter}>
          {categories.map((item) => (
            <DropdownMenuRadioItem key={item} value={item}>
              {item}
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
