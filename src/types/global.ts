import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// ____________________API response _________________________

export type TMeta = {
  total: number;
  currentPage: number;
  limit: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data?:  T[] | []; // Optional because errors may not return data
  errorSources?: { path: string; message: string }[];
  stack?: string | null;
};

export type SuccessResponse<T> = Required<ApiResponse<T>>; // Forces `data` to exist

// ____________________Routes _________________________

export type TSidebarItem = {
  title: string;
  url?: string;
  icon?: LucideIcon | ReactNode | undefined;
  isActive?: boolean;
  onClick?: () => void; // Optional callback for main items
  items?: TSidebarItem[];
};

export type TRoute = {
  index?: boolean;
  path?: string;
  element: ReactNode;
};

export type TRouteDefinition = {
  title?: string;
  index?: boolean;
  path?: string;
  icon?: LucideIcon | ReactNode | undefined;
  element?: ReactNode;
  children?: TRouteDefinition[];
};

export type TQueryParam = { name: string; value: string };



// ____________________ filter types ______________
type FilterRule = {
  field: string;
  operator: string;
  value: string | number | boolean;
};

export type TFilterBody = {
  where: {
    combinator: "and" | "or";
    rules: FilterRule[];
  };
};
