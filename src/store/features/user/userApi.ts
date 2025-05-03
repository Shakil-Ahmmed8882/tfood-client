import { API_tAGS } from "@/store/api";
import { baseApi } from "@/store/api/baseApi";
import { TFilterBody, TQueryParam } from "@/types/global";
import { TUser } from "@/types/user.type";
// import { transformApiResponse } from "@/utils/transformApiResponse";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query({
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
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: [API_tAGS.MENU],
      // transformResponse: transformApiResponse<TUser[]>,
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      providesTags: [API_tAGS.USER],
    }),

    updateUser: builder.mutation<TUser, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [API_tAGS.USER],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_tAGS.USER],
    }),
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;
