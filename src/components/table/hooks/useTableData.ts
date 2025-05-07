import { useMemo, useEffect } from "react";
import { TFilterBody, TMeta, TQueryParam } from "@/types/global";
import { useTableContext } from "..";

/**
 * Custom hook to handle fetching, updating, and managing table data.
 * Supports RTK Query hooks directly.
 */
const useTableData = (  
  queryFn: (params: { queryParams: TQueryParam[], filterBody: TFilterBody }) => any
) => {
  /**
   * Extracts necessary context values for table management.
   * This includes pagination details, search query, and functions
   * to update data, loading states, and pagination metadata.
   */
  const { updateData, updatePromiseState, searchQuery, pagination, filter } =
    useTableContext();
  const { updatePagination, currentPage, itemsPerPage } = pagination;
  
  const filterBody:TFilterBody = filter.value
    ? {
        where: {
          combinator: "and",
          rules: [
            {
              field: filter.name.toString(),
              operator: "=",
              value: filter.value || "",
            },
          ],
        },
      }
    : { where: { combinator: "and", rules: [] } };


  /**
   * Executes the provided query function with necessary parameters.
   * The query fetches paginated data based on the search query,
   * current page, and items per page.
   */
  
  const { data, isLoading, isFetching, isError } = queryFn({
    queryParams: [
      { name: "search", value: searchQuery },
      { name: "currentPage", value: currentPage.toString() },
      { name: "limit", value: itemsPerPage.toString() },
    ],
    filterBody,
  });
  

  /**
   * Memoizes the extracted records to prevent unnecessary re-renders.
   * Ensures that table data updates efficiently when new data arrives.
   */
  const records = useMemo(() => data?.data || [], [data]);
  const meta:TMeta = data?.meta;


  /**
   * Synchronizes fetched data with the table context.
   * Updates table records, loading states, and pagination metadata
   * whenever the API response changes.
   */

  useEffect(() => {
    updateData(records);
    updatePromiseState({ isLoading, isFetching, isError });
    updatePagination({
      currentPage: currentPage || 0,
      itemsPerPage: itemsPerPage || 0, 
      totalPages: meta?.totalPages || 1,
      totalData: meta?.total || 0,
    });
  },  [records, meta, isLoading, isFetching, isError, itemsPerPage, currentPage,updateData,updatePagination,updatePromiseState]);
  

  

  /**
   * Returns relevant table data and loading states.
   * This makes it easy for components to consume and display data.
   */
  return { records, isLoading, isFetching, isError };
};

export default useTableData;
