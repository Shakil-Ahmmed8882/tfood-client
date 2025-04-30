import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailWithToken } from "../hooks/useVerifyEmailWithToken";
import { SuccessModal } from "@/components/modal/SuccessModal";
import mail_icon from "@/assets/icons/img/mail_icon.gif";
import failed_icon from "@/assets/icons/img/fail_image.png";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const goTo = useNavigate();
  const { isLoading, isEmailVerificationSuccess, isError }  = useVerifyEmailWithToken(`${token}`);

  return (
    <div className="flex items-center justify-center h-screen bg-white">

      <div>
        <img src={mail_icon} className="w-32 h-32" />
        <p className="text-xl text-center -mt-2">
          {isLoading && "Verifying..."}
        </p>
      </div>

      <SuccessModal
        isOpen={isError}
        icon={
          <div className="pb-5">
            <img
              src={failed_icon}
              alt={"Failed icon"}
              className="rounded-full w-40 h-40 "
            />
          </div>
        }
        title="Verification failed!!"
        buttonText="Try again"
        description="Account verification failed. Please try again."
        onClose={() => goTo("/signup")}
      />
      <SuccessModal
        isOpen={isEmailVerificationSuccess}
        onClose={() => goTo("/login")}
        title="Success"
        description="Account Verified successfully"
        buttonText="Login"
      />
    </div>
  );
};

export default VerifyEmail;
