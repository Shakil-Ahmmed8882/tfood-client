import EmailSuccess from "@/features/auth/components/EmailSuccess";
import VerifyEmail from "@/features/auth/components/VerifyEmail";
import PublicOnlyRoute from "@/layout/PublicOnlyRoute";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { SignupPage } from "@/pages/auth/SignupPage";

export const authPaths = [
  {
    path: "login",
    element: 
    <PublicOnlyRoute>
      
      <LoginPage></LoginPage>,
    </PublicOnlyRoute>,
  },
  {
    path: "signup",
    element: (
      <PublicOnlyRoute>
        <SignupPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <PublicOnlyRoute>
        <ForgotPasswordPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "email-success",
    element: 
    <PublicOnlyRoute>
      <EmailSuccess />,
    </PublicOnlyRoute>,
  },
  {
    path: "reset-password",
    element: (
      <PublicOnlyRoute>
        <ResetPasswordPage />,
      </PublicOnlyRoute>
    ),
  },
  {
    path: "verify-email",
    element: (
      <PublicOnlyRoute>
        <VerifyEmail />,
      </PublicOnlyRoute>
    ),
  },
];
