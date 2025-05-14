import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { State, TCustomPaginationAction } from "./customPagination.type";


/**
 * Returns the default pagination state for any table.
 * 
 * Ensures consistency across table instances with default:
 * - empty data
 * - default filters
 * - search and pagination values
 */
const createInitialPaginationState = <T,>(): State<T> => ({
  data: [],
  searchQuery: "",
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 0,
    totalData: 0,
  },
  promiseState: {
    isLoading: false,
    isFetching: false,
    isError: false,
  },
});

/**
 * Central reducer to handle all pagination state actions.
 * 
 * - SET_STATE: Replaces the entire state.
 * - UPDATE_STATE: Partially updates the current state.
 * - RESET: Reinitializes to default values.
 */
const paginationReducer = (state: State, action: TCustomPaginationAction): State => {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET":
      return createInitialPaginationState();
    default:
      throw new Error("Invalid action type");
  }
};

/**
 * Shared context for pagination state and dispatch.
 * 
 * Allows easy access to the state and dispatch in deeply nested components.
 */
export const PaginationContext = createContext<{
  state: State<any>;
  dispatch: Dispatch<TCustomPaginationAction>;
} | null>(null);

/**
 * Provides pagination state context to child components.
 * 
 * Use this provider to wrap any part of your app that relies on table pagination state.
 */
export const CustomPaginationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(paginationReducer, createInitialPaginationState());

  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
};
