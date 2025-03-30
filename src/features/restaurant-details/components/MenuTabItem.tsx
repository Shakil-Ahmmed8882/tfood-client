import { TabsProvider, useTabs } from "@/components/custom-ui/Tabs";
import MenuTabHeader from "./MenuHeader";
import { MenuFeature } from "@/features/menu/MenuFeature";

/**
 * MenuTabs: Manages tab-based navigation for menu categories.
 * - Wraps content in `TabsProvider` to maintain active tab state.
 * - Includes `MenuTabHeader` for tab selection.
 * - Renders `TabsContentWrapper` to display content based on the selected tab.
 */
export default function MenuTabs() {
  return (
    <div className="container py-6 space-y-6 pt-8">
      <TabsProvider defaultTab="">
        <MenuTabHeader />
        <TabsContentWrapper />
      </TabsProvider>
    </div>
  );
}

/**
 * TabsContentWrapper: Displays content based on the currently active tab.
 * - Uses `useTabs` to get the `activeTab`.
 * - Passes `activeTab` as both `notFoundMessage` and `searchQuery` to `MenuFeature`.
 */
const TabsContentWrapper = () => {
  const { activeTab } = useTabs();
  return <MenuFeature notFoundMessage={activeTab} searchQuery={activeTab} />;
};
