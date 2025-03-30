import { Tabs } from "@/components/custom-ui/Tabs";

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
export default function MenuTabHeader() {
  const MENU_TABS: Tab[] = [
    { id: "", label: "All" },
    { id: "fast-food", label: "Fast Food" },
    { id: "biryani", label: "Biryani" },
    { id: "beverage", label: "Beverage" },
    { id: "drinks", label: "Drinks" },
  ];

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
