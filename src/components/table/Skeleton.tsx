import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * TableSkeleton Component
 *
 * This component renders a skeleton placeholder for a table when data is loading.
 * It displays multiple rows with animated skeletons, mimicking the structure of the table.
 * Provides a smooth user experience by maintaining layout consistency during loading.
 */
export default function TableSkeleton() {
  // Creates an array of 7 items to generate placeholder rows dynamically.
  const skeletonRows = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <Table className="w-full">
      <TableBody>
        {skeletonRows.map((row) => (
          <TableRow key={row}>
            {/* Generates skeleton placeholders for each table column with varying widths */}
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            {/* Special column for action buttons with rounded skeletons */}
            <TableCell>
              <Skeleton className="h-6 w-16 rounded-full" />
            </TableCell>
            {/* Right-aligned actions section with circular skeleton buttons */}
            <TableCell className="text-right flex justify-end space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * TablePaginationSkeleton Component
 *
 * This component provides a skeleton UI for table pagination controls while data is loading.
 * It maintains layout consistency and ensures users see a structured pagination area.
 * The component includes placeholders for pagination buttons with different sizes and shapes.
 */
export function TablePaginationSkeleton() {
  return (
    <Table className="-pt-3">
      <TableBody>
        <TableRow className="flex items-center justify-between">
          {/* Left section with pagination navigation buttons */}
          <TableCell className="pl-[10px] flex gap-3 items-center">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-6 w-6 rounded-lg" />
          </TableCell>
          {/* Right section with navigation and pagination action buttons */}
          <TableCell className="text-right pr-[8px] flex justify-end space-x-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
