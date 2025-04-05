import { Link } from "react-router-dom";
import { Container } from "@/components/wrapper/Container";
import { AuthLeftSide } from "@/features/auth/components/AuthLeftSide";
import { SignupForm } from "@/features/auth/components/SignUpForm";

export const SignupPage = () => {
  return (
    <div className="bg-[#f5f6fb]">
        <Container className="flex justify-center gap-x-14  flex-wrap-reverse items-center  min-h-screen ">
        {/* Left Section (Image/Illustration) */}
        
        <AuthLeftSide />
        {/* Right Section (Signup Form) */}
        <div className="w-full lg:max-w-lg p-8 bg-white my-8">
          <div className="mb-8">
            <h2 className="text-3xl font-righteous font-semibold text-center text-yellow-500">
              tfoodbd
            </h2>
            <div className="py-10">
              <p className="text-2xl text-center font-semibold mb-4 text-gray-900 mt-2">
                Create an Account{" "}
              </p>
              <p className="text-sm text-center font-semibold text-gray-500">
                Welcome back, you've been missed!
              </p>
            </div>
          </div>

          <SignupForm />
          <p className="text-center mt-4">
            Already have an account??
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
    </Container>
      </div>
  );
};

SignupPage.displayName = "SignupPage";
