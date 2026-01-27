"use client";

import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/stores/authStore";
import { loginValidationSchema } from "@/lib/validations/loginSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";
import { useAuthFormStore } from "@/lib/stores/authFormStore";
import { AxiosError } from "axios";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isNavigating, setIsNavigating] = useState(false);

  const { email, setEmail, clear } = useAuthFormStore();

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
      router.replace("/transactions");
    } catch (error) {
      // Перевірка чи це AxiosError
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message || "Login failed");
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
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
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue }) => (
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
                <svg width="24" height="24" className={css.imginput}>
                  <use href="/sprite.svg#icon-email" />
                </svg>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={css.inputfield}
                  placeholder="E-mail"
                  disabled={isSubmitting || isNavigating}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e.target.value);
                    setEmail(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldwrapper}>
                <svg width="24" height="24" className={css.imginput}>
                  <use href="/sprite.svg#icon-lock" />
                </svg>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className={css.inputfield}
                  placeholder="Password"
                  disabled={isSubmitting || isNavigating}
                />
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
                onClick={() => {
                  setIsNavigating(true);
                  router.push("/register");
                }}
                disabled={isSubmitting || isNavigating}
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
