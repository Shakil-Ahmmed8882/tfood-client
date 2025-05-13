

import { useEffect, useMemo } from "react";
import { useGetAllRestaurantsQuery } from "@/store/features/restaurants/restaurantApi";
import { TFilterBody, TMeta } from "@/types/global";
import { useCustomPaginationContext } from "@/components/pagination/hooks/useCustomPaginationContext";


type useRestaurantsProps = {
    limit?: string;
    currentPage?: number;
    searchQuery?: string;
    filters?: Record<string, string>;
    queryParams?: { name: string; value: string }[];
  }

const useRestaurants = ({limit="12",searchQuery='',filters = {},queryParams = [] }: useRestaurantsProps ) => {



  
    /**
       * Extracts necessary context values for table management.
       * This includes pagination details, search query, and functions
       * to update data, loading states, and pagination metadata.
       */
      const { updatePromiseState, pagination } =useCustomPaginationContext();
      const { updatePagination, currentPage, itemsPerPage } = pagination;
    
  
  /** 
   * Constructs a filter body for API requests.
   */
  const filterBody: TFilterBody =
    Object.keys(filters).length > 0
      ? {
          where: {
            combinator: "and",
            rules: Object.entries(filters).map(([field, value]) => ({
              field,
              operator: "=",
              value,
            })),
          },
        }
      : { where: { combinator: "and", rules: [] } };

  /** 
   * Fetches restaurant data from API using filters, pagination, and search query.
   */
  const { data, isLoading, isFetching, isError, error, refetch } = useGetAllRestaurantsQuery({
    queryParams: [
      { name: "limit", value: itemsPerPage.toString() },
      { name: "currentPage", value: currentPage.toString() },
      { name: "search", value: searchQuery },
      ...queryParams
    ],
    filterBody,

  });

  /** 
   * Memoizes the restaurant data to optimize re-renders.
   */
  const records = useMemo(() => data?.data || [], [data]);
  const meta:TMeta | undefined = data?.meta;
  
   
  
  
  
    /**
     * Synchronizes fetched data with the table context.
     * Updates table records, loading states, and pagination metadata
     * whenever the API response changes.
     */
 
  
    useEffect(() => {
      updatePromiseState({ isLoading, isFetching, isError });
      updatePagination({
        currentPage: currentPage || 1,
        itemsPerPage: itemsPerPage || 0, 
        totalPages: meta?.totalPages || 1,
        totalData: meta?.total || 0,
      });
    },  [records, meta, itemsPerPage, isLoading, isFetching, isError, currentPage, updatePagination, updatePromiseState]);
    


  /** 
   * Returns restaurant data, metadata, and loading states.
   */
  return { data: records, meta: data?.meta, isLoading, isFetching, isError,error, refetch };
};

export default useRestaurants;

