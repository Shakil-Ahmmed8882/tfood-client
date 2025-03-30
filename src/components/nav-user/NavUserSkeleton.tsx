import { Skeleton } from "../ui/skeleton";

export const LoadingSkeleton = () => (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-16" />
      </div>
    </div>
  );