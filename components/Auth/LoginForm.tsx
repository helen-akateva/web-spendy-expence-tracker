"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/authStore";
import { loginValidationSchema } from "@/lib/validations/loginSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";

interface LoginFormValues {
	email: string;
	password: string;
}

const initialValues: LoginFormValues = {
	email: "",
	password: "",
};

export default function LoginForm() {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);

	const handleSubmit = async (
		values: LoginFormValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		try {
			const user = await authApi.login(values);

			setUser(user);
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
				onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form noValidate className={css.form}>
						{isSubmitting && (
							<div className={css.loaderOverlay}>
								<Loader size={60} />
							</div>
						)}

						<svg width="54" height="54" className={css.imglogo}>
							<use href="/sprite.svg#icon-logo" />
						</svg>
						<h1 className={css.formtitle}>Spendy</h1>

						<div className={css.formwrapper}>
							<div className={css.fieldwrapper}>
								<Field
									name="email"
									type="email"
									id="email"
									className={css.inputfield}
									placeholder="E-mail"
									disabled={isSubmitting}
								/>
								<ErrorMessage
									name="email"
									component="div"
									className={css.error}
								/>
							</div>

							<div className={css.fieldwrapper}>
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
								disabled={isSubmitting}>
								{isSubmitting ? "Log in..." : "Log in"}
							</button>

							<button
								className={css.btnregister}
								type="button"
								onClick={() => router.push("/register")}
								disabled={isSubmitting}>
								Register
							</button>
						</div>
						<Image
							src="/images/dude1x.webp"
							width={158}
							height={118}
							alt="delete"
							className={css.imghero}
						/>
					</Form>
				)}
			</Formik>
		</section>
	);
}
