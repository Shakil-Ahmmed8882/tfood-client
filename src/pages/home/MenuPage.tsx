import { CustomPaginationProvider } from "@/components/pagination/PaginationProvider";
import { FoodHeaderContainer } from "@/components/ui/foodHeader";
import Title from "@/components/ui/title";
import { Container } from "@/components/wrapper/Container";
import { MenuFeature } from "@/features/menu/MenuFeature";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

/**
 * MenuPage: A page displaying available menus with a search feature.
 *
 * Features:
 * - Implements a debounced search to optimize performance.
 * - Uses FoodHeaderContainer for search input and UI consistency.
 * - Displays menu items via the MenuFeature component.
 * - Structured within a responsive Container for layout flexibility.
 */

function MenuPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchValue = useDebounce<string>(searchQuery, 300);

  return (
    <Container className="min-h-screen">
      <CustomPaginationProvider>
        <div className="">
          <FoodHeaderContainer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <Title className="pt-2" text="All Menus" />
            </div>
            <CustomPaginationProvider>
              <MenuFeature
                searchQuery={debouncedSearchValue}
                shouldPaginate={true}
              />
              
            </CustomPaginationProvider>
          </div>
        </div>
      </CustomPaginationProvider>
    </Container>
  );
}

export default MenuPage;
