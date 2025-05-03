import { AdminUsersPage } from "@/features/users/AdminUsersPage";
import { AdminMenuPage } from "@/pages/dashboard/admin/AdminMenuPage";
import { AdminRestaurantPage } from "@/pages/dashboard/admin/AdminRestaurantPage";
import AnalyticsPage from "@/pages/dashboard/admin/AnalyticsPage";
import { TRouteDefinition} from "@/types/global";
import { LayoutDashboard, Store, User, UtensilsCrossed } from "lucide-react";

export const adminPaths:TRouteDefinition[] = [
  {
    title: "Dashboard",
    path: "dashboard",
    element: <AnalyticsPage />,
    icon: LayoutDashboard,
  },
  {
    title: "Restaurants",
    path: "restaurants",
    element: <AdminRestaurantPage />,
    icon: Store,
  },
  {
    title: "Menu",
    path: "menu",
    element: <AdminMenuPage />,
    icon: UtensilsCrossed,
  },
  {
    title: "Users",
    path: "users",
    element: <AdminUsersPage />,
    icon: User,
  },
];
