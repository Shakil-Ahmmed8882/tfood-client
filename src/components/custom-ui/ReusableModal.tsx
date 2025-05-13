import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * A reusable modal dialog component. It includes a title, optional subtitle,
 * and any children you pass in.
 *
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {(open: boolean) => void} onOpenChange - Callback function to control
 *   the open/close state of the modal.
 * @param {string} title - The title of the modal.
 * @param {string} [subtitle] - Optional subtitle for the modal.
 * @param {React.ReactNode} children - Any children you want to render within
 *   the modal.
 *
 * @example
 * import React, { useState } from 'react';
 * import ReusableModal from './ReusableModal';
 *
 * const App = () => {
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
 *
 *       <ReusableModal
 *         open={isModalOpen}
 *         onOpenChange={setIsModalOpen}
 *         title="Are you sure?"
 *         subtitle="This action cannot be undone."
 *       >
 *         <p>Example content inside the modal.</p>
 *       </ReusableModal>
 *     </div>
 *   );
 * };
 */
export function ReusableModal({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[625px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
