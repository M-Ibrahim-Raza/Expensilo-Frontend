import * as yup from "yup";

const nameSchema = yup
  .string()
  .trim()
  .required("Full name is required")
  .min(2, "Full name is too short")
  .max(100, "Full name is too long")
  .matches(
    /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/,
    "Full name can only contain letters, spaces, hyphens, or apostrophes"
  );

const emailSchema = yup
  .string()
  .trim()
  .email("Email format invalid")
  .required("Email is required")
  .min(6, "Email is too short")
  .max(254, "Email is too long")
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must contain @ and domain");

const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(6, "Password minimum length is 6")
  .max(128, "Password maximum length is 128")
  .matches(/[A-Z]/, "Password must include uppercase letter")
  .matches(/[a-z]/, "Password must include lowercase letter")
  .matches(/[0-9]/, "Password must include number")
  .matches(/[^A-Za-z0-9]/, "Password must include special character");

const confirmPasswordSchema = yup
  .string()
  .required("Confirm password is required")
  .oneOf([yup.ref("password")], "Passwords must match");

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});
