"use client";

import * as React from "react";
import { LogOut, ShieldQuestion} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNavigation } from "./SidebarNavigation";
import { shopOwnerPaths } from "@/routes/shopOwnerRoutes";
import { sidebarItemsGenerator } from "@/utils/sidebarItemGenerator";
import { TSidebarItem } from "@/types/global";
import { useDispatch } from "react-redux";
import { logout, selectCurrentUser } from "@/store/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { ConfirmModal } from "../custom-ui/ConfirmModal";
import { LogoImage, LogoText } from "../ui/TFLogo";
import { USER_ROLES } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { adminPaths } from "@/routes/adminRoutes";

type SidebarItemType = {
  navTop: TSidebarItem[];
  navBottom: TSidebarItem[];
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State to control modal visibility

  const handleConfirmLogout = useCallback(() => {
    // User confirmed the logout action
    dispatch(logout());
    navigate("/"); //
  }, [dispatch, navigate]);
  let sidebarItem: TSidebarItem[] = [];

  switch (user?.role) {
    case USER_ROLES.ADMIN:
      sidebarItem = sidebarItemsGenerator(adminPaths);
      break;
    case USER_ROLES.SHOP_OWNER:
      sidebarItem = sidebarItemsGenerator(shopOwnerPaths);
      break;
    default:
      break;
  }

  const { open } = useSidebar();
  if (!sidebarItem) return null;
  const navItems: SidebarItemType = {
    navTop: sidebarItem,
    navBottom: [
      {
        title: "Help",
        url: "/help",
        icon: ShieldQuestion,
      },
      {
        title: "Logout",
        // url: "/logout",
        icon: LogOut,
        onClick: () => setIsConfirmModalOpen(true),
      },
    ],
  };

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center justify-start gap-1">
            <div  className="flex items-center gap-1">
              <LogoImage />
              {open && <LogoText />}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavigation items={navItems.navTop} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarNavigation items={navItems.navBottom} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Confirm Modal for Logout */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={handleConfirmLogout} // Logout logic
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Yes, logout"
        cancelText="No, cancel"
      />
    </>
  );
}
