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
import { SearchInput } from "../ui/SearchInput";

type TableFilterProps = {
  fieldName: string;
  filterArray: { name: string; value: string }[];
  isLoading?: boolean;
  title?: string;
  onChangeFilterSearch?: (value: string) => void;
  searchQuery?: string;
  shouldSearch?: boolean;
};

/**
* TableFilter Component:
* Purpose: Provides a dropdown filter for table data with search capabilities.
* Use Case: Admin wants to filter table data by a specific field and optionally search within filter options.
* Output: Dropdown menu with filter options and search input, updates table context on selection.
*/
export const TableFilter = ({
  fieldName = "category",
  filterArray = [],
  isLoading,
  title = "Filter",
  onChangeFilterSearch,
  searchQuery,
  shouldSearch
}: TableFilterProps) => {

  /**
   * Local State Management:
   * Purpose: Manages the selected filter name and value within the dropdown.
   * Use Case: User selects a filter option -> Updates local state to reflect the selection.
   * Output: Updated filter name and value, triggering context update.
   */
  const [filterName, setFilterName] = useState("");
  const [filterValue, setFilterValue] = useState("");

  /**
   * Context Integration:
   * Purpose: Retrieves and utilizes the table context for global filter updates.
   * Use Case: Component mounts or filter value changes -> Updates table context with new filter.
   * Output: Updates the table's filter state based on user selection.
   */
  const { updateFilter } = useTableContext();

  /**
   * Side Effect for Context Update:
   * Purpose: Synchronizes local filter state with the table context.
   * Use Case: Filter value or field name changes -> Triggers context update effect.
   * Output: Sends updated filter object to the table context.
   */
  useEffect(() => {
      updateFilter({ name: fieldName, value: filterValue });
  }, [filterValue, fieldName, updateFilter]);

  /**
   * Filter Option Handling:
   * Purpose: Processes filter value selection and updates local state.
   * Use Case: User selects a filter option from the dropdown -> Updates local state.
   * Output: Sets the filter name and value based on selected option.
   */
  const categories = filterArray;
  const onChangeFilter = (value: string) => {
      const filter = filterArray.find((item) => item.value === value)?.name || "All";
      setFilterName(filter);
      setFilterValue(value);
  };

  /**
   * Rendering the Dropdown Menu:
   * Purpose: Renders the dropdown menu with filter options and search functionality.
   * Use Case: User interacts with the dropdown, search input, or filter options -> Updates filter state.
   * Output: Dropdown menu with filter selection and optional search input.
   */
  return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4" />
                  {truncateText(filterName || title, 15)}
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ">
              {shouldSearch && onChangeFilterSearch && (
                  <SearchInput onChange={onChangeFilterSearch} value={searchQuery || ""} />
              )}
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filterValue} onValueChange={onChangeFilter}>
                  {isLoading && <FilterSkeleton />}
                  {categories && categories.map((item) => (
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