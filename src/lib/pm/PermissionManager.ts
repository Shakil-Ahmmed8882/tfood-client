import { RoleBasedPermissions, RoleHierarchy } from './config';

interface PermissionContext {
  roles: string[];
  permissions: string[];
}


/**
 * The `PermissionManager` class is responsible for managing role-based access control (RBAC).  
 * It provides efficient permission validation for users based on their assigned roles and direct permissions.
 *
 * ## Purpose:
 * - **Role Hierarchy Handling**: Determines inherited roles and caches the hierarchy for quick lookups.  
 * - **Permission Management**: Computes and stores permissions assigned to roles, including inherited ones.  
 * - **Access Control Methods**: Offers various functions to check if a user has a role, specific permissions,  
 *   or a combination of permissions.  
 * - **Optimized Performance**: Uses caching mechanisms to avoid redundant computations.  
 *
 * This class enables fine-grained access control by allowing permissions to be assigned both directly  
 * to users and through hierarchical role assignments.
 */



export class PermissionManager {
  
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor(private readonly context: PermissionContext) {
    /**
     * Initialize role hierarchies and permissions.
     * - The role hierarchy is computed and cached for efficient access.
     * - Role-based permissions are calculated and cached for quick lookup.
     */
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });

    Object.keys(RoleBasedPermissions).forEach((role) => {
      this.cachedRolePermissions.set(role, this.computeRolePermissions(role));
    });
  }

  /**
   * Checks if the user has the required permission.
   * - If the permission exists in the user's granted permissions, returns true.
   * - If not, checks if the user has permission through their roles.
   */
  hasPermission(requiredPermission: string) {
    if (this.context.permissions.includes(requiredPermission)) {
      return true;
    }

    return this.hasPermissionThroughRole(
      this.context.roles,
      requiredPermission
    );
  }

  /**
   * Checks if the user has all the required permissions.
   * - Iterates over all required permissions and ensures each is granted either directly or through roles.
   */
  hasPermissions(requiredPermissions: string[]) {
    return requiredPermissions.every((permission) =>
      this.hasPermission(permission)
    );
  }

  /**
   * Checks if the user has at least one of the required permissions.
   * - If any one of the required permissions is granted, returns true.
   */
  hasAnyPermission(requiredPermissions: string[]) {
    return requiredPermissions.some((permission) =>
      this.hasPermission(permission)
    );
  }

  /**
   * Checks if the user has the required role.
   * - The user's roles are checked against the required role, considering hierarchy.
   * - If the user has the role or a higher-level role, returns true.
   */
  hasRole(requiredRole: string) {
    return this.context.roles.some((role) => {
      const hierarchySet = this.cachedRoleHierarchy.get(role);
      return hierarchySet?.has(requiredRole) || role === requiredRole;
    });
  }

  /**
   * Returns the highest role among the user's roles.
   * - Iterates over the user's roles and compares them based on the hierarchy.
   */
  getMaxRole() {
    return this.context.roles.reduce((maxRole, currentRole) => {
      return this.cachedRoleHierarchy.get(maxRole)?.has(currentRole)
        ? maxRole
        : currentRole;
    }, this.context.roles[0]);
  }

  // Private Methods

  /**
   * Computes the hierarchy of a given role.
   * - Recursively determines all the inherited roles in the hierarchy.
   * - Uses a visited set to prevent circular references and unnecessary recalculations.
   */
  private computeRoleHierarchy(role: string, visited: Set<string> = new Set()) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    const inheritedRoles = RoleHierarchy[role] || [];
    inheritedRoles.forEach((inheritedRole) => { 
      result.add(inheritedRole);

      const inheritedHierarchy = this.computeRoleHierarchy(
        inheritedRole,
        visited
      );
      inheritedHierarchy.forEach((r) => result.add(r));
    });

    return result;
  }

  /**
   * Computes the permissions associated with a given role.
   * - Recursively adds permissions for the role and its inherited roles.
   * - Prevents circular recalculations using the visited set.
   */
  private computeRolePermissions(
    role: string,
    visited: Set<string> = new Set()
  ) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    RoleBasedPermissions[role].forEach((permission) => result.add(permission));

    const hierarchySet = this.cachedRoleHierarchy.get(role);
    hierarchySet?.forEach((inheritedRole) => {
      RoleBasedPermissions[inheritedRole]?.forEach((permission) =>
        result.add(permission)
      );
    });

    return result;
  }

  /**
   * Checks if the user has the required permission through their roles.
   * - If the user has any of the required permissions from their roles, returns true.
   */
  private hasPermissionThroughRole(roles: string[], permission: string) {
    return roles.some((role) => 
      this.cachedRolePermissions.get(role)?.has(permission)
    );
  }
}

