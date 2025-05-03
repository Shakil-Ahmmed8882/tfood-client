import { useMemo } from "react";

/**
 * Custom hook to calculate visible pagination numbers, including edge cases.
 * It dynamically adjusts the range based on the current page, total pages, 
 * and a configurable delta value.
 *
 * @param {number} currentPage - The active page number.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} [delta=2] - The number of surrounding pages to show.
 * @returns {number[]} - An array of visible page numbers, including ellipses (-1).
 */
export const useVisiblePages = (currentPage: number, totalPages: number, delta: number = 2): number[] => {
  return useMemo(() => {
    const range: number[] = [];

    /**
     * Determine the start and end of the visible page range.
     * Ensures that the pagination stays within valid bounds.
     */
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    /**
     * Adjust the range when the current page is near the beginning or end.
     * Ensures a consistent number of pages are displayed.
     */
    if (currentPage <= delta) {
      end = Math.min(totalPages, 2 * delta + 1);
    } else if (currentPage >= totalPages - delta) {
      start = Math.max(1, totalPages - 2 * delta);
    }

    /**
     * Populate the range array with page numbers within the calculated bounds.
     */
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    /**
     * Handle edge cases:
     * - Add the first page if it is not already included.
     * - Insert an ellipsis (-1) if there is a gap between the first and start pages.
     */
    if (start > 1) {
      range.unshift(1);
      if (start > 2) range.splice(1, 0, -1); // Add ellipsis
    }

    /**
     * Handle edge cases:
     * - Add the last page if it is not already included.
     * - Insert an ellipsis (-1) if there is a gap between the end and last pages.
     */
    if (end < totalPages) {
      if (end < totalPages - 1) range.push(-1); // Add ellipsis
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages, delta]);
};

