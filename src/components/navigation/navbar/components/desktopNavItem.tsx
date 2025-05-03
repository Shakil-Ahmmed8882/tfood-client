import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { HasRoles } from "@/lib/pm/AuthGuard";
import { DesktopMenuProps } from "../type";
import { navigationLinks } from "../constants";
import appConfig from "@/config/appConfig";
import { USER_ROLES } from "@/constants";


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

export function DesktopMenu({ currentPath }: DesktopMenuProps) {
  const user = useAppSelector(selectCurrentUser);
  let dashboardPath:string;
switch (user?.role) {
  case USER_ROLES.ADMIN:
    dashboardPath =`/${user?.role}/dashboard`;
    break;
  case USER_ROLES.SHOP_OWNER:
    dashboardPath = `/${user?.role}/restaurants`;
    break;
  default:
    break;
}
  const renderDesktopDashboardRoute = () => {
    return (
      <Link
        to={dashboardPath}
        className={cn(
          "transition-colors hover:text-blue-500",
          isActivePath(`/${user?.role}/dashboard`, currentPath)
            ? "text-blue-500"
            : "text-foreground"
        )}
      >
        Dashboard
      </Link>
    );
  };

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
         <HasRoles requiredRoles={appConfig.roleBasedRouteOptions}>
            {renderDesktopDashboardRoute()}
          </HasRoles>
    </nav>
  );
}

