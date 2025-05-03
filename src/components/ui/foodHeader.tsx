import React from "react";
import { FilledLocationIcon } from "@/assets/icons/Icons";
import { SearchInput } from "./SearchInput";

/**
 * FoodHeaderContainer Component
 *
 * This component renders the header section for a food-related page. 
 * It includes:
 * - A location display with an icon.
 * - A search input field for searching food items.
 * - A debounced search value to optimize performance by reducing unnecessary updates.
 *
 * Features:
 * - Uses `useState` to manage the `searchQuery` state.
 * - Uses `useDebounce` to delay search query updates for better performance.
 * - Renders a `Location` component to display the user's current location.
 */

type FoodHeaderContainerProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const FoodHeaderContainer: React.FC<FoodHeaderContainerProps> = ({searchQuery, setSearchQuery}) => {
  
  return (
    <header className="w-full py-9 flex flex-col md:flex-row justify-between gap-4">
      <Location />
      <div className="relative w-full md:w-1/3 flex">
        <SearchInput placeholder="Search Foods & Restaurants" onChange={setSearchQuery} value={searchQuery} />
      </div>
    </header>
  );
};



/**
 * Location Component
 *
 * This component displays the user's current location along with an icon.
 * 
 * Features:
 * - Displays a static address for now but can be extended for dynamic location fetching.
 * - Uses flexbox for proper alignment of the icon and text.
 */
const Location = () => {
  return (
    <div className="flex items-center gap-2 text-sm mt-8 mb-2 md:mt-0 md:mb-0">
      <FilledLocationIcon size={28} />
      <span className="font-medium">
        {"Dhaka, Bangladesh"}
      </span>
    </div>
  );
};

