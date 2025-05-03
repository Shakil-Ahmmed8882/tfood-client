import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { TRestaurant } from "@/features/restaurants/type.restaurant";
import { ApiResponse, TFilterBody, TQueryParam } from "@/types/global";
import { transformApiResponse } from "@/utils/transformApiResponse";

/**
 * restaurantApi.ts : Defines API endpoints for fetching restaurant-related data using RTK Query.
 *
 * Features:
 * - Fetches all restaurants with optional query parameters.
 * - Retrieves a specific restaurant by its ID.
 * - Supports dynamic filtering using URLSearchParams.
 * - Caches restaurant data and provides automatic updates via API tags.
 */

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * useGetAllRestaurantsQuery : Fetches a list of restaurants with optional filters.
     * - Accepts an array of query parameters.
     * - Uses caching and automatic refetching when data changes.
     */
    getAllRestaurants: builder.query({
      query: ({
        queryParams,
        filterBody,
      }: { queryParams?: TQueryParam[]; filterBody?: TFilterBody } = {}) => {
        const params = new URLSearchParams();

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
          url: `/restaurants?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: [API_tAGS.RESTAURANT],
      transformResponse: transformApiResponse<TRestaurant>,
    }),

    /**
     * useGetRestaurantByIdQuery : Fetches details of a specific restaurant by ID.
     * - Accepts a restaurant ID as a parameter.
     * - Returns restaurant details and handles loading/error states.
     */
    getRestaurantById: builder.query<{ data: TRestaurant }, string>({
      query: (id: string) => {
        return {
          url: `/restaurants/${id}`,
          method: "GET",
        };
      },
      providesTags: [API_tAGS.RESTAURANT],
    }),

    createRestaurant: builder.mutation<{ data: TRestaurant }, FormData>({
      query: (data) => ({
        url: "/restaurants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_tAGS.RESTAURANT],
    }),
    updateRestaurant: builder.mutation<ApiResponse<TRestaurant>, FormData>({
      query: (data) => {
        return {
          url: `/restaurants/${data.get("id")}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [API_tAGS.RESTAURANT],
    }),

    deleteRestaurant: builder.mutation<{ data: TRestaurant }, string>({
      query: (id: string) => ({
        url: `/restaurants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_tAGS.RESTAURANT],
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
