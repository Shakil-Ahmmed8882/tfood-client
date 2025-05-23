import { Star, Clock, MapPin, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodHeaderContainer } from "@/components/ui/foodHeader";
import { Container } from "@/components/wrapper/Container.tsx";
import { useGetRestaurantByIdQuery } from "@/store/features/restaurants/restaurantApi";
import { useParams } from "react-router-dom";
import { CustomErrorBoundary } from "@/components/wrapper/CustomErrorBoundary";
import { CustomSuspense } from "@/components/wrapper/CustomSuspense";
import { NoItemFound } from "@/components/wrapper/noItemFoundContainer";
import RestaurantDetailsSkeleton from "./components/RestaurantDetailsSkeleton.tsx";
import { TRestaurant } from "../restaurants/type.restaurant.ts";
import { useAppSelector } from "@/store/hooks.ts";
import { selectCurrentRestaurant } from "@/store/features/restaurants/restaurantSlice.ts";
import MenuTabs from "./components/MenuTabItem.tsx";
import { RestaurantUrlEditor } from "./components/RestaurantURLEditor.tsx";
import { HasRoles } from "@/lib/pm/AuthGuard";
import { USER_ROLES } from "@/constants/index.ts";
import { TimeFormatter } from "@/lib/TimeFormatter.ts";
import NotFound from "@/pages/NotFound.tsx";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce.ts";
import { CustomPaginationProvider } from "@/components/pagination/PaginationProvider.tsx";

export const RestaurantDetails = () => {
  const cachedRestaurant = useAppSelector(selectCurrentRestaurant);

  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchValue = useDebounce<string>(searchQuery, 300);

  /**
   * Conditionally skip the API call if the restaurant data is already cached.
   * If the cached restaurant ID matches the current route ID, avoid unnecessary fetching.
   */
  const shouldSkip = cachedRestaurant?.slug === slug;
  const { data, isLoading, isError } = useGetRestaurantByIdQuery(
    slug as string,
    {
      skip: shouldSkip,
    }
  );

  /**
   * Use the cached restaurant data if available; otherwise, use API response data.
   * This ensures data consistency and avoids redundant API calls.
   */
  const restaurant =
    cachedRestaurant?.slug === slug ? cachedRestaurant : data?.data;

  if (restaurant?.slug !== slug && !isLoading) return <NotFound />;

  return (
      <Container className="pt-0 md:py-6 ">
        {/* Search bar and header for the restaurant page */}
        <FoodHeaderContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
        <MenuTabs searchQuery={debouncedSearchValue} restaurant={restaurant} />
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
        <div className="sm:flex justify-between flex-wrap md:gap-6 ">
          {/* Left Section: Logo and Basic Details */}
          <div className="flex gap-4 md:gap-6 items-start">
            {/* Restaurant Logo */}
            <div className="">
              <img
                src={
                  restaurant?.related_images ? restaurant.logo : fallbackImage
                }
                alt={restaurant?.name}
                onError={(e) => (e.currentTarget.src = fallbackImage)}
                className="size-30 md:w-34 md:h-34 rounded-lg  object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Main Restaurant Details */}
            <div className="space-y-1.5">
              <CardHeader className="p-0">
                {/* Restaurant Name & Category */}
                <CardTitle className="md:text-2xl font-bold text-gray-900">
                  {restaurant?.name || "Restaurant Name"}
                </CardTitle>
                <p className="text-sm text-gray-500">{restaurant?.category}</p>
              </CardHeader>

              {/* Rating Section */}
              <div className="flex items-center">
                <div className="flex items-center pt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4.8
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }`}
                      aria-label={`Star ${star}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  {restaurant?.rating || 4.9}
                </span>
              </div>

              {/* Opening Hours and Location */}

              <div className="flex items-center text-sm text-gray-600">
                <Clock
                  className="h-5 w-5 mr-2 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-xs md:text-base">
                  {TimeFormatter.toAmPm(
                    `${restaurant?.operating_hours?.open}`
                  ) || "9:00 AM"}{" "}
                  -{" "}
                  {TimeFormatter.toAmPm(
                    `${restaurant?.operating_hours?.close}`
                  ) || "10:00 PM"}
                </span>
              </div>
              {/* location */}
              <div className="flex items-center pt-1 text-sm text-gray-600">
                <MapPin
                  className="h-5 w-5 mr-2 text-gray-400"
                  aria-hidden="true"
                />

                <a
                  href={`${restaurant?.location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                  aria-label="View location on map"
                >
                  Location
                </a>
              </div>
            </div>
          </div>

          {/* Right Section: Description and Contact */}
          <div className="mt-4 md:mt-0">
            {/* Description Section */}
            <div className="">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {restaurant?.description ||
                  "Delicious food with a cozy ambiance."}
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <Phone
                    className="h-5 w-5 mr-2 text-gray-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${restaurant?.contact}`}
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Call restaurant"
                  >
                    {restaurant?.contact || "N/A"}
                  </a>
                </div>
                {restaurant?.website && (
                  <div className="flex items-center">
                    <Globe
                      className="h-5 w-5 mr-2 text-gray-400"
                      aria-hidden="true"
                    />
                    <a
                      href={`https://${restaurant?.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                      aria-label="Visit restaurant website"
                    >
                      {restaurant?.website || "N/A"}
                    </a>
                  </div>
                )}
              </div>

              {/* Restaurant URL Editor */}
              <div className="mt-1">
                <HasRoles requiredRoles={[USER_ROLES.ADMIN]}>
                  <RestaurantUrlEditor
                    defaultSlug={restaurant?.slug}
                    res_id={restaurant?.id}
                  />
                </HasRoles>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantDetailsCard;
