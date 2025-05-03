import { Search } from "lucide-react";
import { useTableContext } from "./hooks/useTableContext";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { tableDebounce } from ".";
import { Input } from "../ui/input";

/**
 * This function helps slow down how often the search updates.
 *
 * - Imagine you're typing in a search bar. If we search every single time you press a key, 
 *   it could make too many requests and slow things down.  
 * - Instead, we wait for 500ms after the last keypress before actually searching.  
 * - This helps avoid unnecessary work and keeps things running smoothly.
 */
const debouncedQuery = tableDebounce(
    (query: string, updateSearch: (q: string) => void) => {
      updateSearch(query);
    },
    500
  );

export const TableSearch = ({placeholder}:{placeholder?:string}) => {
  const {  searchQuery, updateSearchQuery } = useTableContext();

  /**
   * This is where we store what the user types in the search bar.
   *
   * - Let's say the user already searched for something before.  
   * - We want to keep that text in the search box so they don't lose it.  
   * - If they haven't searched yet, we start with an empty search.
   */
  const [query, setQuery] = useState( searchQuery || "");

  // Helps keep the app smooth when updating the search.
  const [, startTransition] = useTransition();

  /**
   * Updates the search box whenever the global search filter changes.
   *
   * - Imagine the search is also controlled by another filter (like a dropdown).  
   * - If that filter changes, we need to update the search box to match.  
   * - This makes sure everything stays in sync.
   */
  useEffect(() => {
    setQuery(searchQuery|| "");
  }, [searchQuery]);

  /**
   * This function runs when the user types in the search box.
   *
   * - Updates the text immediately so the user sees what they typed.  
   * - Waits a little (500ms) before actually searching to avoid searching on every key press.  
   * - This makes the search feel fast but also efficient.
   */
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    startTransition(() => {
      debouncedQuery(value, updateSearchQuery);
    });
  };

  /**
   * This is the actual search bar.
   *
   * - Shows the current search text.  
   * - Updates when the user types.  
   * - Triggers a search but in a smart way (not too often, not too slow).  
   */
  return (
    
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder || "search..."}
          className="pl-10 w-full "
          value={query}
          onChange={(e) =>  handleSearch(e)}
        />
      </div>
    
  );
};

export default TableSearch;
