import { useState } from "react";
import {
  CustomPagination,
  ShouldPaginateWrapper,
  RestaurantSkeleton,
  RestaurantCard,
  TRestaurant,
} from ".";
import useRestaurants from "./hooks/useRestaurants";
import { DataHandler } from "@/components/wrapper/DataHandler";

type TRestaurantFeature = {
  limit?: string;
  searchQuery: string;
  shouldPaginate?: boolean;
};

/**
 * RestaurantsFeature: Fetches and displays a list of restaurants with error handling and loading states.
 *
 * Features:
 * - Fetches restaurant data using `useGetAllRestaurantsQuery`.
 * - Implements error boundary to catch API errors.
 * - Uses suspense-like behavior with a custom loader.
 * - Displays a skeleton loader while fetching data.
 * - Shows a "No Item Found" message if no restaurants are available.
 */
export const RestaurantsFeature = ({
  limit = "5",
  searchQuery,
  shouldPaginate = false,
}: TRestaurantFeature) => {
  /*
   * Features:
   * - Destructures the `data` from the `useGetAllMenusQuery`
   * response into `menus` and `meta` directly.
   * - If `data` is undefined, defaults to an empty object to prevent errors.
   * - Manages loading, fetching, and error states with `isLoading`, `isFetching`, and `isError` respectively.
   */
  const [currentPage, setCurrentPage] = useState<number>(1);

  const options = { limit, currentPage, searchQuery };
  const {
    data: restaurants,
    meta,
    isLoading,
    isFetching,
    isError,
  } = useRestaurants(options);

  return (
    <>
      <DataHandler<TRestaurant[]>
        data={restaurants || []}
        loadingFallback={<RestaurantSkeleton />}
        isLoading={isLoading || isFetching}
        isError={isError}
        loadingMessage="Fetching restaurants..."
        hasData={(menus): menus is TRestaurant[] =>
          Array.isArray(menus) && menus.length > 0
        }
        errorMessage="Failed to load Restaurants"
        noDataMessage="No menus found"
        // onRetry={() => console.log("Retry logic here")}
        // onError={(error, info) => console.error("Runtime error:", error, inf
      >
        {(restaurants) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {restaurants?.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))}
          </div>
        )}
      </DataHandler>

      <ShouldPaginateWrapper shouldPaginate={shouldPaginate}>
        <CustomPagination
          currentPage={currentPage}
          totalItems={meta?.total || 0}
          itemsPerPage={meta?.limit || 0}
          onPageChange={setCurrentPage}
        />
      </ShouldPaginateWrapper>
    </>
  );
};
