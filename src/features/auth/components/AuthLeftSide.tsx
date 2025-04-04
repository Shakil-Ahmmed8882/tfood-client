// const AuthLeftSide = ({ imageSrc, altText }: { imageSrc: string; altText: string }) => {
//   return (
//     <div className="bg-gradient-to-br from-#F7C9B5 via-#C7D0F5 to-#C7D0F5 p-8 hidden lg:block">
//       <div className="flex items-center justify-center lg:size-[400px]">
//         <img
//           src={imageSrc}
//           alt={altText}
//           className="max-w-full max-h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default AuthLeftSide;

import { useLocation } from "react-router-dom";
import tfLogin from "../assets/tflogin.png";
import forgotPassword from "../assets/forgot_password.png";

export const AuthLeftSide = () => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "") || "default";

  // Define image mappings
  const imageMap: Record<string, { src: string; alt: string }> = {
    login: { src: tfLogin, alt: "Login illustration" },
    signup: { src: tfLogin, alt: "Signup illustration" },
    forgotPassword: { src: forgotPassword, alt: "Forgot Password illustration" },
    resetPassword: { src: forgotPassword, alt: "Reset Password illustration" },
    default: { src: tfLogin, alt: "Authentication illustration" },
  };

  const { src, alt } = imageMap[currentPage] ?? imageMap.default;

  return (
    <div className=" p-8 hidden lg:block ">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full mx-auto lg:size-[400px]"
      />
    </div>
  );
};
