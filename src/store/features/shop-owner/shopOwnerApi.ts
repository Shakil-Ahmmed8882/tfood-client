import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { transformApiResponse } from "@/utils/transformApiResponse";
import { TRestaurant } from "@/features/restaurants";
import { ApiResponse } from "@/types/global";

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
  }),
});

export const { useGetShopOwnerRestaurantsQuery } = shopOwnerApi;
