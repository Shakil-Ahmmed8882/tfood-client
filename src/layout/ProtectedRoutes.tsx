import {
  logout,
  selectCurrentToken,
  TUser,
} from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setIsAllowed(false);
      return;
    }

    const user = verifyToken(token) as TUser;

    if (role !== undefined && user?.role !== role) {
      dispatch(logout());
      setIsAllowed(false);
      return;
    }

    setIsAllowed(true);
  }, [token, role, dispatch]);

  if (isAllowed === null) return null; // or a loader/spinner
  if (!isAllowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
