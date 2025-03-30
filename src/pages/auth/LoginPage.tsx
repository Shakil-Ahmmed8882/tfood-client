import { Link } from "react-router-dom";
import { Container } from "@/components/wrapper/Container";
import LoginForm from "@/features/auth/components/LoginForm";
import { AuthLeftSide } from "@/features/auth/components/AuthLeftSide";
import { TFLogo } from "@/components/ui/TFLogo";


export const LoginPage = () => {
  return (
    <Container>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        {/* Left Section (Image/Illustration) */}
        <AuthLeftSide/>
        {/* Right Section (Login Form) */}
        <div className="w-full lg:max-w-lg lg:p-8">
          <div className="mb-8">
            <TFLogo className="justify-center"/>
            <div className="py-5">
              <p className="text-2xl text-center font-semibold mb-4 text-gray-900 mt-2">
                Sign in
              </p>
              <p className="text-sm text-center font-semibold text-gray-500">
                Welcome back, you've been missed!
              </p>
            </div>
          </div>

          <LoginForm />
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};
LoginPage.displayName = 'LoginPage';