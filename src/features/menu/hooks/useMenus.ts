

import { useMemo } from "react";
import { TFilterBody } from "@/types/global";
import { useGetAllMenusQuery } from "@/store/features/menu/menuApi";


type useRestaurantsProps = {
    limit?: string;
    currentPage?: number;
    searchQuery?: string;
    filters?: Record<string, string>;
    queryParams?: { name: string; value: string }[];
  }

const useMenus = ({limit="10",currentPage=1,searchQuery='',filters = {},queryParams = [] }: useRestaurantsProps ) => {
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
  const { data, isLoading, isFetching, isError, error, refetch } = useGetAllMenusQuery({
    queryParams: [
      { name: "limit", value: limit.toString() },
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

  /** 
   * Returns restaurant data, metadata, and loading states.
   */
  return { data: records, meta: data?.meta, isLoading, isFetching, isError,error, refetch };
};

export default useMenus;

