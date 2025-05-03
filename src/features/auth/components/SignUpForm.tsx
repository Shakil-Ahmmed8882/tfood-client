import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { initialSignUpValues, signUpFormValue, SignUpSchema } from "../schema";
import { useRef } from "react";
import { TextField } from "@/components/form/fields/TextField";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { Button } from "@/components/ui/button";
import { EmailIcon, PasswordIcon } from "./Icons";
import { IdCard } from "lucide-react";
import { RadioGroupField } from "@/components/form/fields/RadioGroupField";
import { useSignUp } from "../hooks/useSignUp";
import { SuccessModal } from "@/components/modal/SuccessModal";
import mail_icon from "@/assets/icons/img/mail_icon.gif";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


export const SignupForm = () => {
  const formRef = useRef<GenericFormRef<signUpFormValue>>(null);
  const goTo = useNavigate()
  const { handleSignUp, isSuccess , is_verified, isLoading} = useSignUp();


  return (
    <GenericForm
      schema={SignUpSchema}
      initialValues={initialSignUpValues}
      onSubmit={handleSignUp}
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
            { value: "customer", label: "Visitor" },
            { value: "shop_owner", label: "Restaurant Owner" },
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
        className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-500/80  px-8 py-6 my-10 cursor-pointer"
      >
        {isLoading ? <LoadingSpinner className="size-[23px] "/> : "Sign Up"}
      </Button>
            <SuccessModal
          isOpen={isSuccess && !is_verified}
          isFooter={false}
          icon={
            <img
              src={mail_icon}
              alt={"success icon"}
              className="rounded-full w-44 h-40"
            />
          }
          onClose={() => {}}
          title="Please check your email"
          description="Account created successfully"
        />

            <SuccessModal
          isOpen={isSuccess && is_verified}
          onClose={() => goTo("/login")}
          title="Already verified"
          description="Account is already verified"
          buttonText="Login"
        />
    </GenericForm>
  );
};
SignupForm.displayName = "SignupForm";
