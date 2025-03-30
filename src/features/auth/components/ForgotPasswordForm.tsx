import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { forgotFormValue, ForgotSchema, initialForgotValues } from "../schema";
import { useRef } from "react";
import { TextField } from "@/components/form/fields/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation} from "@/store/features/auth/authApi";
import { toast } from "sonner";
import { EmailIcon } from "./Icons";
export const ForgotPasswordForm = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const formRef = useRef<GenericFormRef<forgotFormValue>>(null);

  return (
    <GenericForm
      schema={ForgotSchema}
      initialValues={initialForgotValues}
      onSubmit={async (values) => {
        console.log(values);

        const tostId = toast.loading("Sending email...");
        try {
          const res = await forgotPassword(values).unwrap();
          console.log(res);
          toast.success("Check you email for reset", { id: tostId, duration: 2000 });
          navigate("/email-success");
        } catch (error: unknown) {
          // const errorData = error as {
          //   data: { message: string; success: boolean };
          // };
          console.log(error);
          toast.error( "something went wrong.", {
            id: tostId,
            duration: 2000,
          });
        }
      }}
      ref={formRef}
    >
      <TextField<forgotFormValue>
        name="email"
        placeholder="Email"
        label="Email"
        inputClass="border-gry-50 p-6"
        icon={<EmailIcon />}
        // action={() => console.log("action")}
      />

      <Button
        type="submit"
        className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-200  px-8 py-6 my-5 md:my-10 cursor-pointer"
      >
        Reset Password
      </Button>
    </GenericForm>
  );
};
export default ForgotPasswordForm;
