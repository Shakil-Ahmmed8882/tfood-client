import { useState } from "react";
import { MenuCard, MenuSkeleton, CustomPagination } from ".";

import { TMenu } from "./menu.type";
import { DataHandler } from "@/components/wrapper/DataHandler";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import useMenus from "./hooks/useMenus";

/**
 * MenuFeature: Fetches and displays menu items while handling loading, errors, and empty states.
 *
 * Props:
 * - limit?: string (default: "10") - Specifies the number of menu items to fetch.
 * - searchQuery?: string - Filters menu items based on the provided search term.
 *
 * Features:
 * - Uses `CustomErrorBoundary` to catch and display errors gracefully in the UI.
 * - Implements `CustomSuspense` to show a loading skeleton while fetching data.
 * - Utilizes `NoItemFound` to display a message when no menu items are available.
 */

export const ShopOwnerMenusList = ({
  restaurantId,
}: {
  restaurantId: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Fetch Current User:
   * - Retrieves the logged-in shop owner's email.
   * - Used to filter restaurant data for the specific owner.
   * - Example: Logged-in user sees only their restaurant listings.
   */
  const user = useAppSelector(selectCurrentUser);
  let filters;
  if (restaurantId) {
    console.log(restaurantId);
    filters = { restaurant: restaurantId || "" };
    console.log(filters);
  } else {
    filters = { creator: user?.email || "" };
  }
  const options = { ...{ filters: filters as Record<string, string> } };

  /**
   *
   * Fetch Restaurant Data:
   * - Calls useRestaurants to retrieve restaurant listings.
   * - Provides loading, error handling, and pagination metadata.
   * - Example: Admin loads restaurant list -> API fetches and returns paginated results.
   */
  console.log(restaurantId);
  const {
    data: menus,
    meta,
    isLoading,
    isFetching,
    isError,
  } = useMenus(options);

  return (
    <>
      <DataHandler<TMenu[]>
        data={menus || []}
        loadingFallback={<MenuSkeleton />}
        isLoading={isLoading || isFetching}
        isError={isError}
        loadingMessage="Fetching menus..."
        hasData={(menus): menus is TMenu[] =>
          Array.isArray(menus) && menus.length > 0
        }
        errorMessage="Failed to load menus"
        noDataMessage="No menus found"
        // onRetry={() => console.log("Retry logic here")}
        // onError={(error, info) => console.error("Runtime error:", error, info)}
      >
        {(menus) => (
          <div className="grid grid-cols-1 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {menus.map((food) => (
              <MenuCard key={food.id} menu={food} />
            ))}
          </div>
        )}
      </DataHandler>

      <CustomPagination
        itemsPerPage={meta?.limit || 0}
        currentPage={currentPage}
        totalItems={meta?.total || 0}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
