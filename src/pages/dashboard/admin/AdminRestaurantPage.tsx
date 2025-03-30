import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import {
  restaurantTableHeadsOptions,
  restaurantCategoryOptions,
  useGetAllRestaurantsQuery,
} from "@/features/restaurants";

import {
  TableSearch,
  TableHeaderRow,
  TablePagination,
  TableProvider,
  TableFilter,
  useTableData,
  RenderTableBody,
} from "./index";

import { useState } from "react";
import { RestaurantFormModal } from "@/features/restaurants/components/RestaurantFormModal";
import {ParentTable} from "@/components/table/ParentTable";
import RestaurantTable from "@/features/restaurants/RestaurantTable";


export const AdminRestaurantPage = () => {
  return (
    <>
    
      <TableProvider>
        <RestaurantTableContainer />
      </TableProvider>
    </>
  );
};

const RestaurantTableContainer = () => {
  useTableData(useGetAllRestaurantsQuery);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full   bg-slate-50 min-h-screen">
      <RenderTableBody>



      <div className="bg-white rounded-lg shadow-sm">

        <TableTopHeadings />
        <ParentTable>
          <TableHeaderRow headsArray={restaurantTableHeadsOptions} />
          <RestaurantTable />
        </ParentTable>
        <TablePagination />

      </div>
      <RestaurantFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </RenderTableBody>

    </section>
  );
};

const TableTopHeadings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className=" p-2 sm:p-4 pt-10 pb-8 md:pb-3 sm:pt-7 sm:flex flex-wrap justify-between items-center">
      <Title text="Restaurant" />
      <div className="flex  flex-wrap  items-center gap-4">
        <TableSearch />
        <TableFilter
          filterArray={restaurantCategoryOptions}
          fieldName="category"
        />
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-blue-600 w-full mb-6 sm:mb-0 sm:w-auto hover:bg-blue-700">
          Add Restaurant
        </Button>
      </div>

      <RestaurantFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

    </div>
  );
};
