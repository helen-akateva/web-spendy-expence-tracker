"use client";

import { ErrorMessage, Field, Form, Formik, FieldProps } from "formik";
import css from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/stores/authStore";
import { loginValidationSchema } from "@/lib/validations/loginSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";
import { useAuthFormStore } from "@/lib/stores/authFormStore";
import axios from "axios";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { email, setEmail, clear } = useAuthFormStore();

  const [isNavigating, setIsNavigating] = useState(false);

  const initialValues: LoginFormValues = {
    email,
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const user = await authApi.login(values);

      setUser(user);
      clear();
      toast.success("Welcome back 👋");
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
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form noValidate className={css.form}>
            {isSubmitting && (
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
              </div>

              <button
                className={css.btnsubmit}
                type="submit"
                disabled={isSubmitting || isNavigating}
              >
                {isSubmitting ? "Log in..." : "Log in"}
              </button>

              <button
                className={css.btnregister}
                type="button"
                disabled={isSubmitting || isNavigating}
                onClick={() => {
                  setIsNavigating(true);
                  setEmail(values.email);
                  router.push("/register");
                }}
              >
                {isNavigating ? (
                  <>
                    <span>Redirecting...</span>
                    <div className={css.loaderOverlay}>
                      <Loader size={80} />
                    </div>
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
