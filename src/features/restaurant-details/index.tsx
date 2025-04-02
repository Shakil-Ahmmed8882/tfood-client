import { Star, Clock, MapPin, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodHeaderContainer } from "@/components/ui/foodHeader";
import { Container } from "@/components/wrapper/Container.tsx";
import { useGetRestaurantByIdQuery } from "@/store/features/restaurants/restaurantApi";
import { useParams } from "react-router-dom";
import { CustomErrorBoundary } from "@/components/wrapper/CustomErrorBoundary";
import { CustomSuspense } from "@/components/wrapper/CustomSuspense";
import { NoItemFound } from "@/components/wrapper/noItemFoundContainer";
import RestaurantDetailsSkeleton from "./components/RestaurantDetailsSkeleton";
import { TRestaurant } from "../restaurants/type.restaurant.ts";
import { useAppSelector } from "@/store/hooks.ts";
import { selectCurrentRestaurant } from "@/store/features/restaurants/restaurantSlice.ts";
import MenuTabs from "./components/MenuTabItem.tsx";

export const RestaurantDetails = () => {
  const cachedRestaurant = useAppSelector(selectCurrentRestaurant);
  const { id } = useParams();


  /**
   * Conditionally skip the API call if the restaurant data is already cached.
   * If the cached restaurant ID matches the current route ID, avoid unnecessary fetching.
   */
  const shouldSkip = cachedRestaurant?.id === id;
  const { data, isLoading, isError } = useGetRestaurantByIdQuery(id as string, {
    skip: shouldSkip,
  });

  /**
   * Use the cached restaurant data if available; otherwise, use API response data.
   * This ensures data consistency and avoids redundant API calls.
   */
  const restaurant = cachedRestaurant?.id === id ? cachedRestaurant : data?.data;

  return (
    <Container className="py-6">
      {/* Search bar and header for the restaurant page */}
      <FoodHeaderContainer searchQuery="" setSearchQuery={() => {}} />
      <CustomErrorBoundary error={isError}>
        <CustomSuspense
          isLoading={isLoading}
          fallback={<RestaurantDetailsSkeleton />}
        >
          {/* If no restaurant is found, display a "No Item Found" message */}
          <NoItemFound
            data={[restaurant]}
            message="This restaurant is not available"
          >
            <RestaurantDetailsCard restaurant={restaurant} />
          </NoItemFound>
        </CustomSuspense>
      </CustomErrorBoundary>
      <MenuTabs/>
    </Container>
  );
};

/**
 * RestaurantDetailsCard Component:
 * Displays detailed information about the restaurant, including:
 * - Restaurant image and basic details (name, category, rating).
 * - Operating hours, location, and description.
 * - Contact details such as phone number and website link.
 */
const RestaurantDetailsCard = ({
  restaurant,
}: {
  restaurant: TRestaurant | undefined | null;
}) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <CardContent className="">
        <div className="flex flex-col md:flex-row gap-6 h-80 ">
          {/* Restaurant Logo */}
          <div className="w-full md:w-1/4 lg:w-1/2">
            <img
              src={
                restaurant?.related_images ? restaurant.related_images[0] : ""
              }
              alt="Hot Tgys Restaurant"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Main Restaurant Details Section */}
          <div className="w-full md:w-2/4 lg:w-3/5">
            <CardHeader className="p-0">
              {/* Restaurant Name & Category */}
              <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
                {restaurant?.name || "Hot Tgys Restaurant"}
              </CardTitle>
              <p className="text-gray-600 mb-3">{restaurant?.category}</p>
            </CardHeader>

            {/* Rating Section (Static 4.8 for now) */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4.8
                        ? "text-[#fdc000] fill-[#fdc000]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                4.8
              </span>
            </div>

            {/* Opening Hours and Location */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>9AM - 10PM</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{restaurant?.location}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600">{restaurant?.description}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">+01234567890</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <a
                  href="http://resonica.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  http://resonica.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
