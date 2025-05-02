import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Action, State } from "./table.type";

/**
 * Defines the initial table state.
 *
 * - Without it: Every table instance would need manual setup, causing inconsistencies.
 * - With it: Ensures a standard starting point, making table behavior predictable.
 */
export const tableInitialState = <T,>(): State<T> => ({
  data: [],
  filter: { name: "category", value: "" },
  searchQuery: "",
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
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
 * Manages state updates based on actions.
 *
 * - Without it: Every change would require manual state handling, leading to unnecessary complexity.
 * - With it: Centralized logic ensures easy updates and a structured approach to modifying state.
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET":
      return tableInitialState();
    default:
      throw new Error("Invalid action type");
  }
};

/**
 * Creates a shared state for the table component.
 *
 * - Without it: Each table would manage its own state separately, leading to duplication.
 * - With it: Enables a single source of truth, allowing components to sync efficiently.
 */
export const TableContext = createContext<{
  state: State<any>;
  dispatch: Dispatch<Action>;
} | null>(null);

/**
 * Provides the table state to all child components.
 *
 * - Without it: Every component needing table data would require prop drilling.
 * - With it: Any component can access and modify the table state easily.
 */
export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, tableInitialState());

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};
