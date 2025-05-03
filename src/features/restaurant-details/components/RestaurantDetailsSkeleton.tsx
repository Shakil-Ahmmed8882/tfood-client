import { Skeleton } from "@/components/ui/skeleton";

/**
 * RestaurantDetailsSkeleton.tsx : Displays a loading skeleton for RestaurantDetailsSkeleton items while
 * data is being fetched.
 *
 * Features:
 * - Mimics the layout of actual restaurant details.
 * - Includes placeholders for image, title, rating, address, description, and contact info.
 * - Ensures a smooth UI experience during loading.
 */

const RestaurantDetailsSkeleton = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
      {/* Image Skeleton */}
      <Skeleton className="h-[250px] w-[250px] md:h-[300px] md:w-[300px] rounded-xl" />

      {/* Content Skeleton */}
      <div className="flex flex-col w-full max-w-[700px] gap-4">
        {/* Title */}
        <Skeleton className="h-[24px] w-[60%] rounded-md" />

        {/* Subtitle */}
        <Skeleton className="h-[20px] w-[40%] rounded-md" />

        {/* Rating and Info */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-[20px] w-[100px] rounded-md" />
          <Skeleton className="h-[20px] w-[60px] rounded-md" />
        </div>

        {/* Address */}
        <Skeleton className="h-[20px] w-[80%] rounded-md" />

        {/* Description */}
        <Skeleton className="h-[16px] w-full rounded-md" />
        <Skeleton className="h-[16px] w-[90%] rounded-md" />
        <Skeleton className="h-[16px] w-[80%] rounded-md" />

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[18px] w-[50%] rounded-md" />
          <Skeleton className="h-[18px] w-[40%] rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetailsSkeleton;
