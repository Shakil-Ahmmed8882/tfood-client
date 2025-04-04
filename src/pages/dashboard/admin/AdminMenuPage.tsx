import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";

import {
  TableSearch,
  TableHeaderRow,
  TablePagination,
  TableProvider,
  useTableData,
  RenderTableBody,
} from "./index";

import {
  useGetAllMenusQuery,
} from "@/features/menu";
import { ParentTable } from "@/components/table/ParentTable";
import MenuTable from "@/features/menu/MenuTable";
import { FilterRestaurants } from "@/features/restaurants/components/filterRestaurants";
import { FilterByMenuCategory } from "@/features/restaurants/components/filterByMenuCategory";
import { menuTableHeadsOptions } from "@/features/menu/constants";

/**
 * AdminMenuPage Component:
 * - Provides context for managing table state using TableProvider.
 * - Renders MenuTableContainer for displaying menus.
 * - Purpose: Manage admin-side menu listing, filtering, and actions.
 * - Example: Admin navigates to the menu page, sees a list of menus.
 */
export const AdminMenuPage = () => {
  return (
    <section>
      <TableProvider>
        <MenuTableContainer />
      </TableProvider>
    </section>
  );
};

/**
 * MenuTableContainer Component:
 * - Fetches menu data using useTableData with useGetAllMenusQuery.
 * - Provides a structured table layout with header, body, and pagination.
 * - Purpose: Display, search, and filter menu items for admin.
 * - Example: Admin applies a filter -> Table updates with filtered menus.
 */
const MenuTableContainer = () => {
  useTableData(useGetAllMenusQuery);

  return (
    <section className="w-full bg-slate-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <MenuTableTopHeadings />
        <RenderTableBody>
          <ParentTable>
            <TableHeaderRow headsArray={menuTableHeadsOptions} />
            <MenuTable />
          </ParentTable>
        </RenderTableBody>
        <TablePagination />
      </div>
    </section>
  );
};




/**
 * MenuTableTopHeadings Component:
 * - Displays the title and action buttons (search, filter, add menu).
 * - Purpose: Allow admin to search, filter, and add menu items.
 * - Example: Admin clicks 'Add Menu' -> Opens modal/form for menu creation.
 */
const MenuTableTopHeadings = () => {


  return (
    <div className="p-2 sm:p-4 pt-10 pb-8 md:pb-3 sm:pt-7 sm:flex flex-wrap justify-between items-center">
      <Title text="Menu" />
      <div className="flex flex-wrap items-center gap-4">
        <TableSearch placeholder="Menu/restaurant/creator"/>
        <FilterByMenuCategory/>
        <FilterRestaurants/>
        <Button className="gap-2 bg-blue-600 w-full sm:w-auto hover:bg-blue-700">
          Add Menu
        </Button>
      </div>
    </div>
  );
};
