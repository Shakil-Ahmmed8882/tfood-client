import { useState, useMemo, useCallback } from "react";
import { TRestaurant, useGetAllRestaurantsQuery } from "@/features/restaurants";

type QueryParam = {
  name: string;
  value: string;
};

interface UseRestaurantsParams {
  limit?: number;
  initialPage?: number;
}

interface UseRestaurantsResult {
  restaurants: TRestaurant[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  refetch: () => void;
  setLimit: (newLimit: number) => void;
}

export function useShopOwnerRestaurants({
  limit: initialLimit = 5,
  initialPage = 1,
}: UseRestaurantsParams = {}): UseRestaurantsResult {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const queryParams = useMemo<QueryParam[]>(
    () => [
      { name: "limit", value: `${limit}` },
      { name: "currentPage", value: `${currentPage}` },
    ],
    [currentPage, limit]
  );

  const {
    data: { data: restaurants = [], meta } = {},
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllRestaurantsQuery({
    queryParams,
  });

  const handleSetLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
  }, []);

  return {
    restaurants,
    isLoading,
    isFetching,
    isError,
    error,
    currentPage,
    totalItems: meta?.total || 0,
    itemsPerPage: meta?.limit || limit,
    setCurrentPage,
    refetch,
    setLimit: handleSetLimit,
  };
}
