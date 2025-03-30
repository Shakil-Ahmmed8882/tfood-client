import { useAppSelector } from "@/store/hooks";
import { PermissionManager } from "./PermissionManager";
import { useMemo } from "react";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { USER_ROLE_TYPE } from "@/constants";

/**
 * Custom hook to manage user permissions efficiently.
 * Purpose: Provides an instance of PermissionManager based on user role.
 * Example Use Case: Used in protected components to check user access.
 * Output: Returns a PermissionManager instance or null if unauthenticated.
 */
export const usePermissionManager = () => {
  /**
   * Fetches the currently authenticated user from the Redux store.
   * Purpose: Determine the user's authentication status and role.
   * Example: { id: "123", role: "admin" }
   * Output: User object or null.
   */
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = !!user;

  /**
   * Creates a memoized instance of PermissionManager if the user is authenticated.
   * Purpose: Prevents unnecessary re-instantiations of the PermissionManager.
   * Example: User role "admin" initializes with ['admin'] and default permissions.
   * Output: PermissionManager instance or null if unauthenticated.
   */
  const pm = useMemo(() => {
    if (!isAuthenticated) return null;

	
  /**
   * Creates a PermissionManager instance based on the user's role.
   * Example: User role "admin" initializes with ['admin'] and default permissions.
   * if user has no any direct permission in database PermissionManager
   *  will initialize with inherited permissions & roles
   */
    const roles: USER_ROLE_TYPE[] = user?.role ? [user.role] : [];
    const permissions = [""];
	return new PermissionManager({roles,permissions});


  }, [isAuthenticated, user]);

  return pm;
};
