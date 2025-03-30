import { Link } from "react-router-dom";

export const TFLogo = ({className = ''}: {className?:string}) => {
  return (
    <Link to="/" className={`${className} flex items-center`}>
      <h2 className="text-[26px] font-bold text-yellow-500">Tfood</h2>
    </Link>
  );
};
