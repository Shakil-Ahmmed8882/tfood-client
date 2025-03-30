

import { useMemo } from "react";
import { useGetAllRestaurantsQuery } from "@/store/features/restaurants/restaurantApi";
import { TFilterBody } from "@/types/global";


type useRestaurantsProps = {
    limit?: string;
    currentPage?: number;
    searchQuery?: string;
    filters?: Record<string, string>;
  }

const useRestaurants = ({limit="10",currentPage=1,searchQuery='',filters = {} }: useRestaurantsProps ) => {
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
  const { data, isLoading, isFetching, isError } = useGetAllRestaurantsQuery({
    queryParams: [
      { name: "limit", value: limit.toString() },
      { name: "currentPage", value: currentPage.toString() },
      { name: "search", value: searchQuery },
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
  return { data: records, meta: data?.meta, isLoading, isFetching, isError };
};

export default useRestaurants;
