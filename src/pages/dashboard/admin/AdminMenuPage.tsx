import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";

import {
  TableSearch,
  TableHeaderRow,
  TablePagination,
  TableProvider,
  TableFilter,
  useTableData,
  RenderTableBody,
} from "./index";

import {
  menuFoodCategoryOptions,
  menuTableHeadsOptions,
  useGetAllMenusQuery,
} from "@/features/menu";
import {ParentTable} from "@/components/table/ParentTable";
import MenuTable from "@/features/menu/MenuTable";

export const AdminMenuPage = () => {
  return (
    <section>
      <TableProvider>
        <MenuTableContainer />
      </TableProvider>
    </section>
  );
};

const MenuTableContainer = () => {
  useTableData(useGetAllMenusQuery);

  return (
    <section className="w-full   bg-slate-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <RenderTableBody>
          <MenuTableTopHeadings />
          <ParentTable>
            <TableHeaderRow headsArray={menuTableHeadsOptions} />
            <MenuTable />
          </ParentTable>
          <TablePagination />
        </RenderTableBody>
      </div>
    </section>
  );
};

const MenuTableTopHeadings = () => {
  return (
    <div className=" p-2 sm:p-4 pt-10 pb-8 md:pb-3 sm:pt-7 sm:flex flex-wrap justify-between items-center">
      <Title text="Menu" />
      <div className="flex  flex-wrap items-center gap-4">
        <TableSearch />
        <TableFilter
          filterArray={menuFoodCategoryOptions}
          fieldName="food_category"
        />
        <Button className="gap-2 bg-blue-600 w-full sm:w-auto hover:bg-blue-700">
          Add Menu
        </Button>
      </div>
    </div>
  );
};
