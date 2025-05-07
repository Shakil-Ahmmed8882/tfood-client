import { z } from "zod";

// Add phone validation regex pattern
// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

// // Create phone schema
// const phoneSchema = z.string().min(1).regex(phoneRegex, {
//   message: "Please enter a valid phone number",
// });

// Mock username check function
export const checkUsernameUnique = async (username: string) => {
  const takenUsernames = ["admin", "root", "test"];
  return !takenUsernames.includes(username.toLowerCase());
};

// Mock email check function
export const checkEmailUnique = async (email: string) => {
  const takenEmails = [
    "admin@example.com",
    "root@example.com",
    "test@example.com",
  ];
  return !takenEmails.includes(email.toLowerCase());
};

const passwordRequirements = {
  minLength: 6,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  // hasSpecialChar: /[^A-Za-z0-9]/,
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
  // .min(
  //   passwordRequirements.minLength,
  //   `Password must be at least ${passwordRequirements.minLength} characters`
  // )
  // .regex(
  //   passwordRequirements.hasUpperCase,
  //   "Password must contain at least one uppercase letter"
  // )
  // .regex(
  //   passwordRequirements.hasLowerCase,
  //   "Password must contain at least one lowercase letter"
  // )
  // .regex(
  //   passwordRequirements.hasNumber,
  //   "Password must contain at least one number"
  // )
  // .regex(
  //   passwordRequirements.hasSpecialChar,
  //   "Password must contain at least one special character"
  // ),
});
export type loginFormValue = z.infer<typeof LoginSchema>;

export const initialLoginValues: loginFormValue = {
  email: "",
  password: "",
};

export const SignUpSchema = LoginSchema.extend({
  name: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 characters").max(20, "Phone number must be at most 20 characters").regex(/^\d+$/, "Phone number must be a number").nonempty("Phone number is required"),
  confirmPassword: z.string()
    .min(
    passwordRequirements.minLength,
    `Password must be at least ${passwordRequirements.minLength} characters`
  )
  .regex(
    passwordRequirements.hasUpperCase,
    "Password must contain at least one capital letter"
  )
  .regex(
    passwordRequirements.hasLowerCase,
    "Password must contain at least one small letter"
  )
  .regex(
    passwordRequirements.hasNumber,
    "Password must contain at least one number"
  )
  ,
  role: z.enum(["super_admin", "admin", "customer", "shop_owner"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type signUpFormValue = z.infer<typeof SignUpSchema>;

export const initialSignUpValues: signUpFormValue = {
  ...initialLoginValues,
  name: "",
  phone: "",
  confirmPassword: "",
  role: "customer",
};

export const ForgotSchema = z.object({ email: z.string().email() });
export type forgotFormValue = z.infer<typeof ForgotSchema>;

export const initialForgotValues: forgotFormValue = {
  email: "",
};

export const ResetPasswordSchema = z.object({
  newPassword: z.string()  .min(
    passwordRequirements.minLength,
    `Password must be at least ${passwordRequirements.minLength} characters`
  )
  .regex(
    passwordRequirements.hasUpperCase,
    "Password must contain at least one capital letter"
  )
  .regex(
    passwordRequirements.hasLowerCase,
    "Password must contain at least one small letter"
  )
  .regex(
    passwordRequirements.hasNumber,
    "Password must contain at least one number"
  ),
  confirmPassword: z.string()  .min(
    passwordRequirements.minLength,
    `Password must be at least ${passwordRequirements.minLength} characters`
  )
  .regex(
    passwordRequirements.hasUpperCase,
    "Password must contain at least one capital letter"
  )
  .regex(
    passwordRequirements.hasLowerCase,
    "Password must contain at least one small letter"
  )
  .regex(
    passwordRequirements.hasNumber,
    "Password must contain at least one number"
  ),
  resetToken: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
export type resetPasswordFormValue = z.infer<typeof ResetPasswordSchema>;

export const initialResetPasswordValues: resetPasswordFormValue = {
  newPassword: "",
  confirmPassword: "",
  resetToken: "",
};


