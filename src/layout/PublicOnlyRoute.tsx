import { selectCurrentToken } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TPublicOnlyRoute = {
  children: ReactNode;
};

const PublicOnlyRoute = ({ children }: TPublicOnlyRoute) => {
  const token = useAppSelector(selectCurrentToken);

  // If the user is already logged in, redirect them away from login/signup pages
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
