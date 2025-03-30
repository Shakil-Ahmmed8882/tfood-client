import { ReactNode } from "react";
import { Table, useTableContext } from ".";


/**
 * A wrapper component for the table that manages its loading state and styling dynamically.
 * It ensures that when data is loading or unavailable, the table visually reflects this state.
 * The component uses `useTableContext` to access loading states and table data.
 * It enhances user experience by displaying animations or opacity changes during loading.
 */
export const ParentTable = ({ children }: { children: ReactNode }) => {
    // Extracts loading state and data from the table context
    const { promiseState: { isLoading, isFetching }, data = [] } = useTableContext();

    return (
        /**
         * Renders the table with conditional styling:
         * - Applies `opacity-80` and `animate-pulse` when data is loading or empty.
         * - Uses `flex flex-col` for layout adjustments in loading state.
         * - Defaults to `px-3` for standard table spacing when data is available.
         */
        
        <Table className={`${(isLoading || isFetching || data?.length === 0) ? "opacity-80 animate-pulse flex flex-col" : "px-3"} `}>
            {children}
        </Table>

    );
};

