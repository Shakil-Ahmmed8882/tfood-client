export const API_tAGS = {
  USER: "User",
  MENU: "Menu",
  RESTAURANT: "Restaurant",
} as const;

export type ApiTagType = (typeof API_tAGS)[keyof typeof API_tAGS];
