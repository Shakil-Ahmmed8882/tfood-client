import { EditProfile } from "@/features/profiles/components/EditProfile";
import UserProfile from "@/features/profiles/UserProfile";
import { RestaurantDetails } from "@/features/restaurant-details";
import HomePage from "@/pages/home/HomePage";
import { MenuDetailPage } from "@/pages/home/MenuDetailsPage";
import MenuPage from "@/pages/home/MenuPage";
import RestaurantPage from "@/pages/home/RestaurantPage";

export const homeRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/restaurants",
    element: <RestaurantPage />,
  },
  {
    path: "/:slug",
    element: <RestaurantDetails />,
  },
  {
    path: "/menus",
    element: <MenuPage />,
  },
  {
    path: "/menus/:id",
    element: <MenuDetailPage />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/edit-profile/:id",
    element: <EditProfile />,
  },
  ];
