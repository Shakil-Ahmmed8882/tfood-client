import { API_tAGS } from "@/store/api";
import { baseApi } from "../../api/baseApi";
import { TQueryParam, TFilterBody } from "@/types/global"; // Import necessary types
import { TMetaData } from "@/pages/dashboard/admin/AnalyticsPage";
// import { TMetaData } from "@/pages/dashboard/admin/AnalyticsPage";

/**
 * analyticsApi.ts : Defines API endpoints for fetching analytics data using RTK Query.
 *
 * Features:
 * - Fetches analytics data with optional query parameters and filters.
 * - Dynamically constructs query parameters using `URLSearchParams`.
 * - Caches analytics data and automatically updates via API tags.
 */

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * getAnalytics : Fetches analytics data.
     *
     * - Accepts optional query parameters (`queryParams`) for filtering.
     * - Supports advanced filtering using a `filterBody` object.
     * - Dynamically builds query strings for flexibility.
     * - Uses `API_tAGS.MENU` for caching and automatic refetching.
     * - Transforms API response before returning data.
     */
    getAnalytics: builder.query({
      query: ({
        queryParams,
        filterBody,
      }: { queryParams?: TQueryParam[]; filterBody?: TFilterBody } = {}) => {
        const params = new URLSearchParams();

        /**
         * Constructs query parameters for the request:
         * - Iterates over `queryParams` array, appending each `name` and `value` pair.
         * - Converts `filterBody` to a JSON string and encodes it.
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
          url: "/analytics",
          method: "GET",
          params,
        };
      },
      providesTags: [API_tAGS.MENU],
      transformResponse: (response: { data: TMetaData[] }) => response.data,
    }),
  }),
});

// Export hooks for component usage
export const { useGetAnalyticsQuery } = analyticsApi;
