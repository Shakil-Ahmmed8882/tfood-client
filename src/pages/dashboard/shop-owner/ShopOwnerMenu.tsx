import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { Button } from "@/components/ui/button";
import { MenuModalForm } from "@/features/menu/components/MenuModalForm";
import { useMenuModal } from "@/features/menu/hooks/useMenuModal";
import { MenuFeature } from "@/features/menu/MenuFeature";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

const ShopOwnerMenu = () => {
  const {isModalOpen,setIsModalOpen} = useMenuModal()
  const [searchQuery] = useState<string>("");
  const debouncedSearchValue = useDebounce<string>(searchQuery, 300);

  return (
    <DashboardContainer>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Menus</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Menu</Button>
      </div>
      <div className="mb-6">
        <MenuFeature searchQuery={debouncedSearchValue} shouldPaginate={true} />
      </div>
      <MenuModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </DashboardContainer>
  );
};
export default ShopOwnerMenu;
