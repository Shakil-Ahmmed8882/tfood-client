import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import { routeGenerator } from "@/utils/routesGenerator";
import { shopOwnerPaths } from "./shopOwnerRoutes";
import ProtectedRoute from "@/layout/ProtectedRoutes";
import { homeRoutes } from "./homeRoutes";
import { adminPaths } from "./adminRoutes";
import { userPaths } from "./userRoutes";
import { authPaths } from "./authRoutes";
import { USER_ROLES } from "@/constants";
import NotFound from "@/pages/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(homeRoutes),
    errorElement:<NotFound/>
  },

  {
    path: USER_ROLES.ADMIN,
    element: (
      <ProtectedRoute role={USER_ROLES.ADMIN}>
        <DashboardLayout />,
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
    errorElement:<NotFound/>
  },
  {
    path: USER_ROLES.SHOP_OWNER,
    element: (
      <ProtectedRoute role={USER_ROLES.SHOP_OWNER}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(shopOwnerPaths),
    errorElement:<NotFound/>
  },
  {
    path: USER_ROLES.CUSTOMER,
    element: (
      <ProtectedRoute role={USER_ROLES.CUSTOMER}>
        <DashboardLayout />,
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
    errorElement:<NotFound/>
  },
  ...routeGenerator(authPaths),
]);
