import { ThinLocationIcon, StarIcon } from "@/assets/icons/Icons";
import { TRestaurant } from "../type.restaurant";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setRestaurant } from "@/store/features/restaurants/restaurantSlice";
import { truncateText } from "@/utils/turncateText";
const fallbackUrl = "https://media.istockphoto.com/id/1324813226/photo/modern-cafe-interior-with-wooden-table-chairs-and-vertical-garden-eco-friendly-cafe-with.jpg?s=612x612&w=0&k=20&c=7gzxZGLObCoCPjZlUxtNwzB_OIrhUupYfwpzLxuztQw="


/**
 * RestaurantCard: Displays a single restaurant's details including image, location, rating, name, and category.
 * 
 * Features:
 * - Shows a fallback image if the restaurant has no image.
 * - Displays the restaurant’s location with an icon.
 * - Shows a static rating (replace with dynamic rating when available).
 * - Uses a clean, structured layout with Tailwind classes.
 * */

export const RestaurantCard = ({ restaurant }: { restaurant: TRestaurant }) => {
  const dispatch = useAppDispatch();
  
  return (
    // Cache the restaurant to prevent unnecessary data load
    <Link to={`/${restaurant?.slug}`} onClick={() => dispatch(setRestaurant(restaurant))}>
    <div key={restaurant.id} className="rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-[129px] bg-yellow-400">
        <img
          src={restaurant?.related_images[0] || fallbackUrl}
          alt={restaurant.name}
          onError={(e) => (e.currentTarget.src = fallbackUrl)}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-1">
            <ThinLocationIcon className="text-[#555555]" size={18} />
            <span className="text-[16px] text-gray-500 ml-1">
              {restaurant.location}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#fdc000]">
            {/* <StarIcon /> {restaurant.rating.toFixed(1)} */}
            <StarIcon /> 4.5
          </div>
        </div>

        <h3 className="text-md font-medium py-2">{truncateText(restaurant.name, 30)}</h3>
        <p className="text-sm text-gray-500">{restaurant.category}</p>
      </div>
    </div>
    </Link>
  );
};
