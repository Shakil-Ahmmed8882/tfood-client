import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ToggleMenuIcon } from "@/assets/icons/Icons";
import { Authbutton } from "../AuthButton";
import { Dialog } from "@radix-ui/react-dialog";

import { Logo } from "@/components/ui/TFLogo";
import { HasRoles } from "@/lib/pm/AuthGuard";
import { MobileMenuProps, MobileMenuTriggerProps } from "../type";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { navigationLinks } from "../constants";
import appConfig from "@/config/appConfig";













 
/**
 * MobileMenu: A slide-in menu for mobile navigation.
 *
 * Props:
 * - isOpen: boolean - Controls menu visibility.
 * - setIsOpen: (open: boolean) => void - Function to toggle menu state.
 * - currentPath: string - The current URL path for active link highlighting.
 *
 * Behavior:
 * - Uses a sheet component for a smooth slide-in effect.
 * - Displays navigation links and an authentication button.
 * - Closes when a link or login button is clicked.
 */
export function MobileMenuTrigger({ isOpen, setIsOpen }: MobileMenuTriggerProps) {
    return (
      <div className="lg:hidden">
        <Dialog>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ToggleMenuIcon />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
        </Dialog>
      </div>
    );
  }





  export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const user = useAppSelector(selectCurrentUser);
  
  
    const renderMobileDashboardRoute = () => {
      return (
        <Link
          to={`/${user?.role}/restaurants`}
          className="flex w-full py-4 border-b transition-colors hover:text-blue-500"
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </Link>
      );
    };
  
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[300px] p-6 sm:w-[400px]">
          <SheetHeader className="p-0">
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col mt-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex w-full py-4 border-b transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
  
            <HasRoles requiredRoles={appConfig.roleBasedRouteOptions}>
              {renderMobileDashboardRoute()}
            </HasRoles>
  
            {/* <HasRole requiredRole="">{renderDashboardRoute()}</HasRole> */}
  
            <Authbutton mobile closeMenu={() => setIsOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    );
  } 