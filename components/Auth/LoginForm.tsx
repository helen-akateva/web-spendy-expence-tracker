"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { loginValidationSchema } from "@/lib/validations/loginSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";
import { useAuthFormStore } from "@/lib/store/authFormStore";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

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
      router.replace("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Login failed");
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
                <svg width="24" height="24" className={css.imginput}>
                  <use href="/sprite.svg#icon-email" />
                </svg>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={css.inputfield}
                  placeholder="E-mail"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Log in..." : "Log in"}
              </button>

              <button
                className={css.btnregister}
                type="button"
                onClick={() => router.push("/register")}
                disabled={isSubmitting}
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
