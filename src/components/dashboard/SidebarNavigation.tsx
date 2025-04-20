import { ChevronRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { TSidebarItem } from "@/types/global";
import { Link } from "react-router-dom";

export function SidebarNavigation({
  items,
  label,
}: {
  items: TSidebarItem[];
  label?: string;
}) {
  
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={item.onClick}
                    isActive={item.isActive}
                  >
                    {renderIcon(item.icon)}
                    <span>{item.title}</span>

                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
                          {subItem.url && (
                            <Link to={subItem?.url} onClick={subItem.onClick}>
                              {renderIcon(subItem.icon)}
                              <span>{subItem.title}</span>
                            </Link>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                
                tooltip={item.title}
                onClick={item.onClick}
              >
                {item.url ? (
                  <Link to={item.url}>
                    {renderIcon(item.icon)}
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div>
                    {renderIcon(item.icon)}
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Helper function to render icon
const renderIcon = (icon: LucideIcon | ReactNode | undefined) => {
  if (!icon) return null;

  // Check if it's a component (like a LucideIcon)
  if (
    typeof icon === "function" ||
    (icon && typeof icon === "object" && "$$typeof" in icon)
  ) {
    const IconComponent = icon as React.ComponentType;
    return <IconComponent />;
  }

  // Otherwise, render it as a ReactNode
  return icon;
};
