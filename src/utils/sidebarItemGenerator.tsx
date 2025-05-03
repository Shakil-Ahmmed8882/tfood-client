import { TSidebarItem, TRouteDefinition } from "@/types/global";
export const sidebarItemsGenerator = (
  items: TRouteDefinition[],
  // role: string
): TSidebarItem[] => {
  const sidebarItems: TSidebarItem[] = [];
// console.log(items);
  const processItem = (item: TRouteDefinition) => {
    if (item.path && item.title) {
      sidebarItems.push({
        title: item.title,
        // url: `${role}/${item.path}`,
        url: `${item.path}`,
        icon: item.icon,
        isActive: item.index,
      });
    }

    if (item.children) {
      item.children.forEach(processItem);
    }
  };

  items.forEach(processItem);
  return sidebarItems;
};
