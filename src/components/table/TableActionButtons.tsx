import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

/**
 * TableActionButtonsProps Interface
 *
 * Defines the props for the `TableActionButtons` component.
 * `onEdit`: Optional function triggered when the edit button is clicked.
 * `onDelete`: Optional function triggered when the delete button is clicked.
 * `showEit`: Boolean flag to control the visibility of the edit button (default: true).
 */
interface TableActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  showEit?: boolean;
}

/**
 * TableActionButtons Component
 *
 * Displays action buttons inside a table cell.
 * Includes an edit button (if `showEit` is true) and a delete button.
 * Buttons are styled with `ghost` variant and minimal padding for a clean UI.
 */
export const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  onEdit,
  onDelete,
  showEit = true,
}) => {
  return (
    <div className="p-0 flex">
      {/**
       * Edit Button
       *
       * Renders only if `showEit` is true.
       * Uses `ghost` variant with minimal padding to match table aesthetics.
       * Triggers the `onEdit` function when clicked.
       */}
      {showEit && (
        <Button variant="ghost" className="p-0" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4 text-slate-500" />
        </Button>
      )}

      {/**
       * Delete Button
       *
       * Always visible, allows users to remove a table entry.
       * Uses a red-colored trash icon to indicate a destructive action.
       * Calls `onDelete` function when clicked.
       */}
      <Button variant="ghost" className="p-0" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};
