import { ReactNode } from "react";
import { usePermissionManager } from "./usePermissionManager";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { USER_ROLE_TYPE } from "@/constants";

export type AuthGuardProps = {
  children: ReactNode;
  requiredRole?: USER_ROLE_TYPE;
  requiredPermissions?: string | string[];
  fallback?: ReactNode;
  showLoading?: boolean;
  loadingFallback?: ReactNode;
};

/**
 * Component to protect routes or UI elements based on user roles and permissions.
 * Purpose: Ensures only authorized users can access protected content.
 * Example Use Case: Wrapping admin-only pages.
 * Output: Renders children if authorized, fallback otherwise.
 */
export const AuthGuard = ({
  children,
  requiredRole,
  requiredPermissions,
  fallback,
}: //   showLoading = false,
//   loadingFallback = <DefaultLoadingFallback />,
AuthGuardProps) => {
  /**
   * Fetches the currently authenticated user from the Redux store.
   * Purpose: Determines if a user is logged in and their role.
   * Example: { id: "123", role: "admin" }
   * Output: User object or null.
   */
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = !!user;

  /**
   * Initializes permission manager to handle role and permission validation.
   * Purpose: Centralized permission checks for cleaner component logic.
   * Example: Checks if a user has "admin" role or "edit-post" permission.
   * Output: Instance of PermissionManager or null if unauthenticated.
   */
  const pm = usePermissionManager();

  /**
   * Checks if the user has the required role.
   * Purpose: Restricts access to users with a specific role.
   * Example: If requiredRole is "admin", only users with "admin" role pass.
   * Output: true if role matches, false otherwise.
   */
  const checkRole = () => {
    if (!requiredRole) return true;
    return pm?.hasRole(requiredRole) ?? false;
  };

  /**
   * Checks if the user has the required permissions.
   * Purpose: Ensures users have necessary privileges to access a feature.
   * Example: If requiredPermissions is ["edit", "delete"], user must have both.
   * Output: true if user has permissions, false otherwise.
   */
  const checkPermissions = () => {
    if (!requiredPermissions) return true;

    if (Array.isArray(requiredPermissions)) {
      return pm?.hasPermissions(requiredPermissions) ?? false;
    }

    return pm?.hasPermission(requiredPermissions) ?? false;
  };

  /**
   * Displays a loading fallback if enabled.
   * Purpose: Prevents rendering restricted content while loading.
   * Example: Showing a spinner while verifying user access.
   * Output: Loading fallback component if enabled.
   */
  //   if (user.loading) { // use this if you have user fetching promise state like: Loading, pending
  // 	return showLoading ? loadingFallback : null;
  //   }

  /**
   * Blocks unauthorized access.
   * Purpose: Ensures only authenticated users with permissions can proceed.
   * Example: A non-admin user accessing an admin page.
   * Output: Returns children if authorized, fallback otherwise.
   */
  if (!isAuthenticated || !pm) {
    return fallback ?? null;
  }

  const hasAccess = checkRole() && checkPermissions();
  return hasAccess ? children : fallback ?? null;
};

/**
 * Default fallback component for loading state.
 * Purpose: Provides a simple loading indicator.
 * Example: Used when `showLoading` is true.
 * Output: Displays "Loading...".
 */
// const DefaultLoadingFallback = () => {
//   return <div>Loading...</div>;
// };

/**
 * Role-based access component.
 * Purpose: Simplifies checking for a single role requirement.
 * Example: Ensuring only "manager" can view a dashboard.
 * Output: Renders children if user has the role, fallback otherwise.
 */
export const HasRole = (
  props: Omit<AuthGuardProps, "requiredPermissions"> & { requiredRole: string }
) => {
  return <AuthGuard {...props} />;
};

/**
 * Permission-based access component.
 * Purpose: Grants access to users with specific permissions.
 * Example: Allowing "edit-post" permission to modify content.
 * Output: Renders children if user has required permissions, fallback otherwise.
 */
export const HasPermission = (
  props: Omit<AuthGuardProps, "requiredRole"> & {
    requiredPermissions: string | string[];
  }
) => {
  return <AuthGuard {...props} />;
};

/**
 * Role & Permission-based access component.
 * Purpose: Ensures user has both role and permissions for access.
 * Example: Requiring "admin" role and "delete-user" permission.
 * Output: Renders children if user meets both conditions, fallback otherwise.
 */
export const HasRoleAndPermission = (
  props: AuthGuardProps & {
    requiredRole: string;
    requiredPermissions: string | string[];
  }
) => {
  return <AuthGuard {...props} />;
};



/**
 * 
 * Multi-role access component.
 * Purpose: Grants access if the user has any of the specified roles.
 * Example: Allowing either "admin" or "user" roles to view content.
 * Output: Renders children if any role matches, fallback otherwise.
 */
export const HasRoles = (
  props: Omit<AuthGuardProps, "requiredRole"> & {
    requiredRoles: string[];
  }
) => {
  const { requiredRoles, ...rest } = props;

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = !!user;

  if (!isAuthenticated || !user?.role) {
    return rest.fallback ?? null;
  }

  const hasAnyRole =   requiredRoles.includes(user.role)

  return hasAnyRole ? rest.children : rest.fallback ?? null;
};













/*

  How to use

        <HasPermission requiredPermissions={"product:create"}>
          <Button>Product create</Button>
        </HasPermission>
        <HasRole requiredRole="admin">
          <Button>Admin</Button>
        </HasRole>
        <HasRole requiredRole="super_admin">
          <Button>Super Admin</Button>
        </HasRole>
        <HasRole requiredRole="shop_owner">
          <Button>Shop owner </Button>
        </HasRole>
        <HasRole requiredRole="customer">
          <Button>Customer</Button>
        </HasRole>


*/
