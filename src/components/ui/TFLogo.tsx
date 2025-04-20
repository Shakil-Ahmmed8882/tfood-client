import { Link } from "react-router-dom";
import TFood from "../../assets/t-food.png";

export const LogoText = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`${className} flex items-center`}>
      <h2 className="text-[26px] font-bold text-black">tfoodbd</h2>
    </Link>
  );
};

export const LogoImage = () => {
  return <img src={TFood} className="size-[30px]" alt="" />;
};


export const Logo = ({className}:{className?:string}) => {
  return (
    <div className={`flex items-center justify-start gap-1 ${className}`}>
      <LogoImage />
      <LogoText />
    </div>
  );
};
