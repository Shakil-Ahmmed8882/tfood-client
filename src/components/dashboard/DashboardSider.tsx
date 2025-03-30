"use client";

import * as React from "react";
import { LogOut, ShieldQuestion } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNavigation } from "./SidebarNavigation";
import TFood from "../../assets/t-food.png";
import { shopOwnerPaths } from "@/routes/shopOwnerRoutes";
import { sidebarItemsGenerator } from "@/utils/sidebarItemGenerator";
import { TSidebarItem } from "@/types/global";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { ConfirmModal } from "../custom-ui/ConfirmModal";
import { TFLogo } from "../ui/TFLogo";

type SidebarItemType = {
  navTop: TSidebarItem[];
  navBottom: TSidebarItem[];
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State to control modal visibility

  const handleConfirmLogout = useCallback(() => {
    // User confirmed the logout action
    dispatch(logout());
    navigate("/"); // Redirect to the home page or login page after logout
  }, [dispatch, navigate]);

  const sidebarItem = sidebarItemsGenerator(shopOwnerPaths);
  const { open } = useSidebar();

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
          <div className="flex items-center justify-start gap-4">
            <img src={TFood} className="size-[30px]" alt="" />
            {open && <TFLogo />}
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
