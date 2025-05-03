/**
 * User Role Types
 *
 * Defines different user roles available in the system.
 * Used for permission management and role-based access control.
 * Ensures type safety when handling user-related operations.
 */
export type Role = "admin" | "super_admin" | "customer" | "shop_owner";

/**
 * Status Types
 *
 * Represents the active or inactive state of users, items, or services.
 * Helps in managing system-wide activation and deactivation functionalities.
 * Ensures uniformity across various status-related operations.
 */
export type Status = "active" | "inactive";

/**
 * FilterOptions Type
 *
 * Represents a filtering option that consists of a display name and a value.
 * Can be used for filtering data sets, such as categories or user roles.
 * The generic type `T` allows for flexibility in value types (string, number, etc.).
 */
export type FilterOptions<T = string> = { name: string; value: T };

/**
 * State Type
 *
 * Represents the global state structure for managing data, filters, search, and pagination.
 * Includes metadata such as pagination details and promise states for loading/fetching indicators.
 * The generic `T` allows flexibility for different data types within the state.
 * This structure ensures a standardized approach to managing UI-driven state.
 */
export type State<T = any> = {
  data: T[]; // Stores the actual dataset.
  filter: FilterOptions; // Stores the applied filter option.
  searchQuery: string; // Holds the search query input.

  pagination: {
    currentPage: number; // Tracks the currently active page.
    itemsPerPage: number; // Defines the number of items per page.
    totalPages: number; // Stores the total number of pages available.
    totalData: number; // Holds the total count of available data items.
  };

  promiseState: {
    isLoading: boolean; // Indicates if data is currently being loaded.
    isFetching: boolean; // Represents an active fetching process.
    isError: boolean; // Signals if an error has occurred.
  };
};

/**
 * SetStateAction Type
 *
 * Represents an action to fully replace the existing state.
 * Typically used when loading fresh data or resetting state from an API call.
 * Ensures that the entire state structure is updated in one operation.
 */
export type SetStateAction = {
  type: "SET_STATE";
  payload: State;
};

/**
 * UpdateState Type
 *
 * Represents an action to update only specific parts of the state.
 * Uses `Partial<State>` to allow updating one or more properties without overriding the entire state.
 * Useful for updating pagination, filters, or partial dataset changes.
 */
export type UpdateState = {
  type: "UPDATE_STATE";
  payload: Partial<State>;
};

/**
 * ResetAction Type
 *
 * Represents an action to reset the state back to its initial default values.
 * Useful for clearing filters, resetting data, or handling component unmount scenarios.
 * Ensures that any modifications to the state can be undone efficiently.
 */
export type ResetAction = {
  type: "RESET";
};

/**
 * Action Type Union
 *
 * Combines all possible action types (`SetStateAction`, `UpdateState`, and `ResetAction`).
 * Used in reducers or state management functions to handle different state updates.
 * Ensures strict type checking when dispatching actions.
 */
export type Action = SetStateAction | UpdateState | ResetAction;
