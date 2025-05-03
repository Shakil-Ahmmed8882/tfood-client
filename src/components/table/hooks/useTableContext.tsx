import { Dispatch, useCallback, useContext } from "react";
import { Action, State, TableContext } from "../index";

/**
 * Custom hook `useTableContext` to provide easy access to the table state and dispatch.
 * Ensures that the hook is used within a valid `TableProvider` context.
 */
export const useTableContext = <T,>() => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");

  const { state, dispatch } = context as {
    state: State<T>;
    dispatch: Dispatch<Action>;
  };

  /**
   * Updates table data by dispatching a new state.
   * Accepts an array of data and updates the table accordingly.
   */
  const updateData = useCallback(
    (data: State["data"]) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { data },
      });
    },
    [dispatch]
  );

  /**
   * Updates the search query in the table state.
   * Useful for filtering the displayed data based on user input.
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
   * Updates the promise state (loading, fetching, error status) in the table context.
   * Helps manage asynchronous operations like data fetching.
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
   * Updates the filter object in the table context.
   * Useful for filtering data based on different conditions (e.g., category, status, etc.).
   */
  const updateFilter = useCallback(
    (filter: State["filter"]) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: { filter: { ...filter } },
      });
    },
    [dispatch]
  );

  /**
   * Updates the number of items displayed per page in the pagination state.
   * Helps control the amount of data shown at once.
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
   * Updates the current page in the pagination state.
   * Helps navigate between different pages of the table.
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
   * Updates both the search query and filter state simultaneously.
   * Ensures search query updates do not interfere with other applied filters.
   */
  const updateSearch = useCallback(
    (query: string) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          filter: {
            ...state.filter,
          },
          searchQuery: query,
        },
      });
    },
    [dispatch, state.filter]
  );

  /**
   * Updates the pagination state with a completely new pagination object.
   * Used for dynamic updates such as setting total pages, total data count, etc.
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
   * Resets all filters and restores the default table state.
   * Useful for clearing applied filters and returning to the initial state.
   */
  const resetFilter = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  // Default values for promise state to prevent undefined values
  const defaultPromiseState = {
    isLoading: false,
    isFetching: false,
    isError: false,
  };

  /**
   * Returns a structured object containing the current state and update functions.
   * Provides an easy-to-use interface for managing table state in consuming components.
   */
  return {
    data: state.data ?? [],
    /**
     * Manages all pagination-related properties and actions.
     * Contains current page, total pages, total data count, and items per page.
     * Also includes functions to update pagination settings dynamically.
     * Helps in controlling data display across multiple pages.
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
     * Represents the state of asynchronous operations like fetching and loading.
     * Helps in showing loading spinners, error messages, and fetching indicators.
     * Prevents undefined values by using defaultPromiseState as fallback.
     * This makes handling async operations more predictable in the UI.
     */
    promiseState: {
      isLoading: state.promiseState?.isLoading ?? defaultPromiseState.isLoading,
      isFetching:
        state.promiseState?.isFetching ?? defaultPromiseState.isFetching,
      isError: state.promiseState?.isError ?? defaultPromiseState.isError,
    },
    /**
     * Stores filters applied to the table data.
     * Stores the current search query entered by the user.
     */
    filter: state.filter ?? {},
    searchQuery: state.searchQuery ?? "",
    /**
     * Functions to update different aspects of the table state.
     * These functions allow modifying data, filters, search queries, and pagination dynamically.
     * Provides a structured way to manage and update the table state efficiently.
     */
    updateData,
    updateFilter,
    updateSearch,
    resetFilter,
    updateSearchQuery,
    updatePromiseState,
  };
};
