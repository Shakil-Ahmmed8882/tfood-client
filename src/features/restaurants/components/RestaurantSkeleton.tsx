import { CardSkeleton } from "@/components/skeleton/CardSkeleton";


/**
 * RestaurantSkeleton: Displays loading skeletons while restaurant data is being fetched.
 * 
 * Structure:
 * - Uses a responsive grid to match the restaurant card layout.
 * - Renders multiple `CardSkeleton` components to simulate loading state.
 */

const RestaurantSkeleton = () => {
  return (
    <section className="grid grid-cols-1 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
    </section>
  );
};

export default RestaurantSkeleton;