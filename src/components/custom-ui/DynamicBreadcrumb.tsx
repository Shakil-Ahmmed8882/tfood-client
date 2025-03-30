import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { useLocation } from "react-router-dom";
  
  // Define props interface for customization (optional)
  interface DynamicBreadcrumbProps {
    routeNames?: Record<string, string>; // Map of route segments to custom display names
  }
  
  export function DynamicBreadcrumb({ routeNames = {} }: DynamicBreadcrumbProps = {}) {
    const location = useLocation();
  
    // Split the pathname into an array of segments, filtering out empty strings
    const pathSegments: string[] = location.pathname.split("/").filter((segment) => segment);
  
    // Function to capitalize the first letter of each segment
    const capitalize = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            // Construct the URL for each breadcrumb link
            const href: string = `abc/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast: boolean = index === pathSegments.length - 1;
            const displayName: string = routeNames[segment] || capitalize(segment);
  // console.log(displayName);
            return (
              <div key={href} className="flex items-center">
                <BreadcrumbItem className="hidden md:block">
                  {isLast ? (
                    // Last item is a BreadcrumbPage (non-clickable)
                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                  ) : (
                    // Previous items are clickable links
                    <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
  DynamicBreadcrumb.displayName = "DynamicBreadcrumb";