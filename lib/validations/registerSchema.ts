import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(32, "Name is too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .max(64, "Email must be at most 64 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});
