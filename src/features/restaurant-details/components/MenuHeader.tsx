import { Tabs } from "@/components/custom-ui/Tabs";
import { TabSkeleton } from "@/components/skeleton/tabSkeleton";
import useMenuCategories from "@/features/menu/hooks/useMenuCategories";

/**
 * Tab: Defines the structure of a tab.
 * - `id`: Unique identifier for the tab.
 * - `label`: Display name for the tab.
 */
type Tab = { id: string; label: string };

/**
 * MenuTabHeader: Renders a tab header for menu categories.
 * - Uses `Tabs` and `Tabs.List` for layout.
 * - Dynamically maps `MENU_TABS` to `Tabs.Item`.
 */
export default function MenuTabHeader({filters = {}}) {

  /** 
   * Extract filters from the provided props and create an options object.
   * This will be used for making API requests with filtering criteria.
   * Example: If `filters` has { category: "Pizza" }, only pizzas will be fetched.
   */
  const options = { ...filters }; 

  /** 
   * Fetch menu categories based on the applied filters using a custom hook.
   * It returns `data` (list of categories) and `isLoading` (loading state).
   * Example: If `filters` = { category: "Drinks" }, it fetches only drink categories.
   */
  const { data, isLoading } = useMenuCategories({ filters: options });

  /** 
   * Transform the fetched category data into a tab format usable by the UI.
   * Each category name is mapped to an object with `id` and `label` properties.
   * Example Output: [{ id: "Pizza", label: "Pizza" }, { id: "Burgers", label: "Burgers" }]
   */
  const menu_tabs = data?.map((tab) => ({ id: tab.name, label: tab.name }));

  /** 
   * Define the menu tabs by including the "All" tab and dynamically adding fetched categories.
   * This ensures users can switch between "All" items or specific categories.
   * Example Output: [{ id: "All", label: "All" }, { id: "Pizza", label: "Pizza" }]
   */
  const MENU_TABS: Tab[] = [{ id: "All", label: "All" }, ...(menu_tabs || [])];

  /** 
   * Show a loading skeleton while fetching categories to enhance UX.
   * This prevents UI flickering and provides visual feedback.
   * Example: Before data loads, users see placeholder rounded tabs.
   */
  if (isLoading) return <TabSkeleton />;


  return (
    <Tabs>
      <Tabs.List>
        {MENU_TABS.map((tab) => (
          <Tabs.Item key={tab.id} id={tab.id}>{tab.label}</Tabs.Item>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
