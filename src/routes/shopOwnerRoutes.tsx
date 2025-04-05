// import ShopOwnerDashboard from "@/pages/dashboard/shop-owner/ShopOwnerDashboard";
import ShopOwnerMenu from "@/pages/dashboard/shop-owner/ShopOwnerMenu";
import ShopOwnerRestaurants from "@/pages/dashboard/shop-owner/ShopOwnerRestaurants";
import {  Store, UtensilsCrossed } from "lucide-react";

export const shopOwnerPaths = [
  // {
  //   title: "Dashboard",
  //   icon: LayoutDashboard,
  //   path: "dashboard",

  //   element: <ShopOwnerDashboard />,
  // },
  {
    title: "Restaurants",
    icon: Store,
    path: "restaurants",
    element: <ShopOwnerRestaurants />,
  },
  {
    title: "Menu",
    icon: UtensilsCrossed,
    path: "menu",
    element: <ShopOwnerMenu />,
  },
];
