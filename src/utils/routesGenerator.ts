import { TRoute, TRouteDefinition } from "@/types/global";

export const routeGenerator = (routesConfig: TRouteDefinition[]): TRoute[] => {
  const flatRoutes: TRoute[] = [];

  const processRoute = (route: TRouteDefinition) => {
    if (route.index) {
      flatRoutes.push({ index: route.index, element: route.element });
    } else if (route.path && route.element) {
      flatRoutes.push({ path: route.path, element: route.element });
    }

    if (route.children) {
      route.children.forEach((route)=>processRoute(route));
    }
  };

  routesConfig.forEach((route)=>processRoute(route));
  return flatRoutes;
};

// export type TRoute = {
//   index?: boolean;
//   path: string;
//   element: ReactNode;
// };

// export type TRouteDefinition = {
//   name?: string;
//   path?: string;
//   element?: ReactNode;
//   children?: TRouteDefinition[];
// };
