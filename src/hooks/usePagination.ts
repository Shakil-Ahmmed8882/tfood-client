import { useMemo, useCallback } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: UsePaginationProps) => {
  /**
   * Compute the total number of pages based on total items and items per page.
   */
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  /**
   * Generate an array of page numbers to display.
   * - If total pages are within the visible limit, show all pages.
   * - Otherwise, dynamically determine start and end pages around the current selection.
   */
  const pageNumbers = useMemo(() => {
    const pageNumbers = [];
    const visiblePages = 5; // Maximum number of visible page buttons

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      const endPage = Math.min(totalPages, startPage + visiblePages - 1);

      if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  /**
   * Handles user interaction with pagination links.
   */
  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange]
  );

  return { totalPages, pageNumbers, handlePageClick };
};
