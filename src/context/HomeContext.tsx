import {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type HomeContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
};
const HomeContext = createContext<HomeContextType | null>(null);

/**
 * HomeProvider: A context provider that manages and shares the search query state.
 *
 * Props:
 * - children: React components to be wrapped by the provider.
 *
 * Context:
 * - searchQuery: A string representing the current search query.
 * - setSearchQuery: A function to update the search query state.
 *
 * This provider makes the search query state accessible to all child components within the provider.
 */
export const HomeProvider = ({ children }: PropsWithChildren) => {
  // State hook to manage the search query, initialized to an empty string
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <HomeContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

/**
 * useHomeContext: A custom hook that retrieves the HomeContext value.
 *
 * Returns:
 * - searchQuery: The current search query string from the context.
 * - setSearchQuery: Function to update the search query state.
 *
 * Throws an error if used outside the HomeProvider context.
 */
export const useHomeContext = () => {
  // Get the HomeContext value using useContext
  const context = useContext(HomeContext);

  // Throw an error if context is not available (i.e., outside the provider)
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }

  return context;
};
