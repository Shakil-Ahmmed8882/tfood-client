import { ThinLocationIcon, StarIcon } from "@/assets/icons/Icons";
import { TRestaurant } from "../type.restaurant";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setRestaurant } from "@/store/features/restaurants/restaurantSlice";
import { truncateText } from "@/utils/turncateText";

const fallbackUrl =
  "https://media.istockphoto.com/id/1324813226/photo/modern-cafe-interior-with-wooden-table-chairs-and-vertical-garden-eco-friendly-cafe-with.jpg?s=612x612&w=0&k=20&c=7gzxZGLObCoCPjZlUxtNwzB_OIrhUupYfwpzLxuztQw=";

/**
 * RestaurantCard: Displays a single restaurant's details including image, location, rating, name, and category.
 *
 * Features:
 * - Shows a fallback image if the restaurant has no image.
 * - Displays the restaurant’s location with an icon.
 * - Uses a static rating of 4.5 (consistent with provided code).
 * - Optimized for responsiveness with Tailwind grid and media queries.
 * - Enhanced with hover effects and accessibility.
 */
export const RestaurantCard = ({ restaurant }: { restaurant: TRestaurant }) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      to={`/${restaurant?.slug}`}
      onClick={() => dispatch(setRestaurant(restaurant))}
      className="block rounded-xl overflow-hidden shadow-sm bg-white transition-all duration-300 hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`View details for ${restaurant.name}`}
    >
      <div className="relative h-32 sm:h-40 md:h-48">
        <img
          src={restaurant?.logo || fallbackUrl}
          alt={restaurant.name}
          onError={(e) => (e.currentTarget.src = fallbackUrl)}
          loading="lazy"
          className="object-cover h-full w-full transition-transform duration-300 hover:scale-105"
        />
        {/* Optional: Hover overlay for visual feedback */}
        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 sm:p-5 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <ThinLocationIcon className="text-gray-500" size={18} aria-hidden="true" />
            <span className="text-sm sm:text-base text-gray-500">
              {truncateText(restaurant.location, 15)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <StarIcon size={16} aria-hidden="true" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
          {truncateText(restaurant.name, 30)}
        </h3>
        <p className="text-sm text-gray-500">{restaurant.category}</p>
      </div>
    </Link>
  );
};