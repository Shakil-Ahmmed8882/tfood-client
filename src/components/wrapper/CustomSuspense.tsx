
import { Skeleton } from "@/components/ui/skeleton"

type CustomSuspenseProps = {
    isLoading: boolean;
    fallback?: React.ReactNode;
    children: React.ReactNode;
  };

  
/**
 * CustomSuspense Component:
 * - Handles loading state for asynchronous components.
 * - Displays a fallback UI while data is loading.
 * - Uses a default or custom fallback skeleton.
 */


  
  export const CustomSuspense = ({ isLoading, fallback, children }: CustomSuspenseProps) => {
    const defaultFallback = <SuspenseFallback/>
    return isLoading ? fallback?? defaultFallback : children;
  };
  

/**
 * SuspenseFallback Component:
 * - Provides a simple loading skeleton UI.
 * - Displays placeholder elements with spacing.
 */

function SuspenseFallback() {
  return (
    <div className="items-center space-y-3 space-x-4 h-[30vh]">
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-[90%] " />
        <Skeleton className="h-4 w-full " />
    </div>
  )
}
