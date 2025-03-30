import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

type customPaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

/**
 * CustomPagination Component
 *
 * - A reusable pagination component for navigating through paginated data.
 * - Uses a custom hook (`usePagination`) to handle pagination logic efficiently.
 * - Supports dynamic total items, items per page, and current page state.
 * - Provides accessibility features like `aria-current` for screen readers.
 * - Ensures performance optimization by keeping logic separate from UI rendering.
 */
export const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: customPaginationProps) => {
  /**
   *  Use the custom pagination hook to manage pagination logic.
   *  - Extracts necessary values such as the array of page numbers to be displayed.
   *  - Provides a function (`handlePageClick`) to handle user interaction for changing pages.
   *  - Keeps the component focused only on UI rendering while the hook manages calculations.
   */
  const { pageNumbers, handlePageClick } = usePagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
  });

  return (
    /**
     *  Pagination Component Wrapper
     *  - Wraps pagination elements to ensure styling consistency.
     *  - Uses Tailwind classes for spacing (`pt-6` for padding at the top).
     */
    <Pagination className="pt-6">
      <PaginationContent>
        {pageNumbers.map((page) => (
          /**
           *  Pagination Item - Represents an individual page button.
           *  - Dynamically generates buttons based on the `pageNumbers` array from the hook.
           *  - Ensures each button has a unique key (`page`) for React's efficient rendering.
           */
          <PaginationItem key={page}>
            <PaginationLink
              href={`#page=${page}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(page);
              }}
              isActive={page === currentPage}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};
