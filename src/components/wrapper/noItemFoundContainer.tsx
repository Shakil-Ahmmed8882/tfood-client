import { SearchIcon } from "@/assets/icons/Icons";
import { ReactNode } from "react";

type NoItemFoundProps = {
  data: any[] | undefined;
  fallback?: ReactNode;
  children: ReactNode;
  message?: string;
};

/**
 * NoItemFound Component:
 * - Displays a fallback UI when no data is available.
 * - Renders children if data exists.
 * - Allows custom fallback UI via props.
 */

export const NoItemFound = ({
  data,
  fallback,
  children,
  message,
}: NoItemFoundProps) => {
  if (!data || data?.length === 0) {
    return <>{fallback || <NotItemFoundFallback message={message} />}</>;
  }
  return <>{children}</>;
};

/**
 * NotItemFoundFallback Component:
 * - Default UI when no items are found.
 * - Shows a search icon and message.
 * - Encourages users to adjust filters.
 */

const NotItemFoundFallback = ({ message }: { message?: string }) => {
  return (
<>


    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-gray-200 bg-white shadow-none">
      <div className="w-16 h-16 rounded-full bg-[hsl(44,100%,95%)] bg-opacity-10 flex items-center justify-center mb-4">
        {/* <AlertCircle className="" /> */}
        <SearchIcon className="w-8 h-8 text-[#fdc000]" />
      </div>

      <h3 className="text-lg font-medium text-gray-800 mb-2">
        {message || "Not Found!"}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any items matching your criteria. Please try again with
        different filters.
      </p>
    </div>


</>
    
  );
};
