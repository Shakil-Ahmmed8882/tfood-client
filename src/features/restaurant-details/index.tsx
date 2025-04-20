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
import { RestaurantUrlEditor } from "./components/RestaurantURLEditor.tsx";


export const RestaurantDetails = () => {
  const cachedRestaurant = useAppSelector(selectCurrentRestaurant);
  const { slug } = useParams();

  /**
   * Conditionally skip the API call if the restaurant data is already cached.
   * If the cached restaurant ID matches the current route ID, avoid unnecessary fetching.
   */
  const shouldSkip = cachedRestaurant?.slug === slug;
  const { data, isLoading, isError } = useGetRestaurantByIdQuery(slug as string, {
    skip: shouldSkip,
  });

  /**
   * Use the cached restaurant data if available; otherwise, use API response data.
   * This ensures data consistency and avoids redundant API calls.
   */
  const restaurant = cachedRestaurant?.slug === slug ? cachedRestaurant : data?.data;

  return (
    <Container className="py-6 ">
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
      {/* <MenuTabs res_id={restaurant?.id}/> */}
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

type TRestaurantDetailsCardProps = {
  restaurant: TRestaurant | null | undefined;
};
const RestaurantDetailsCard = ({ restaurant }: TRestaurantDetailsCardProps) => {
  // Fallback image for missing logo
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Restaurant Logo */}
          <div className="col-span-1">
            <img
              src={restaurant?.related_images ? restaurant.logo : fallbackImage}
              alt="Hot Tgys Restaurant"
              className="w-full h-48 md:h-64 rounded-lg object-cover object-top transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Main Restaurant Details Section */}
          <div className="col-span-1">
            <CardHeader className="p-0 mb-4">
              {/* Restaurant Name & Category */}
              <CardTitle className="text-2xl font-bold text-gray-900">
                Hot Tgys Restaurant
              </CardTitle>
              <p className="text-sm text-gray-500">Cuisine Type</p>
            </CardHeader>

            {/* Rating Section (Static 4.8) */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4.8 ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                    }`}
                    aria-label={`Star ${star}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">4.8</span>
            </div>

            {/* Opening Hours and Location */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                <span>9AM - 10PM</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                <a
                  href="https://maps.google.com/?q=123+Main+Street"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                  aria-label="View location on map"
                >
                  123 Main Street
                </a>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {restaurant?.description || "Delicious food with a cozy ambiance."}
              </p>
            </div>

            {/* Restaurant URL Editor */}
            <div className="mt-4">
              <RestaurantUrlEditor res_id={restaurant?.id} />
            </div>
          </div>

          {/* Contact Information (Right Side on Large Screens) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1  lg:pl-6 flex flex-col justify-start align-s ">
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                <a
                  href="tel:+01234567890"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Call restaurant"
                >
                  +01234567890
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                <a
                  href="http://resonica.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                  aria-label="Visit restaurant website"
                >
                  resonica.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantDetailsCard;