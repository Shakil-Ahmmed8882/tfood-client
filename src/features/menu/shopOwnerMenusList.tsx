import { useState } from "react";
import {
  MenuCard,
  MenuSkeleton,
  ShouldPaginateWrapper,
  CustomPagination,
} from ".";

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

export const ShopOwnerMenusList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

    
    /**
     * Fetch Current User:
     * - Retrieves the logged-in shop owner's email.
     * - Used to filter restaurant data for the specific owner.
     * - Example: Logged-in user sees only their restaurant listings.
     */
    const user = useAppSelector(selectCurrentUser);
    const filters = { creator: user?.email || "" };
    const options = {...{ filters } };
  
    /**
     * 
     * Fetch Restaurant Data:
     * - Calls useRestaurants to retrieve restaurant listings.
     * - Provides loading, error handling, and pagination metadata.
     * - Example: Admin loads restaurant list -> API fetches and returns paginated results.
     */

  const {
    data: menus,
    meta,
    isLoading,
    isFetching,
    isError,
  } = useMenus(options)


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
          <div className="grid grid-cols-1 pt-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {menus.map((food) => (
              <MenuCard key={food.id} menu={food} />
            ))}
          </div>
        )}
      </DataHandler>

      <ShouldPaginateWrapper shouldPaginate={false}>
        <CustomPagination
          itemsPerPage={meta?.limit || 0}
          currentPage={currentPage}
          totalItems={meta?.total || 0}
          onPageChange={setCurrentPage}
        />
      </ShouldPaginateWrapper>
    </>
  );
};
