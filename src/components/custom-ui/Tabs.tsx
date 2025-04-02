import { createContext, useContext, useState, ReactNode } from "react";

/** 
 * TabsContextType: Defines tab state and updater function.
 */
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

/** 
 * TabsContext: Manages the active tab state globally.
 */
const TabsContext = createContext<TabsContextType | undefined>(undefined);

/** 
 * TabsProvider: Provides tab state to all child components.
 * - Maintains `activeTab` using `useState`.
 * - Allows nested components to update the active tab.
 */
export function TabsProvider({
  children,
  defaultTab,
}: {
  children: ReactNode;
  defaultTab?: string;
}) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

/** 
 * useTabs: Access the active tab and updater function.
 * - Ensures usage inside `TabsProvider`, else throws an error.
 */
export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used within a TabsProvider");
  return context;
}

/** 
 * Tabs: Wrapper for the entire tab system.
 */
const Tabs = ({ children }: { children: ReactNode }) => <div>{children}</div>;

/**
 * 
 *  
 * TabsList: Container for tab buttons.
 * - Uses flexbox for horizontal alignment.
 * 
 */
const TabsList = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap gap-2 border-b pb-2">{children}</div>
);

/** 
 * TabsItem: Individual tab button.
 * - Updates `activeTab` when clicked.
 * - Highlights the active tab.
 */
const TabsItem = ({ id, children }: { id: string; children: ReactNode }) => {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-3 py-2 text-sm md:text-md md:px-4 md:py-2 rounded-md cursor-pointer ${
        activeTab === id ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

/** 
 * TabsContent: Displays content for the active tab.
 * - Renders only if `id` matches `activeTab`.
 */
const TabsContent = ({ id, children }: { id: string; children: ReactNode }) => {
  const { activeTab } = useTabs();
  return activeTab === id ? <div className="p-4">{children}</div> : null;
};

/** 
 * Extends `Tabs` component with sub-components.
 */
Tabs.List = TabsList;
Tabs.Item = TabsItem;
Tabs.Content = TabsContent;

export { Tabs };
