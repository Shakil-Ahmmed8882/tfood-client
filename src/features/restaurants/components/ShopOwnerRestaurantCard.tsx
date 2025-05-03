import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Pencil, Star, Trash2 } from "lucide-react";
import { memo, useState } from "react";
import { TRestaurant } from "../type.restaurant";
import { cn } from "@/lib/utils";
import { useDeleteRestaurantMutation } from "@/store/features/restaurants/restaurantApi";
import { ConfirmModal } from "@/components/custom-ui/ConfirmModal";
import { SubscriptionCountdown } from "./SubscriptionCountdown";
import { formatDate } from "date-fns";
import { HasRole } from "@/lib/pm/AuthGuard";
import { RestaurantUrlEditor } from "@/features/restaurant-details/components/RestaurantURLEditor";
import { USER_ROLES } from "@/constants";


export const ShopOwnerRestaurantCard = memo(
  ({
    restaurant,
    onEdit,
  }: {
    restaurant: TRestaurant;
    onEdit: (restaurant: TRestaurant) => void;
  }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteRestaurant] = useDeleteRestaurantMutation();
    const handleDelete = async () => {
      try {
        const response = await deleteRestaurant(restaurant.id);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };



    // console.log(restaurant);
    return (
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Logo and Details Section */}
          <div className="w-full md:w-72 flex-shrink-0">
            <img
              src={restaurant.logo || "/placeholder.svg"}
              alt={`${restaurant.name} logo`}
              className="h-40 w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          {/* Details Section */}
          <div className="flex-1 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <span
                  className={cn(
                    "text-sm capitalize font-semibold",
                    restaurant.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {restaurant.status === "active" ? (
                    <span className="animate-pulse h-2 w-2 mr-1 bg-green-600 rounded-full inline-block" />
                  ) : (
                    <span className="animate-ping h-2 w-2  mr-1 bg-red-600 rounded-full inline-block" />
                  )}
                  {restaurant.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {restaurant?.type || "Not specified"}
              </p>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.location}</span>
              </div>
            </div>

            <div className="flex justify-between  gap-20">
              <div className="space-y-2">
                <p className="font-medium">Subscription</p>

                <div className="w-fit rounded bg-yellow-50 px-2 py-1 text-sm text-yellow-600">
                  {formattedSubscriptionDate(restaurant?.subscription)}
                  <SubscriptionCountdown
                    endDate={restaurant?.subscription.endDate}
                  />
                </div>
                <HasRole requiredRole={USER_ROLES.SHOP_OWNER}>
                  <RestaurantUrlEditor defaultSlug={restaurant?.slug} res_id={restaurant?.id}  />
                </HasRole>
              </div>

              <div className="flex gap-2 self-center mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(restaurant)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsDeleteModalOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDelete}
          title="Are you sure?"
          description="This action cannot be undone."
          confirmText="Yes, delete it"
          cancelText="No, cancel"
        />
      </Card>
    );
  }
);

// Add display name for better debugging
ShopOwnerRestaurantCard.displayName = "ShopOwnerRestaurantCard";


const formattedSubscriptionDate = (subscriptionDate:{startDate:string, endDate:string}) => {
if(subscriptionDate.startDate && subscriptionDate.endDate) {
  return `${formatDate(subscriptionDate.startDate, "d MMM, yy")} - ${formatDate(subscriptionDate.endDate, "d MMM, yy")}` 
}else {
  return "N/A"
}
};