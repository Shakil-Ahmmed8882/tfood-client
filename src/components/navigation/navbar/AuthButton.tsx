import { UserIcon } from "@/assets/icons/Icons";
// import { NavUser } from "@/components/nav-user/NavUser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout, selectCurrentUser } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type AuthButtonProps = {
  mobile?: boolean;
  closeMenu?: () => void;
};

/**
 * AuthButton: A reusable authentication button that toggles between Login and Logout.
 *
 * Props:
 * - mobile?: boolean (default: false) - Adjusts styling for mobile layout.
 * - closeMenu?: () => void - Closes the menu when the button is clicked (optional).
 *
 * Behavior:
 * - Displays "Login" if the user is not authenticated.
 * - Displays "Logout" if the user is authenticated.
 */
export const Authbutton = ({ mobile = false }: AuthButtonProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  // const token = useAppSelector(selectCurrentToken);
  // console.log(token);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };
  // const user = false;
  return (
    <>
      <Button
        variant="outline"
        className={cn("h-8", mobile && "w-full mt-4 cursor-pointer")}
        // onClick={() => mobile && closeMenu?.()}
        onClick={handleClick}
      >
        <UserIcon />
        {user ? "Logout" : "Login"}
      </Button>

      {/* {user && <NavUser />} */}
    </>
  );
};
