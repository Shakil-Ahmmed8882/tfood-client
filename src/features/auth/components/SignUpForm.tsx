import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { initialSignUpValues, signUpFormValue, SignUpSchema } from "../schema";
import { useRef } from "react";
import { TextField } from "@/components/form/fields/TextField";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/store/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/store/features/auth/authSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { EmailIcon, PasswordIcon } from "./Icons";
import { IdCard } from "lucide-react";
import { RadioGroupField } from "@/components/form/fields/RadioGroupField";
export const SignupForm = () => {
  const [signUp] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<GenericFormRef<signUpFormValue>>(null);

  return (
    <GenericForm
      schema={SignUpSchema}
      initialValues={initialSignUpValues}
      onSubmit={async (values) => {
        console.log(values);

        const tostId = toast.loading("Signing up...");
        try {
          const res = await signUp(values).unwrap();

          const user = verifyToken(res.data.accessToken);
          dispatch(setUser({ user, token: res.data.accessToken }));
          toast.success("Signup successful", { id: tostId, duration: 2000 });
          navigate("/");
        } catch (error: unknown) {
          const errorData = error as {
            data: { message: string; success: boolean };
          };
          console.log(error);
          toast.error(errorData.data.message || "something went wrong.", {
            id: tostId,
            duration: 2000,
          });
        }
      }}
      ref={formRef}
    >
      <div className="space-y-6">
        <TextField<signUpFormValue>
          name="name"
          placeholder="Enter your name"
          label="Name"
          inputClass="border-gry-50 p-6"
          icon={<IdCard className="text-gray-600" />}
          // action={() => console.log("action")}
        />

        <RadioGroupField
          name="role"
          label="Choose Your Role!"
          options={[
            { value: "customer", label: "Customer" },
            { value: "shop_owner", label: "Shop Owner" },
          ]}
          required
          rowGroup
          defaultValue="customer"
        />

        <TextField<signUpFormValue>
          name="email"
          placeholder="Email"
          label="Email"
          inputClass="border-gry-50 p-6"
          icon={<EmailIcon />}
          // action={() => console.log("action")}
        />
        <PasswordField<signUpFormValue>
          name="password"
          placeholder="Enter your password "
          label="Password"
          inputClass="border-gry-50 p-6"
          startIcon={<PasswordIcon />}
        />
        <PasswordField<signUpFormValue>
          name="confirmPassword"
          placeholder="Confirm password "
          label="Password"
          inputClass="border-gry-50 p-6"
          startIcon={<PasswordIcon />}
        />
      </div>

      <Button
        type="submit"
        className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-200  px-8 py-6 my-10 cursor-pointer"
      >
        Create Account
      </Button>
    </GenericForm>
  );
};
SignupForm.displayName = "SignupForm";
