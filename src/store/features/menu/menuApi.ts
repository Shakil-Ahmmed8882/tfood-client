import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { TQueryParam, TFilterBody, ApiResponse } from "@/types/global"; // Import ApiResponse
import { TMenu } from "@/features/menu/menu.type";
import { transformApiResponse } from "@/utils/transformApiResponse";

/**
 * menuApi.ts : Defines API endpoints for fetching menu-related data using RTK Query.
 * Features:
 * - Fetches all menus with optional query parameters.
 * - Supports dynamic filtering using URLSearchParams.
 * - Caches menu data and provides automatic updates via API tags.
 */

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * getAllMenus : Fetches all menu items.
     * - Accepts optional query parameters for filtering.
     * - Uses URLSearchParams to construct dynamic queries.
     * - Returns an array of menu items wrapped in a `data` object.
     * - Provides caching and automatic updates using `API_tAGS.MENU`.
     */

    getAllMenus: builder.query({
      query: ({
        queryParams,
        filterBody,
      }: { queryParams?: TQueryParam[]; filterBody?: TFilterBody } = {}) => {
        const params = new URLSearchParams();

        /*
         * Constructs the query parameters for the GET request.
         * - Uses `URLSearchParams` to dynamically build the query string from the `args` array.
         * - Iterates over the `args` array, appending each parameter (`name` and `value`) to the query.
         * - Returns the constructed query string as part of the request.
         */
        if (queryParams) {
          queryParams.forEach(({ name, value }) => {
            params.append(name, value);
          });
        }

        if (filterBody) {
          params.append(
            "filterBody",
            encodeURIComponent(JSON.stringify(filterBody))
          );
        }
        return {
          url: "/menus",
          method: "GET",
          params,
        };
      },
      providesTags: [API_tAGS.MENU],
      transformResponse: transformApiResponse<TMenu>,
    }),

    editMenu: builder.mutation<ApiResponse<TMenu>, FormData>({
      query: (data) => ({
        url: `/menus/${data.get("id")}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_tAGS.MENU],
    }),

    deleteMenu: builder.mutation<ApiResponse<TMenu>, string>({
      query: (id) => ({
        url: `/menus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_tAGS.MENU],
    }),

    createMenu: builder.mutation<ApiResponse<TMenu>, FormData>({
      query: (data) => ({
        url: "/menus",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_tAGS.MENU],
    }),
  }),
});

export const { useGetAllMenusQuery, useEditMenuMutation, useDeleteMenuMutation, useCreateMenuMutation } = menuApi;
