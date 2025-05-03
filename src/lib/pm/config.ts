import { USER_ROLES } from "@/constants/index";

type Permission = (typeof Permissions)[keyof typeof Permissions];

// Define the possible permissions
export const Permissions = {
  //_________________ User permissions_______________
  ADMIN_DELETE: "admin:delete", 
  USER_DELETE: "user:delete",   

  //_________________ Restaurant permissions_______________
  RESTAURANT_CREATE: "restaurant:create", 
  RESTAURANT_UPDATE: "restaurant:update", 
  RESTAURANT_DELETE: "restaurant:delete", 
  RESTAURANT_READ: "restaurant:read",   

  //_________________ Menu permissions_______________
  MENU_CREATE: "menu:create", 
  MENU_UPDATE: "menu:update", 
  MENU_DELETE: "menu:delete", 
  MENU_READ: "menu:read", 
} as const;

/**
 * ================================================================
 * Role-Based Permissions Mapping
 * ================================================================
 * Maps each role to the specific permissions they have access to.
 * These permissions determine what actions the user with a given role can perform in the system.
 * 
 * - `super_admin` has permission to delete an admin.
 * - `admin` can delete users.
 * - `shop_owner` can manage restaurants and menus.
 * - `customer` can only read/view restaurants and menus.
 */
export const RoleBasedPermissions: Record<string, Permission[]> = {
  super_admin: [Permissions.ADMIN_DELETE], 
  admin: [Permissions.USER_DELETE], 
  shop_owner: [
    Permissions.RESTAURANT_CREATE,
    Permissions.RESTAURANT_UPDATE,
    Permissions.RESTAURANT_DELETE,
    Permissions.RESTAURANT_READ,
    Permissions.MENU_CREATE,
    Permissions.MENU_UPDATE,
    Permissions.MENU_DELETE,
  ], 
  customer: [Permissions.RESTAURANT_READ, Permissions.MENU_READ], 
} as const;

/**
 * ================================================================
 * Role Hierarchy
 * ================================================================
 * Defines the hierarchical structure of roles.
 * Each role has a set of parent roles that they inherit permissions from.
 * 
 * - `super_admin` inherits permissions from `admin`.
 * - `admin` inherits from `shop_owner`.
 * - `shop_owner` inherits from `customer`.
 */
export const RoleHierarchy: Record<string, string[]> = {
  super_admin: [USER_ROLES.ADMIN], 
  admin: [USER_ROLES.SHOP_OWNER], 
  shop_owner: [USER_ROLES.CUSTOMER], 
  customer: [], 
} as const;
