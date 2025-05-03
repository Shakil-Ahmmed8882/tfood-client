// utils/apiHelpers.ts
import { ApiResponse } from "@/types/global";

// Generic function to handle API response transformation
export const transformApiResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
  return {
    success: response.success,
    message: response.message,
    meta: response.meta,
    data: response.data 
  }; // You can add any transformation logic if needed
};
