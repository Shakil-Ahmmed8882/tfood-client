import DashboardContainer from "@/components/dashboard/DashboardContainer";

import { Button } from "@/components/ui/button";
import { MenuCategoryModalForm } from "@/features/menu/components/MenuCategoryModalForm";
import { MenuModalForm } from "@/features/menu/components/MenuModalForm";
import { useMenuModal } from "@/features/menu/hooks/useMenuModal";
import { ShopOwnerMenusList } from "@/features/menu/shopOwnerMenusList";
import { useState } from "react";
import { useRestaurantOptions } from "@/features/menu/hooks/useRestaurantOptions";
import ReusableSelect from "@/components/custom-ui/ReusableSelect";
import { CustomPaginationProvider } from "@/components/pagination/PaginationProvider";


export const ShopOwnerMenuPageWrapper = () => {
  return (
    <CustomPaginationProvider>
      <ShopOwnerMenuPage />
    </CustomPaginationProvider>
  );
};



const ShopOwnerMenuPage = () => {
  /**
   * Handles the state for opening and closing the menu modal.
   * Example use case: A shop owner clicks the "Add Menu" button, triggering the modal to open.
   * Expected output: `isModalOpen` becomes `true`, showing the form for adding a menu item.
   */
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const { isModalOpen, setIsModalOpen } = useMenuModal();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { restaurantOptions } = useRestaurantOptions();

  return (
    <>
      <DashboardContainer>
        {/**
         * Header section with title and action button.
         * Example use case: Displays "Menus" and allows the owner to add a new menu item.
         * Expected output: Clicking "+ Add Menu" sets `isModalOpen` to `true`, opening the modal.
         */}
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex justify-between items-center space-x-2 gap-2">
            <h1 className="text-2xl font-semibold">Menus</h1>
            <ReusableSelect
              options={restaurantOptions}
              onValueChange={setSelectedRestaurantId}
              placeholder="Select a Restaurant"
              label="Select a Restaurant"
            />
          </div>
          <div className="space-x-2">
            <Button onClick={() => setIsCategoryModalOpen(true)}>
              + Add Category
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>+ Add Menu</Button>
          </div>
        </div>

        {/**
         * Displays the list of existing menus owned by the shop owner.
         * Example use case: Fetches and shows a list of menu items when the page loads.
         * Expected output: A grid/list of menus, each with options to edit or delete.
         */}
        <div className="mb-6">
            <ShopOwnerMenusList restaurantId={selectedRestaurantId} />
        </div>

        {/**
         * Modal form for adding or editing a menu item.
         * Example use case: Shop owner clicks "Add Menu", fills in details, and submits.
         * Expected output: The new menu item appears in the list after submission.
         */}
        <MenuModalForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <MenuCategoryModalForm
          isModalOpen={isCategoryModalOpen}
          setIsModalOpen={setIsCategoryModalOpen}
        />
      </DashboardContainer>
    </>
  );
};


