"use client";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ToggleMenuIcon } from "@/assets/icons/Icons";
import { Authbutton } from "./AuthButton";
import { Dialog } from "@radix-ui/react-dialog";
import { Container } from "@/components/wrapper/Container";
import { TFLogo } from "@/components/ui/TFLogo";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";

/**
 * Checks if the given path is active.
 *
 * @param path - The navigation path to check.
 * @param currentPath - The current URL path.
 * @returns `true` if the path matches the current URL, otherwise `false`.
 */

// Helper function to check if a path is active
type PathChecker = (path: string, currentPath: string) => boolean;
const isActivePath: PathChecker = (path, currentPath) => currentPath === path;

/**
 * Navbar: A responsive navigation bar with mobile and desktop menus.
 *
 * Features:
 * - Sticky header with a top border.
 * - Desktop navigation with centrally aligned links.
 * - Mobile menu with a slide-in sidebar.
 * - Authentication button for login/logout.
 *
 * Dependencies:
 * - Uses React Router for navigation.
 * - Utilizes UI components like `Button`, `Sheet`, and `Logo`.
 */
export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <Container>
        <div className=" justify-between w-full flex h-14 items-center">
          <TFLogo />
          <MobileMenuTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
          <DesktopMenu currentPath={location.pathname} />
          <AuthSection />
        </div>
      </Container>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentPath={location.pathname}
      />
    </header>
  );
}

// Desktop Navigation Menu
interface DesktopMenuProps {
  currentPath: string;
}

/**
 * DesktopMenu: A reusable navigation menu component.
 *
 * Props:
 * - mobile?: boolean (default: false) - Adjusts styling for mobile layout.
 * - currentPath: string - The current URL path for active link highlighting.
 * - closeMenu?: () => void - Closes the menu when a link is clicked (optional).
 *
 * Behavior:
 * - Highlights active navigation links.
 * - Supports mobile-specific styling.
 */

function DesktopMenu({ currentPath }: DesktopMenuProps) {
  const user = useAppSelector(selectCurrentUser);

  /**
   * List of navigation links for the navbar.
   */
  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/menus", label: "Menu" },
    { path: "/restaurants", label: "Restaurant" },
    { path: `/${user?.role}/dashboard`, label: "Dashboard" },
  ];
  return (
    <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
      {navigationLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "transition-colors hover:text-blue-500",
            isActivePath(link.path, currentPath)
              ? "text-blue-500"
              : "text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

// Mobile Menu Trigger Button
interface MobileMenuTriggerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

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
function MobileMenuTrigger({ isOpen, setIsOpen }: MobileMenuTriggerProps) {
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

// Mobile Navigation Menu
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentPath: string;
}
function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const user = useAppSelector(selectCurrentUser);

  /**
   * List of navigation links for the navbar.
   */
  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/menus", label: "Menu" },
    { path: "/restaurants", label: "Restaurant" },
    { path: `/${user?.role}/dashboard`, label: "Dashboard" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[300px] p-6 sm:w-[400px]">
        <SheetHeader className="p-0">
          <SheetTitle>
            <TFLogo />
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
          <Authbutton mobile closeMenu={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Authentication Section
function AuthSection() {
  return (
    <div className="hidden lg:flex items-center space-x-2">
      <Authbutton />
    </div>
  );
}
