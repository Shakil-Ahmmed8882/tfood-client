import { Link } from "react-router-dom";
import { Container } from "@/components/wrapper/Container";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { AuthLeftSide } from "@/features/auth/components/AuthLeftSide";
export const ForgotPasswordPage = () => {
  return (
    <Container>
      <div className="flex justify-between flex-wrap-reverse items-center gap-5 h-screen ">
        {/* Left Section (Image/Illustration) */}
        <AuthLeftSide/>

        {/* Right Section (Login Form) */}
        <div className="w-full lg:max-w-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-righteous font-semibold text-center text-yellow-500">
              tfoodbd
            </h2>
          </div>
          <div className="">
            <p className="text-2xl text-center font-semibold mb-4 text-gray-900 mt-2">
              Forgot Password
            </p>
          </div>
          <ForgotPasswordForm />
          <p className="text-center mt-4">
            Back to the login page?
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};
ForgotPasswordPage.displayName = "ForgotPasswordPage";
