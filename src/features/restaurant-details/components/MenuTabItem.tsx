import { TabsProvider, useTabs } from "@/components/custom-ui/Tabs";
import MenuTabHeader from "./MenuHeader";
import { MenuFeature } from "@/features/menu/MenuFeature";
import { TRestaurant } from "@/features/restaurants";



/**
 * MenuTabs: Manages tab-based navigation for menu categories.
 * - Wraps content in `TabsProvider` to maintain active tab state.
 * - Includes `MenuTabHeader` for tab selection.
 * - Renders `TabsContentWrapper` to display content based on the selected tab.
 */
export default function MenuTabs({restaurant}:{restaurant:TRestaurant | undefined |null}) {
    
    const filters = {restaurant: restaurant?.id}

  return (
    <div className="container py-6 space-y-6 pt-8">
      <TabsProvider defaultTab="All">
        <MenuTabHeader {...{filters}} />
        <TabsContentWrapper owner_email={`${restaurant?.ownerEmail}`}/>
      </TabsProvider>
    </div>
  );
}



/**
 * TabsContentWrapper: Displays content based on the currently active tab.
 * - Uses `useTabs` to get the `activeTab`.
 * - Passes `activeTab` as both `notFoundMessage` and `searchQuery` to `MenuFeature`.
 */
const TabsContentWrapper = ({owner_email}:{owner_email:string}) => {
  const { activeTab } = useTabs();
  const filters = {
    ...(owner_email && { creator: owner_email }),
    ...(activeTab !== "All" && { food_category: activeTab }),
  };  
  return <MenuFeature notFoundMessage={activeTab} {...(filters ? { filters } : {})} />;
};
