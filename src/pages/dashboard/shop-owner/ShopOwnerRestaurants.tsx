import { Button } from "@/components/ui/button";
import { DataHandler } from "@/components/wrapper/DataHandler";
import { CustomPagination, TRestaurant } from "@/features/restaurants";
import { RestaurantFormModal } from "@/features/restaurants/components/RestaurantFormModal";
import { ShopOwnerCardSkeleton } from "@/features/restaurants/components/ShopOwnerRestaurantCardSkeleton";
import { ShopOwnerRestaurantCard } from "@/features/restaurants/components/ShopOwnerRestaurantCard";
import { useShopOwnerRestaurants } from "@/features/restaurants/hooks/useShopOwnerRestaurants";

import { useCallback, useState } from "react";

export default function ShopOwnerRestaurants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<TRestaurant>();

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

  const handleEdit = useCallback((restaurant: TRestaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  }, []);

  const handleAddRestaurant = useCallback(() => {
    setEditingRestaurant(undefined);
    setIsModalOpen(true);
  }, []);

  return (
    // <DashboardContainer>

    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Restaurants</h1>
        <Button onClick={handleAddRestaurant}>+ Add Restaurant</Button>
      </div>

      <DataHandler<TRestaurant[]>
        data={restaurants || []}
        loadingFallback={<ShopOwnerCardSkeleton />}
        isLoading={isLoading || isFetching}
        isError={isError}
        loadingMessage="Fetching menus..."
        hasData={(restaurant): restaurant is TRestaurant[] =>
          Array.isArray(restaurant) && restaurant.length > 0
        }
        errorMessage="Failed to load menus"
        noDataMessage="No menus found"
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

      <CustomPagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
      />

      <RestaurantFormModal
        open={isModalOpen}
        restaurant={editingRestaurant}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
