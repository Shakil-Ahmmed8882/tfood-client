import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ShopOwnerRestaurantCardSkeleton = () => {
  return (
<Card className="p-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-72 flex-shrink-0">
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>

        <div className="flex-1 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="flex gap-2 self-center mt-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

