import { Skeleton } from "@/components/ui/skeleton";

export function TabSkeleton({ className }: { className?: string }) {
  return (
    <div className={`${className} flex space-x-2`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-lg" />
      ))}
    </div>
  );
}
