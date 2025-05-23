import { CustomPaginationProvider } from "@/components/pagination/PaginationProvider";
import { FoodHeaderContainer } from "@/components/ui/foodHeader";
import Title from "@/components/ui/title";
import { Container } from "@/components/wrapper/Container";
import { HomeProvider, useHomeContext } from "@/context/HomeContext";
import { FAQ } from "@/features/faq/FAQ";
import { MenuFeature } from "@/features/menu/MenuFeature";
import { RestaurantsFeature } from "@/features/restaurants/RestaurantsFeature";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowBigDownIcon, ArrowRight, Eye, } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * HomePage: The main landing page displaying restaurants and menu items.
 *
 * Features:
 * - Uses HomeProvider for shared state across components.
 * - Implements debounced search for performance optimization.
 * - Displays featured restaurants and menus with navigation links.
 * - Modular design with separate wrappers for better reusability.
 *
 *
 */

export default function HomePage() {
  return (
    <HomeProvider>
      <CustomPaginationProvider>
        <Container className="pb-8">
          <main>
            <FoodHeaderWrapper />
            <RestaurantsWrapper />
            <MenusWrapper />
            <FAQ />
          </main>
        </Container>
      </CustomPaginationProvider>
    </HomeProvider>
  );
}

/**
 * 
 * FoodHeaderWrapper: Handles search query input.
 * - Retrieves search state from HomeContext.
 * - Passes search state to FoodHeaderContainer.
 * 
 */

const FoodHeaderWrapper = () => {
  const { searchQuery, setSearchQuery } = useHomeContext();

  return (
    <FoodHeaderContainer
      searchQuery={searchQuery} // <input value={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

/**
 * RestaurantsWrapper: Displays featured restaurants.
 *
 * Features:
 * - Uses debounced search value for filtering.
 * - Provides a "See more" link for full restaurant list.
 * - Uses RestaurantsFeature component to render the list.
 */

const RestaurantsWrapper = () => {
  const { searchQuery } = useHomeContext();
  const debouncedSearchValue = useDebounce(searchQuery, 300);
  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-1">
        <Title text="Restaurants" />
                <Link to="/restaurants" className="text-[16px] flex items-center justify-center py-0 px-4 border-2 border-gray-800 rounded-2xl  hover:bg-gray-800 hover:text-white hover:scale-95 transition-all">
          <ArrowRight className="mr-2 h-4 w-4" />
          See more
        </Link>
      </div>
      <RestaurantsFeature searchQuery={debouncedSearchValue} limit="10" />
    </>
  );
};

/**
 * MenusWrapper: Displays all available menus.
 *
 * Features:
 * - Uses debounced search value for filtering.
 * - Provides a "See more" link for full menu list.
 * - Uses MenuFeature component to render the list.
 */

const MenusWrapper = () => {
  const { searchQuery } = useHomeContext();
  const debouncedSearchValue = useDebounce(searchQuery, 300);
  return (
    <>
      <div className="flex justify-between items-center mb-3 mt-5">
        <Title text="All Menus" className="mt-3" />
        <Link to="/menus" className="text-[16px] flex items-center justify-center py-0 px-4 border-2 border-gray-800 rounded-2xl mt-4 hover:bg-gray-800 hover:text-white hover:scale-95 transition-all">
          <ArrowRight className="mr-2 h-4 w-4" />
          See more
        </Link>
      </div>
      <CustomPaginationProvider>
        <MenuFeature searchQuery={debouncedSearchValue} />
      </CustomPaginationProvider>
      <div className="md:hidden flex items-center justify-center ">

      <Link to="/menus" className="text-[16px] flex items-center justify-center py-2 px-6 border-2 border-gray-800 rounded-2xl mt-4 hover:bg-gray-800 hover:text-white hover:scale-95 transition-all">
      <ArrowBigDownIcon className="mr-2 h-6 w-6" />
          See mores
      </Link>
      </div>
    </>
  );
};
