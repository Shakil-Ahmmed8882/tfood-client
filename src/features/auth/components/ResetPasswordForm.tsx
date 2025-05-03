import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import {
  initialResetPasswordValues,
  resetPasswordFormValue,
  ResetPasswordSchema,
} from "../schema";
import { FormEvent, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";
import { PasswordIcon } from "./Icons";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

export const ResetPasswordForm = () => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  const [resetPassword] = useResetPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<GenericFormRef<resetPasswordFormValue>>(null);

  const handleSubmit = async (values: resetPasswordFormValue | FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading("Changing password...");
    try {
      const resetValues = values as resetPasswordFormValue;
      resetValues.resetToken = `bearer ${token}`;

      const res = await resetPassword(resetValues).unwrap();
      const user = verifyToken(res.data.accessToken);

      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Password reset successful", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      const errorMessage = (error as { data: { message: string } }).data?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  return (
    <GenericForm
      schema={ResetPasswordSchema}
      initialValues={initialResetPasswordValues}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <PasswordField<resetPasswordFormValue>
        name="newPassword"
        placeholder="New password"
        label="Password"
        inputClass="border-gry-50 p-6"
        startIcon={<PasswordIcon />}
      />
      <PasswordField<resetPasswordFormValue>
        name="confirmPassword"
        placeholder="Confirm new Password"
        label="Confirm Password"
        inputClass="border-gry-50 p-6"
        startIcon={<PasswordIcon />}
      />
      <Button
        type="submit"
        className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-200 px-8 py-6 my-10 cursor-pointer"
      >
        Change Password
      </Button>
    </GenericForm>
  );
};

export default ResetPasswordForm;

ResetPasswordForm.displayName = "ResetPasswordForm";
