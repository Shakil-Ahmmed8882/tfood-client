export const fallbackUserAvatar = "https://shorturl.at/w0R8S";
export const fallbackRestaurant =
  "httpshttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp119JR5msZJnaV81GeJ7ZmnUfFHtPDDIk7w&s";
export const fallbackMenu =
  "https://www.shutterstock.com/image-photo/healthy-vegan-lunch-bowl-avocado-260nw-2291091665.jpg";

export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  CUSTOMER: "customer",
  SHOP_OWNER: "shop_owner",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;

export type USER_ROLE_TYPE = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type USER_STATUS_TYPE = (typeof USER_STATUS)[keyof typeof USER_STATUS];

/**
 * fallbackUrl:
 * - A default image URL used as a fallback when no image is available.
 * - Ensures a consistent visual experience in case of missing images.
 */

export const menufallbackUrl: string = "https://res.cloudinary.com/ddghbth9g/image/upload/v1747130677/WhatsApp_Image_2025-05-07_at_16.12.47_19d5282d_uts35q.jpg";
