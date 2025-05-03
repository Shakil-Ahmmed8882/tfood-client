import Title from "@/components/ui/title";

import {
  useGetAllUsersQuery,
  userOptions,
  userTableHeadsOptions,
} from "./index";
import UserTable from "./components/UserTable";
import { TableProvider } from "@/components/table/TableProvider";
import useTableData from "@/components/table/hooks/useTableData";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TablePagination from "@/components/table/TablePagination";
import TableSearch from "@/components/table/TableSearch";
import { TableFilter } from "@/components/table/TableFilter";
import { ParentTable } from "@/pages/dashboard/admin";

export const AdminUsersPage = () => {
  return (
    <section>
      <TableProvider>
        <UsersTableContainer />
      </TableProvider>
    </section>
  );
};

const UsersTableContainer = () => {
  useTableData(useGetAllUsersQuery);

  return (
    <section className="w-full   bg-slate-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <TableTopHeadings />
        <ParentTable>
          <TableHeaderRow headsArray={userTableHeadsOptions} />
          <UserTable />
        </ParentTable>
        <TablePagination />
      </div>
    </section>
  );
};

const TableTopHeadings = () => {
  return (
    <div className=" p-2 sm:p-4 pt-10 pb-8 md:pb-3 sm:pt-7 sm:flex flex-wrap justify-between items-center">
      <Title text="Users" />
      <div className="flex  flex-wrap items-center gap-4">
        <TableSearch />
        <TableFilter filterArray={userOptions} fieldName="role" />
      </div>
    </div>
  );
};
