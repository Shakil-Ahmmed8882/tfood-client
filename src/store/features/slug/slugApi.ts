
import {  TSlugAvailabilityResponse } from "@/types/slug.type";
import { baseApi } from "../../api/baseApi";


/**
 * slugApi.ts : Defines API endpoint for slug-related operations using RTK Query.
 * Features:
 * - Fetches all slugs with optional filters.
 * - Supports dynamic query construction.
 * - Enables caching and automatic updates via API tags.
 */

export const slugApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkSlugAvailability: builder.query({
      query: (slug: string) => {

        return {
          url: `/slugs/check/${slug}`,
          method: "GET"
        };
      },
      transformResponse:(response: TSlugAvailabilityResponse) => ({data: response.data}),
      
    }),
  }),
});

export const { useCheckSlugAvailabilityQuery } = slugApi;
