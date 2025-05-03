import { Skeleton } from "@/components/ui/skeleton";

export function FilterSkeleton({ className }: { className?: string }) {
  return (
    <div className={`${className} flex p-4 py-4 flex-col  space-y-2`}>
      <Skeleton  className="h-5 w-full rounded-lg" />
      <Skeleton  className="h-4 w-[80%] rounded-lg" />
      <Skeleton  className="h-4 w-[90%] rounded-lg" />
    </div>
  );
}
