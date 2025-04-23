import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { transformApiResponse } from "@/utils/transformApiResponse";
import { TRestaurant } from "@/features/restaurants";
import { ApiResponse, TFilterBody, TQueryParam } from "@/types/global";
import { TUser } from "../auth/authSlice";

export const shopOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopOwnerRestaurants: builder.query<ApiResponse<TRestaurant>, string>({
      query: (id) => ({
        url: "/shop-owners/restaurants/" + id,
        method: "GET",
      }),
      providesTags: [API_tAGS.RESTAURANT],
      transformErrorResponse: transformApiResponse<TRestaurant>,
    }),

    getAllShopOwners:builder.query({
      
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
          url: "/shop-owners",
          method: "GET",
          params,
        };
      },
      providesTags: [API_tAGS.MENU],
    })
  }),
});

export const {useGetAllShopOwnersQuery, useGetShopOwnerRestaurantsQuery } = shopOwnerApi;
