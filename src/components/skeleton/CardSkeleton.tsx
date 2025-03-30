import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton({className}: {className?: string}) {
  return (
    <div className={`${className} flex flex-col space-y-3 w-full`}>
      <Skeleton className="h-[180px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full max-w-[250px]" />
        <Skeleton className="h-4 w-full max-w-[200px]" />
      </div>
    </div>
  );
}
