import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

/**
 * TableHeaderRow Component
 *
 * Dynamically generates a table header row.
 * Accepts an array of column headings and maps them into `TableHead` elements.
 * Ensures the first column has extra padding for alignment.
 * const headsArray = ["ID", "Name", "Email", "Role", "Status", "Actions"];
 */
const TableHeaderRow = ({ headsArray }: { headsArray: string[] }) => {
  return (
    <TableHeader>
      {/**
       * Table Row for Header
       *
       * Creates a single row (`TableRow`) containing all column headers.
       * Uses a "text-start" class to align text to the left for readability.
       */}
      <TableRow className="text-start !h-12">
        {/**
         * Mapping Header Titles
         *
         * Iterates over `headsArray` to dynamically generate table headers.
         * Adds left padding to the first column for better alignment.
         */}
        {headsArray.map((head, index) => (
          <TableHead className={`${index === 0 && "pl-5"} `} key={head}>
            {head}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderRow;
