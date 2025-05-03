


import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { initialLoginValues, loginFormValue, LoginSchema } from "../schema";
import { FormEvent, useRef } from "react";
import { TextField } from "@/components/form/fields/TextField";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/store/features/auth/authSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { EmailIcon, PasswordIcon } from "./Icons";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
export const LoginForm = () => {

  const [login,{isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<GenericFormRef<loginFormValue>>(null);
  const handleSubmit = async (
    values: loginFormValue | FormEvent<HTMLFormElement>
  ) => {
    const tostId = toast.loading("logging in...");
    try {
      const res = await login(values).unwrap();

      const user = verifyToken(res.data.accessToken);
      console.log(res);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful", { id: tostId, duration: 2000 });
      navigate("/");
    } catch (error:any) {
      toast.error(error?.data?.message || "Something went wrong", { id: tostId, duration: 2000 });
    }
  };

  return (
    <GenericForm
      schema={LoginSchema}
      initialValues={initialLoginValues}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="space-y-4">
        <TextField<loginFormValue>
          name="email"
          placeholder="Email"
          label="Email"
          inputClass="border-gry-50 p-6"
          icon={<EmailIcon />}
          // action={() => console.log("action")}
        />
        <PasswordField<loginFormValue>
          name="password"
          placeholder="Enter your password "
          label="Password"
          inputClass="border-gry-50 p-6"
          startIcon={<PasswordIcon />}
        ></PasswordField>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label> */}
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-500/80  px-8 py-6 my-10 cursor-pointer"
      >
       {isLoading ? <LoadingSpinner className="size-[23px] "/> : "Login"}
      </Button>
    </GenericForm>
  );
};
export default LoginForm;



/// test changes 