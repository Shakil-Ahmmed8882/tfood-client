import { useVerifyEmailWithTokenMutation } from "@/store/features/auth/authApi";
import { useEffect, useState } from "react";

export const useVerifyEmailWithToken = (token: string) => {
  /**
   * Why this: This hook from our API slice handles the server-side email verification.
   * Use case: After a user clicks a verification link, this mutation sends the token to the backend.
   * Output: Triggers an API call to verify the user's email address.
   */
  const [verifyEmail, { isLoading, isSuccess, isError }] = useVerifyEmailWithTokenMutation();
  /**
   * Why this: This state is used to track the success status of the email verification.
   * Use case: We need a local state to manage the verification success, especially for UI updates.
   * Output: A boolean value indicating whether the email verification was successful.
   */
  const [isEmailVerificationSuccess, setIsEmailVerificationSuccess] = useState(false);

  

  /**
   * Why this: We want to automatically trigger the email verification only once when the component mounts and the token is available.
   * Use case: When the user clicks the verification link, they are directed to this route, and we immediately want to attempt verification without repeated calls.
   * Output: Calls the `verifyEmail` mutation with the token from the URL. The dependency array ensures it runs only once.
   */
  useEffect(() => {
    if (token) {
      const emailToken = `bearer ${token}`;
      verifyEmail({ emailToken });
    }
  }, [token, verifyEmail]);

  /**
   * Why this: We need to update our local success state based on the API mutation's `isSuccess` status.
   * Use case: This allows us to react to the successful verification and potentially trigger UI changes or navigation.
   * Output: Updates the `isEmailVerificationSuccess` state when the API call is successful. The dependency on `isSuccess` ensures it updates only when this value changes.
   */
  useEffect(() => {
    if (isSuccess) {
      setIsEmailVerificationSuccess(true);
    }
  }, [isSuccess, setIsEmailVerificationSuccess]);

  return {
    isLoading,
    isEmailVerificationSuccess,
    isError,
  };
};