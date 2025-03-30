import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import { LayoutDashboard } from "lucide-react";

export const userPaths = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "dashboard",
    element: <UserDashboard />,
  },
];
