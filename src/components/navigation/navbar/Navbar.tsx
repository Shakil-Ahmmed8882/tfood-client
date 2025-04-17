import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Authbutton } from "./AuthButton";
import { Container } from "@/components/wrapper/Container";
import { Logo } from "@/components/ui/TFLogo";
import { MobileMenu, MobileMenuTrigger } from "./components/mobileMenu";
import { DesktopMenu } from "./components/desktopNavItem";

/**
 * Checks if the given path is active.
 *
 * @param path - The navigation path to check.
 * @param currentPath - The current URL path.
 * @returns `true` if the path matches the current URL, otherwise `false`.
 */


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
          <Logo />
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




// Authentication Section
function AuthSection() {
  return (
    <div className="hidden lg:flex items-center space-x-2">
      <Authbutton />
    </div>
  );
}
