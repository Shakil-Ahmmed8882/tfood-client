
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    
    signUp: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
            // transformResponse: (response) => response.data,
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    verifyEmailWithToken: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/verify-email-token",
          method: "POST",
          body: body,
        };
      },
    }),

    
    
  }),
});
export const { useLoginMutation, useSignUpMutation, useForgotPasswordMutation,useResetPasswordMutation, useVerifyEmailWithTokenMutation} = authApi;