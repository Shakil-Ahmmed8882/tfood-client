import { AdminUsersPage } from "@/features/users/AdminUsersPage";
import { AdminMenuPage } from "@/pages/dashboard/admin/AdminMenuPage";
import { AdminRestaurantPage } from "@/pages/dashboard/admin/AdminRestaurantPage";
import AnalyticsPage from "@/pages/dashboard/admin/AnalyticsPage";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AnalyticsPage />,
    icon: "LayoutDashboard",
  },
  {
    name: "Dashboard",
    path: "restaurants",
    element: <AdminRestaurantPage />,
    icon: "LayoutDashboard",
  },
  {
    name: "Dashboard",
    path: "menu",
    element: <AdminMenuPage />,
    icon: "LayoutDashboard",
  },
  {
    name: "Dashboard",
    path: "users",
    element: <AdminUsersPage />,
    icon: "LayoutDashboard",
  },
];
