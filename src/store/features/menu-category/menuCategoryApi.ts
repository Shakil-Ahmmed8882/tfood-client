import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { TQueryParam, TFilterBody, ApiResponse } from "@/types/global"; // Import ApiResponse
import { TMenu, TMenuCategory } from "@/features/menu/menu.type";
import { transformApiResponse } from "@/utils/transformApiResponse";

/**
 * menuApi.ts : Defines API endpoints for menu-related operations using RTK Query.
 * Features:
 * - Fetches all menu categories with optional filters.
 * - Supports dynamic query construction.
 * - Enables caching and automatic updates via API tags.
 */



export const menuCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    /**
     * Fetch all menu categories.
     * Purpose: Allows fetching all available menu categories with optional query filters.
     * Example: Fetching categories with pagination or sorting by name.
     * Output: Returns an array of menu categories wrapped in a `data` object.
     */
    getAllMenuCategories: builder.query({
      query: ({
        queryParams = [],
        filterBody,
      }: { queryParams?: TQueryParam[]; filterBody?: TFilterBody } = {}) => {
        const params = new URLSearchParams();

        /**
         * Construct query parameters dynamically.
         * Purpose: Enables flexible filtering and searching using key-value pairs.
         * Example: `?name=Drinks&limit=10` to fetch 10 menu items under "Drinks".
         * Output: Generates a dynamic query string for the request URL.
         */
        if (queryParams) {
          queryParams.forEach(({ name, value }) => {
            params.append(name, value);
          });
        }

        /**
         * Append filter body as a JSON string.
         * Purpose: Allows structured filtering beyond simple query parameters.
         * Example: `{ type: "vegetarian" }` to filter vegetarian items.
         * Output: Encodes JSON data into URL parameters.
         */
        if (filterBody) {
          params.append(
            "filterBody",
            encodeURIComponent(JSON.stringify(filterBody))
          );
        }

        return {
          url: "/menu-categories",
          method: "GET",
          params,
        };
      },
      providesTags: [API_tAGS.MENU_CATEGORY],
      transformResponse: transformApiResponse<TMenuCategory>,
    }),

    /**
     * Create a new menu category.
     * Purpose: Enables adding a new category dynamically with form data.
     * Example: Uploading a new "Seafood" category with an image.
     * Output: Returns the newly created menu category data.
     */
    createMenuCategory: builder.mutation<ApiResponse<TMenu>, FormData>({
      query: (data) => ({
        url: "/menu-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_tAGS.MENU_CATEGORY],
    }),


    updateMenuCategory: builder.mutation<ApiResponse<TMenu>, FormData>({
      query: (data) => ({
        url: "/menu-categories",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_tAGS.MENU_CATEGORY],
    }),
  }),
});

/**
 * Export hooks for consuming API endpoints.
 * Purpose: Allows easy data fetching and mutation in components.
 * Example: `const { data } = useGetAllMenuCategoriesQuery();`
 * Output: Provides hooks for making API requests within React components.
 */
export const { useGetAllMenuCategoriesQuery, useCreateMenuCategoryMutation, useUpdateMenuCategoryMutation } = menuCategoryApi;