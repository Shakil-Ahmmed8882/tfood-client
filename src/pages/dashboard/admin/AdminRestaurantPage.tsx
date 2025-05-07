import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import {
  restaurantTableHeadsOptions,
  useGetAllRestaurantsQuery,
} from "@/features/restaurants";

import {
  TableSearch,
  TableHeaderRow,
  TablePagination,
  TableProvider,
  // TableFilter,
  useTableData,
  RenderTableBody,
} from "./index";

import { useState } from "react";
import { RestaurantFormModal } from "@/features/restaurants/components/RestaurantFormModal";
import { ParentTable } from "@/components/table/ParentTable";
import RestaurantTable from "@/features/restaurants/RestaurantTable";
// import { useGetAllMenuCategoriesQuery } from "@/store/features/menu-category/menuCategoryApi";

/**
 * AdminRestaurantPage Component:
 * - Wraps the restaurant management UI with TableProvider for state management.
 * - Loads RestaurantTableContainer which handles listing, filtering, and actions.
 * - Purpose: To provide an admin dashboard for managing restaurants.
 * - Example: Admin navigates to this page to view and manage restaurants.
 */
export const AdminRestaurantPage = () => {
  return (
    <>
      <TableProvider>
        <RestaurantTableContainer />
      </TableProvider>
    </>
  );
};

/**
 * RestaurantTableContainer Component:
 * - Fetches restaurant data using useTableData with useGetAllRestaurantsQuery.
 * - Provides structured table layout with filtering, sorting, and pagination.
 * - Purpose: Display restaurant data in a structured, filterable format.
 * - Example: Admin filters restaurants by category -> Table updates accordingly.
 */
const RestaurantTableContainer = () => {
  useTableData(useGetAllRestaurantsQuery);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-slate-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <TableTopHeadings />
        <RenderTableBody>
          <ParentTable>
            <TableHeaderRow headsArray={restaurantTableHeadsOptions} />
            <RestaurantTable />
          </ParentTable>
          <TablePagination />
        </RenderTableBody>
      </div>
      <RestaurantFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

/**
 * TableTopHeadings Component:
 * - Displays title and action buttons for searching, filtering, and adding restaurants.
 * - Purpose: To allow the admin to filter, search, and add new restaurants.
 * - Example: Admin clicks 'Add Restaurant' -> A modal opens to add a new restaurant.
 */
const TableTopHeadings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { data, isLoading } = useGetAllMenuCategoriesQuery({});

  // const menuCategories = data?.data?.map((category) => ({
  //   name: category.name,
  //   value: category.name,
  // }));



  return (
    <div className="p-2 sm:p-4 pt-10 pb-8 md:pb-3 sm:pt-7 sm:flex flex-wrap justify-between items-center">
      <Title text="Restaurant" />
      <div className="flex flex-wrap items-center gap-4">
        <TableSearch />
        {/* <TableFilter isLoading={isLoading} filterArray={menuCategories || []} fieldName="category" /> */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-blue-600 w-full mb-6 sm:mb-0 sm:w-auto hover:bg-blue-700"
        >
          Add Restaurant
        </Button>
      </div>
      <RestaurantFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};