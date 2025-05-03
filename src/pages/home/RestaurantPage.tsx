import { ErrorBoundary } from "@/components/wrapper/ErrorBoundary";
import { FoodHeaderContainer } from "@/components/ui/foodHeader";
import Title from "@/components/ui/title";


import { useDebounce } from "@/hooks/useDebounce";
import { Suspense, useState } from "react";
import { Container } from "@/components/wrapper/Container";
import { RestaurantsFeature } from "@/features/restaurants/RestaurantsFeature";



/**  
 * RestaurantPage: Displays a list of restaurants with search functionality.  
 *  
 * Features:  
 * - Implements error handling with ErrorBoundary.  
 * - Uses Suspense to show a loading state while fetching data.  
 * - Includes debounced search input for performance optimization.  
 */
export default function RestaurantPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchValue = useDebounce<string>(searchQuery, 300);

  return (
    <Container>
      <ErrorBoundary fallback={<p>Error occurred</p>}>
        <Suspense fallback={<>Loading restaurants...</>}>
          <FoodHeaderContainer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Restaurants Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <Title text="Restaurants" />
            </div>
            <RestaurantsFeature searchQuery={debouncedSearchValue} shouldPaginate={true}/>
          </div>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}
