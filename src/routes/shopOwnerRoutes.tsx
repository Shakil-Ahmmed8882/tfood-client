// import ShopOwnerDashboard from "@/pages/dashboard/shop-owner/ShopOwnerDashboard";
import ShopOwnerMenuPage from "@/pages/dashboard/shop-owner/ShopOwnerMenuPage";
import ShopOwnerRestaurants from "@/pages/dashboard/shop-owner/ShopOwnerRestaurants";
import { TRouteDefinition } from "@/types/global";
import {  Store, UtensilsCrossed } from "lucide-react";

export const shopOwnerPaths:TRouteDefinition[] = [
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
    element: <ShopOwnerMenuPage />,
  },
];
