import { useSignUpMutation } from "@/store/features/auth/authApi";
import { signUpFormValue } from "../schema";
import { FormEvent } from "react";


export const useSignUp = () => {
  /**
   * Why this: This hook provides the functionality to handle user sign-up.
   * Use case: When a user submits the sign-up form, this hook sends the data to the server.
   * Output: Triggers a mutation to create a new user in the backend.
   */
  const [signUp, {data,isSuccess}] = useSignUpMutation();
 

  /**
   * Why this: This function is called when the user submits the sign-up form.
   * Use case: It takes the form values, sends them to the server for registration,
   * and then handles the success or error scenarios.
   * Output: On success, it updates the user state and navigates to the homepage; on error, it displays an error message.
   */
  const handleSignUp = async (values: signUpFormValue | FormEvent<HTMLFormElement>) => {

    try {
      const res = await signUp(values).unwrap();
      console.log(res);
    } catch (error: unknown) {
      console.log(error);

    }
  };

  return {
    handleSignUp, 
    isSuccess,
    is_verified: data?.data?.is_verified
  }


};