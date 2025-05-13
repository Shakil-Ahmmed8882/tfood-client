import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomSuspense } from "../wrapper/CustomSuspense";
import { useCustomPaginationContext } from "./hooks/useCustomPaginationContext";
import { useVisiblePages } from "../table";

/**
 * CustomPagination Component:
 * - Displays a dropdown to select the number of items per page.
 * - Updates the pagination state based on selection.
 */
export const CustomPagination = () => {
  const { pagination } = useCustomPaginationContext();
  const { updateitemsPerPage, itemsPerPage, totalPages } = pagination;

  return (
    <div className="flex items-center gap-2 mt-8 justify-between">
      <div className="flex items-center gap-2  justify-between">
        <span className="text-sm text-gray-500">Show</span>

        {/* Select dropdown for choosing items per page */}
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => updateitemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Display the total number of pages */}
        <span className="text-sm text-gray-500">{totalPages}</span>
      </div>
      <ShowVisiblePages />
    </div>
  );
};

/**
 * ShowVisiblePages Component:
 * - Displays pagination buttons including previous, next, and numbered pages.
 * - Handles dynamic page visibility using `useVisiblePages`.
 * - Uses suspense fallback for better performance when loading.
 */
export const ShowVisiblePages = () => {
  const {
    pagination,
    promiseState: { isFetching, isLoading },
  } = useCustomPaginationContext();
  const { updateCurrentPage, totalPages, currentPage } = pagination;

  // Compute visible page numbers dynamically
  const visiblePages = useVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-1">
      {/* Previous Page Button */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Suspense loading for pagination numbers */}
      <CustomSuspense isLoading={isFetching || isLoading} fallback={<>...</>}>
        {visiblePages.map((pageNum, idx) =>
          pageNum === -1 ? (
            // Ellipsis for skipped pages
            <span key={`ellipsis-${idx}`} className="px-2">
              ...
            </span>
          ) : (
            // Numbered page button
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 ${
                currentPage === pageNum ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => updateCurrentPage(pageNum)}
            >
              {pageNum}
            </Button>
          )
        )}
      </CustomSuspense>

      {/* Next Page Button */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
