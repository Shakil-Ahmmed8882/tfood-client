import { Link } from "react-router-dom";
import TFood from "../../assets/tflogo.svg";
import TFoodText from "../../assets/tfoodbd.svg";

export const LogoText = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`${className} flex items-center`}>
      {/* <h2 className="text-[26px] font-bold text-black">tfoodbd</h2> */}
      <img src={TFoodText} className="w-full h-[30px]" alt="TFoodbd" />
    </Link>
  );
};

export const LogoImage = () => {
  return <img src={TFood} className="size-[35px]" alt="" />;
};


export const Logo = ({className}:{className?:string}) => {
  return (
    <Link to="/" className={`flex items-center justify-start gap-1 ${className}`}>
      <LogoImage />
      <LogoText />
    </Link>
  );
};
