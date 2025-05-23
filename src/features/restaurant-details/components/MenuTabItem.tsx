import { TabsProvider, useTabs } from "@/components/custom-ui/Tabs";
import MenuTabHeader from "./MenuHeader";
import { MenuFeature } from "@/features/menu/MenuFeature";
import { TRestaurant } from "@/features/restaurants";
import { CustomPaginationProvider } from "@/components/pagination/PaginationProvider";

type commonPorps = {
  searchQuery: string;
  restaurant: TRestaurant | null | undefined;
};

/**
 * MenuTabs: Manages tab-based navigation for menu categories.
 * - Wraps content in `TabsProvider` to maintain active tab state.
 * - Includes `MenuTabHeader` for tab selection.
 * - Renders `TabsContentWrapper` to display content based on the selected tab.
 */
export default function MenuTabs({
  restaurant,
  searchQuery = "",
}: commonPorps) {
  // console.log("___________>>>>restaurant<<<<", restaurant);
  const filters = { restaurant: restaurant?.id };

  return (
    <div className="container py-6 space-y-6 pt-8">
      <TabsProvider defaultTab="All">
        <MenuTabHeader {...{ filters }} />
        <TabsContentWrapper searchQuery={searchQuery} restaurant={restaurant} />
      </TabsProvider>
    </div>
  );
}

/**
 * TabsContentWrapper: Displays content based on the currently active tab.
 * - Uses `useTabs` to get the `activeTab`.
 * - Passes `activeTab` as both `notFoundMessage` and `searchQuery` to `MenuFeature`.
 */
const TabsContentWrapper = ({ restaurant, searchQuery }: commonPorps) => {
  const { activeTab } = useTabs();
  const filters = {
    ...(restaurant?.id && { restaurant: restaurant.id }),
    ...(activeTab !== "All" && { food_category: activeTab }),
  };
  return (
    <CustomPaginationProvider>
      <MenuFeature
        searchQuery={searchQuery}
        notFoundMessage={activeTab}
        {...(filters ? { filters } : {})}
        shouldPaginate={true}
        showLimit={false}
      />
    </CustomPaginationProvider>
  );
};
