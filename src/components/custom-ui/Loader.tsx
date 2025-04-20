import { cn } from "@/lib/utils";
import logImg from "../../assets/tflogo.svg";
import logText from "../../assets/tfoodbd.svg";
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Loader = ({ className }: ISVGProps) => {
  return (
    <div className="flex items-center justify-center w-full h-screen  bg-white">
      <img src={logImg} className={cn("animate-pulse", className)} alt="" />
      <img src={logText} className={cn("animate-pulse", className)} alt="" />
    </div>
  );
};
