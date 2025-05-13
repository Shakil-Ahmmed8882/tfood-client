import { Dispatch, useCallback, useContext } from "react";
import { State, TCustomPaginationAction } from "../customPagination.type";
import { PaginationContext } from "../PaginationProvider";

/**
 * Custom hook `useCustomPaginationContext` to provide easy access to the custom pagination state and dispatch.
 * Ensures that the hook is used within a valid `PaginationProvider` context.
 */
export const useCustomPaginationContext = <T,>() => {
  const context = useContext(PaginationContext);
  if (!context)
    throw new Error("useCustomPaginationContext must be used within a PaginationProvider");

  const { state, dispatch } = context as {
    state: State<T>;
    dispatch: Dispatch<TCustomPaginationAction>;
  };


  /**
   * Updates the search query in the custom pagination state.
   * Useful for filtering the displayed data based on user input within the pagination context.
   */
  const updateSearchQuery = useCallback(
    (query: string) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { searchQuery: query },
      });
    },
    [dispatch]
  );

  /**
   * Updates the promise state (loading, fetching, error status) in the custom pagination context.
   * Helps manage asynchronous operations like data fetching for pagination.
   */
  const updatePromiseState = useCallback(
    (promiseState: State["promiseState"]) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { promiseState: { ...promiseState } },
      });
    },
    [dispatch]
  );

  /**
   * Updates the number of items displayed per page in the custom pagination state.
   * Helps control the amount of data shown per page.
   */
  const updateitemsPerPage = useCallback(
    (itemsPerPage: number) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { pagination: { ...state.pagination, itemsPerPage } },
      });
    },
    [dispatch, state.pagination]
  );

  /**
   * Updates the current page in the custom pagination state.
   * Helps navigate between different pages of the data.
   */
  const updateCurrentPage = useCallback(
    (currentPage: number) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { pagination: { ...state.pagination, currentPage } },
      });
    },
    [dispatch, state.pagination]
  );


  /**
   * Updates the pagination state with a completely new pagination object.
   * Used for dynamic updates such as setting total pages, total data count, etc., in the custom pagination.
   */
  const updatePagination = useCallback(
    (pagination: State["pagination"]) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { pagination: { ...pagination } },
      });
    },
    [dispatch]
  );

  /**
   * Resets all filters and restores the default custom pagination state.
   * Useful for clearing applied filters and returning to the initial pagination state.
   */
  const resetFilter = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  // Default values for promise state to prevent undefined values in the custom pagination context
  const defaultPromiseState = {
    isLoading: false,
    isFetching: false,
    isError: false,
  };

  /**
   * Returns a structured object containing the current custom pagination state and update functions.
   * Provides an easy-to-use interface for managing pagination state in consuming components.
   */
  return {
    data: state.data ?? [],
    /**
     * Manages all pagination-related properties and actions within the custom pagination context.
     * Contains current page, total pages, total data count, and items per page.
     * Also includes functions to update pagination settings dynamically.
     * Helps in controlling data display across multiple pages in the custom pagination.
     */
    pagination: {
      currentPage: state.pagination?.currentPage,
      itemsPerPage: state.pagination?.itemsPerPage,
      totalPages: state.pagination?.totalPages,
      totalData: state.pagination?.totalData,
      updateitemsPerPage,
      updateCurrentPage,
      updatePagination,
    },
    /**
     * Represents the state of asynchronous operations like fetching and loading within the custom pagination.
     * Helps in showing loading spinners, error messages, and fetching indicators related to pagination.
     * Prevents undefined values by using defaultPromiseState as fallback in the pagination context.
     * This makes handling async operations more predictable in the UI for pagination.
     */
    promiseState: {
      isLoading: state.promiseState?.isLoading ?? defaultPromiseState.isLoading,
      isFetching:
        state.promiseState?.isFetching ?? defaultPromiseState.isFetching,
      isError: state.promiseState?.isError ?? defaultPromiseState.isError,
    },
    /**
     * Stores filters applied to the paginated data.
     * Stores the current search query entered by the user within the custom pagination.
     */
    searchQuery: state.searchQuery ?? "",
    /**
     * Functions to update different aspects of the custom pagination state.
     * These functions allow modifying data, filters, search queries, and pagination dynamically.
     * Provides a structured way to manage and update the pagination state efficiently.
     */
    resetFilter,
    updateSearchQuery,
    updatePromiseState,
  };
};