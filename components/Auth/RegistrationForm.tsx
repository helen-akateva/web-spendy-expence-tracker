"use client";

import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import css from "./RegistrationForm.module.css";
import { useAuthStore } from "@/lib/stores/authStore";
import { registerValidationSchema } from "@/lib/validations/registerSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";
import { useAuthFormStore } from "@/lib/stores/authFormStore";
import axios from "axios";
import { useState } from "react";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 12.5;
  if (/[^a-zA-Z\d]/.test(password)) strength += 12.5;
  return Math.min(strength, 100);
};

export default function RegistrationForm() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const { name, email, setEmail, setName, clear } = useAuthFormStore();

  const [isNavigating, setIsNavigating] = useState(false);

  const initialValues: RegisterFormValues = {
    name: name || "",
    email: email || "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (value: boolean) => void },
  ) => {
    try {
      const { confirmPassword: _confirmPassword, ...payload } = values;

      const user = await authApi.register(payload);

      setUser(user);
      clear();

      toast.success("Account created successfully 🎉");
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={css.sectionform}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => {
          const passwordStrength = calculatePasswordStrength(values.password);

          return (
            <Form noValidate className={css.form}>
              {(isSubmitting || isNavigating) && (
                <div className={css.loaderOverlay}>
                  <Loader size={80} />
                </div>
              )}

              <svg width="54" height="54" className={css.imglogo}>
                <use href="/sprite.svg#icon-logo" />
              </svg>
              <h1 className={css.formtitle}>Spendy</h1>

              <div className={css.formwrapper}>
                <div className={css.fieldwrapper}>
                  <div className={css.inputbox}>
                    <svg width="24" height="24" className={css.imginput}>
                      <use href="/sprite.svg#icon-user" />
                    </svg>
                    <Field name="name">
                      {({ field, meta }: FieldProps) => (
                        <input
                          {...field}
                          type="text"
                          id="email"
                          placeholder="Name"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                          className={`${css.inputfield} ${
                            meta.touched && meta.error ? css.error : ""
                          }`}
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.fieldwrapper}>
                  <div className={css.inputbox}>
                    <svg width="24" height="24" className={css.imginput}>
                      <use href="/sprite.svg#icon-email" />
                    </svg>
                    <Field name="email">
                      {({ field, meta }: FieldProps) => (
                        <input
                          {...field}
                          type="email"
                          id="email"
                          placeholder="E-mail"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                          className={`${css.inputfield} ${
                            meta.touched && meta.error ? css.error : ""
                          }`}
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.fieldwrapper}>
                  <div className={css.inputbox}>
                    <svg width="24" height="24" className={css.imginput}>
                      <use href="/sprite.svg#icon-lock" />
                    </svg>
                    <Field name="password">
                      {({ field, meta }: FieldProps) => (
                        <input
                          {...field}
                          type="password"
                          id="password"
                          placeholder="Password"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                          className={`${css.inputfield} ${
                            meta.touched && meta.error ? css.error : ""
                          }`}
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.error}
                  />

                  {/* ProgressBar */}
                  {values.password && (
                    <div className={css.progressbarwrapper}>
                      <div
                        className={css.progressbar}
                        style={{
                          width: `${passwordStrength}%`,
                          backgroundColor:
                            passwordStrength < 50
                              ? "#ef4444"
                              : passwordStrength < 75
                                ? "#f59e0b"
                                : "#22c55e",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className={css.fieldwrapper}>
                  <div className={css.inputbox}>
                    <svg width="24" height="24" className={css.imginput}>
                      <use href="/sprite.svg#icon-lock" />
                    </svg>
                    <Field name="confirmPassword">
                      {({ field, meta }: FieldProps) => (
                        <input
                          {...field}
                          type="password"
                          placeholder="Confirm password"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                          className={`${css.inputfield} ${
                            meta.touched && meta.error ? css.error : ""
                          }`}
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={css.error}
                  />
                </div>

                <button
                  type="submit"
                  className={css.btnsubmit}
                  disabled={isSubmitting || isNavigating}
                >
                  {isSubmitting ? "Register..." : "Register"}
                </button>

                <button
                  type="button"
                  className={css.btnlogin}
                  onClick={() => {
                    setIsNavigating(true);
                    setEmail(values.email);
                    setName(values.name);
                    router.push("/login");
                  }}
                  disabled={isSubmitting || isNavigating}
                >
                  {isNavigating ? (
                    <>
                      <span>Redirecting...</span>
                      <div className={css.loaderOverlay}>
                        <Loader size={80} />
                      </div>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
