import { useState, useCallback } from "react";
import { TRestaurant } from "@/features/restaurants";
import useRestaurants from "./useRestaurants";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";

/**
 * Hook: useShopOwnerRestaurants
 * - Manages restaurant data for a logged-in shop owner.
 * - Supports pagination, filtering, and dynamic limit updates.
 * - Example: Shop owner views a paginated list of their restaurants.
 */
interface UseRestaurantsParams {
  limit?: number;
  initialPage?: number;
}

interface UseRestaurantsResult {
  data: TRestaurant[];
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

export function useShopOwnerRestaurants({ limit: initialLimit = 5, initialPage = 1 }: UseRestaurantsParams = {}): UseRestaurantsResult {
  /**
   * State Management:
   * - Tracks current page number and items per page.
   * - Resets page to 1 when limit changes to prevent empty results.
   * - Example: User increases items per page -> Resets to first page.
   */
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  
  /**
   * Fetch Current User:
   * - Retrieves the logged-in shop owner's email.
   * - Used to filter restaurant data for the specific owner.
   * - Example: Logged-in user sees only their restaurant listings.
   */
  const user = useAppSelector(selectCurrentUser);
  const queryParams = [{ name: "status", value: '0' }];
  const filters = { owner_email: user?.email || "" };
  const options = { limit: limit.toString(), currentPage, ...{ filters },queryParams };
  /**
   * Fetch Restaurant Data:
   * - Calls useRestaurants to retrieve restaurant listings.
   * - Provides loading, error handling, and pagination metadata.
   * - Example: Admin loads restaurant list -> API fetches and returns paginated results.
   */
  const {
    data,
    meta,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRestaurants(options);

  /**
   * Handle Limit Change:
   * - Updates item limit and resets pagination to the first page.
   * - Ensures the user doesn't get stuck on an out-of-bounds page.
   * - Example: User changes limit from 5 to 10 -> Page resets to 1.
   */
  const handleSetLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); 
  }, []);

  return {
    data,
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
