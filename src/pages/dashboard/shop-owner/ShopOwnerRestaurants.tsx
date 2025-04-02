import { Button } from "@/components/ui/button";
import { DataHandler } from "@/components/wrapper/DataHandler";
import { CustomPagination, TRestaurant } from "@/features/restaurants";
import { RestaurantFormModal } from "@/features/restaurants/components/RestaurantFormModal";
import { ShopOwnerRestaurantCardSkeleton } from "@/features/restaurants/components/ShopOwnerRestaurantCardSkeleton";
import { ShopOwnerRestaurantCard } from "@/features/restaurants/components/ShopOwnerRestaurantCard";
import { useShopOwnerRestaurants } from "@/features/restaurants/hooks/useShopOwnerRestaurants";

import { useCallback, useState } from "react";

/**
 * ShopOwnerRestaurants Component:
 * - Manages the display of a shop owner's restaurants.
 * - Allows adding, editing, and paginating restaurant data.
 * - Example: A shop owner navigates here to manage their restaurants.
 */
export default function ShopOwnerRestaurants() {
  /**
   * State Management:
   * - Controls the modal visibility for adding/editing restaurants.
   * - Stores the restaurant being edited.
   * - Example: User clicks 'Edit' -> Editing modal opens with restaurant data.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<TRestaurant>();

  /**
   * Fetching Restaurants:
   * - Retrieves restaurant data for the shop owner.
   * - Manages pagination, loading states, and errors.
   * - Example: Page loads -> Displays restaurants with pagination controls.
   */
  const {
    data: restaurants,
    isLoading,
    isFetching,
    isError,
    currentPage,
    totalItems,
    itemsPerPage,
    setCurrentPage,
  } = useShopOwnerRestaurants();

  /**
   * Handle Edit Action:
   * - Sets the selected restaurant for editing and opens the modal.
   * - Example: User clicks 'Edit' on a restaurant -> Modal opens with details.
   */
  const handleEdit = useCallback((restaurant: TRestaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  }, []);

  /**
   * Handle Add Restaurant Action:
   * - Opens the modal for adding a new restaurant.
   * - Example: User clicks '+ Add Restaurant' -> Empty form modal opens.
   */
  const handleAddRestaurant = useCallback(() => {
    setEditingRestaurant(undefined);
    setIsModalOpen(true);
  }, []);

  return (
    /**
     * Page Layout:
     * - Displays title and action button for adding a new restaurant.
     * - Shows restaurant data with skeleton loading and error handling.
     * - Includes pagination for navigation.
     */
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Restaurants</h1>
        <Button onClick={handleAddRestaurant}>+ Add Restaurant</Button>
      </div>

      {/* Data Display & Handling */}
      <DataHandler<TRestaurant[]>
        data={restaurants || []}
        loadingFallback={<ShopOwnerRestaurantCardSkeleton />}
        isLoading={isLoading || isFetching}
        isError={isError}
        loadingMessage="Fetching restaurants..."
        hasData={(restaurant): restaurant is TRestaurant[] =>
          Array.isArray(restaurant) && restaurant.length > 0
        }
        errorMessage="Failed to load menus"
        noDataMessage="No Restaurants found"
      >
        {(restaurants) => (
          <div className="grid gap-4">
            {restaurants.map((restaurant) => (
              <ShopOwnerRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </DataHandler>

      {/* Pagination Controls */}
      <CustomPagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
      />

      {/* Restaurant Form Modal */}
      <RestaurantFormModal
        open={isModalOpen}
        restaurant={editingRestaurant}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}