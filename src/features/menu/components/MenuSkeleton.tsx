import { CardSkeleton } from "@/components/skeleton/CardSkeleton";


/**  
 * MenuSkeleton: Displays a loading skeleton for menu items while
 *  data is being fetched.  
 *  
 * Features:  
 * - Uses `CardSkeleton` components to simulate loading states for menu cards.  
 * - Maintains a responsive grid layout to match the actual menu display.  
 * - Ensures a consistent UI experience during data fetching.  
 */

const MenuSkeleton = () => {
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

export default MenuSkeleton;