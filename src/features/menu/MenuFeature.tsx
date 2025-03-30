import { useState } from "react";
import {
  useGetAllMenusQuery,
  MenuCard,
  MenuSkeleton,
  ShouldPaginateWrapper,
  CustomPagination,
} from ".";

import { TMenu } from "./menu.type";
import { DataHandler } from "@/components/wrapper/DataHandler";

type menuFeatureProps = {
  limit?: string;
  searchQuery?: string;
  notFoundMessage?: string;
  shouldPaginate?: boolean;
};
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

export const MenuFeature = ({
  limit = "5",
  searchQuery,
  shouldPaginate = false,
}: menuFeatureProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  /*
   * Features:
   * - Destructures the `data` from the `useGetAllMenusQuery`
   * response into `menus` and `meta` directly.
   * - If `data` is undefined, defaults to an empty object to prevent errors.
   * - Manages loading, fetching, and error states with `isLoading`, `isFetching`, and `isError` respectively.
   */
  const {
    data: { data: menus, meta } = {},
    isLoading,
    isFetching,
    isError,
  } = useGetAllMenusQuery({
    queryParams: [
      { name: "limit", value: limit },
      { name: "currentPage", value: `${currentPage}` },
      { name: "search", value: `${searchQuery}` },
    ],
  });
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
          <div className="grid grid-cols-1 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {menus.map((food) => (
              <MenuCard key={food.id} menu={food} />
            ))}
          </div>
        )}
      </DataHandler>

      <ShouldPaginateWrapper shouldPaginate={shouldPaginate}>
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
