import { ReactNode } from "react";
import { NoItemFound } from "../wrapper/noItemFoundContainer";
import TableSkeleton from "./Skeleton";
import { useTableContext } from ".";
import { ErrorFallback } from "../wrapper/CustomErrorBoundary";

/**
 * A wrapper component responsible for rendering the table body based on different states.
 * It dynamically displays loading, error, empty data, or the actual table content.
 * Uses `useTableContext` to access loading, error, and data states for rendering logic.
 */
export const RenderTableBody = ({ children }: { children: ReactNode }) => {
  // Extracts loading, fetching, error states, and data from the table context.
  const {
    promiseState: { isLoading, isFetching, isError },
    data,
  } = useTableContext();

  /**
   * Determines the appropriate content to render based on the table state:
   * - Shows `TableSkeleton` while data is loading or fetching.
   * - Displays an error message if `isError` is true.
   * - Renders `NoItemFound` if there is no data available.
   * - Returns the actual table content when data is available.
   */
  const renderContent = () => {
    if (isLoading || isFetching) return <TableSkeleton />;


    
    if (isError) return <ErrorFallback/>;
    if (!data || data.length === 0)
      return <NoItemFound {...{ data }}><></></NoItemFound>;
    return children;
  };

  return <>{renderContent()}</>;
};
