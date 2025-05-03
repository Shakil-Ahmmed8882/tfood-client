


// Desktop Navigation Menu
export interface DesktopMenuProps {
    currentPath: string;
  }
  
  
  // Mobile Menu Trigger Button
export interface MobileMenuTriggerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }

  // Mobile Navigation Menu
  export interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currentPath: string;
  }
