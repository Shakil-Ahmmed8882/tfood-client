import { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { useGetUserQuery } from "@/store/features/user/userApi";
import { TUser } from "@/types/user.type";
import { LoadingSkeleton } from "./NavUserSkeleton";
import { NavUserError } from "./NavUserError";
import { ConfirmModal } from "../custom-ui/ConfirmModal";
// MenuItem type definition
type MenuItem = {
  icon: React.ElementType;
  label: string;
  separatorAfter?: boolean;
  onClick?: () => void;
};

// UserInfo Component
const UserInfo = ({ user }: { user: TUser }) => (
  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer">
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={user?.profile_photo} alt={user?.name} />
      <AvatarFallback className="rounded-lg" />
    </Avatar>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold pb-1">{user?.name}</span>
      <span className="truncate text-xs text-gray-500">{user?.email}</span>
    </div>
  </div>
);

// Error Component

// Content Component
const NavUserContent = ({
  user,
  menuItems,
}: {
  user: TUser;
  menuItems: MenuItem[];
}) => (
  <DropdownMenuContent
    className="w-[--radix-dropdown-menu-trigger-width] min-w-52 py-4  rounded-lg"
    align="end"
    sideOffset={4}
  >
    <DropdownMenuLabel className="p-0 font-normal">
      <UserInfo user={user} />
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      {menuItems.map((item) => (
        <div key={item.label}>
          <DropdownMenuItem className="py-2 px-3 cursor-pointer" onClick={item.onClick}>
            <item.icon className="mr-2" />
            {item.label}
          </DropdownMenuItem>
          {item.separatorAfter && <DropdownMenuSeparator />}
        </div>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
);

export function NavUser() {
  const [isConfirmMolalOpen, setIsConfirmModalOpen] = useState(false);

  const {data: userData,isLoading,error,refetch,} = useGetUserQuery(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = userData?.data;
  
  const handleLogout = async() => {
    setIsConfirmModalOpen(true);
    dispatch(logout());
    navigate("/");
  }
useEffect(() => {
  refetch();
},[refetch]);
  const menuItems: MenuItem[] = useMemo(
    () => [
      { icon: LogOut, label: "Log out", onClick: () => setIsConfirmModalOpen(true) },
    ],
    [setIsConfirmModalOpen]
  );
  // console.log(userData);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <NavUserError refetch={refetch} />
        ) : (
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
            <UserInfo user={user} />
            <ChevronDown className="ml-auto size-4" />
          </div>
        )}
      </DropdownMenuTrigger>
      {!isLoading && !error && (
        <NavUserContent user={user} menuItems={menuItems} />
      )}
      <ConfirmModal
        isOpen={isConfirmMolalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={handleLogout}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Yes, logout"
        cancelText="No, cancel"
      />
    </DropdownMenu>
  );
}
