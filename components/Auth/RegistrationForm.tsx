"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import css from "./RegistrationForm.module.css";
import { useAuthStore } from "@/lib/stores/authStore";
import { registerValidationSchema } from "@/lib/validations/registerSchema";
import { authApi } from "@/lib/services/authService";
import { Loader } from "@/components/Loader/Loader";
import { useAuthFormStore } from "@/lib/stores/authFormStore";

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

	const initialValues: RegisterFormValues = {
		name: name || "",
		email: email || "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = async (
		values: RegisterFormValues,
		{ setSubmitting }: { setSubmitting: (value: boolean) => void }
	) => {
		try {
			const { confirmPassword: _confirmPassword, ...payload } = values;

			const user = await authApi.register(payload);

			setUser(user);
			clear();

			toast.success("Account created successfully 🎉");
			router.replace("/transactions");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Registration failed"
			);
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
				enableReinitialize>
				{({ isSubmitting, values, setFieldValue }) => {
					const passwordStrength = calculatePasswordStrength(
						values.password
					);

					return (
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
									<svg width="24" height="24" className={css.imginput}>
										<use href="/sprite.svg#icon-user" />
									</svg>
									<Field
										name="name"
										type="text"
										placeholder="Name"
										className={css.inputfield}
										disabled={isSubmitting}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => {
											setFieldValue("name", e.target.value);
											setName(e.target.value);
										}}
									/>
									<ErrorMessage
										name="name"
										component="div"
										className={css.error}
									/>
								</div>

								<div className={css.fieldwrapper}>
									<svg width="24" height="24" className={css.imginput}>
										<use href="/sprite.svg#icon-email" />
									</svg>
									<Field
										name="email"
										type="email"
										placeholder="Email"
										className={css.inputfield}
										disabled={isSubmitting}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => {
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
										placeholder="Password"
										className={css.inputfield}
										disabled={isSubmitting}
									/>
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
														passwordStrength < 50 ? "#ef4444"
															: passwordStrength < 75 ? "#f59e0b"
																: "#22c55e",
												}}
											/>
										</div>
									)}
								</div>

								<div className={css.fieldwrapper}>
									<svg width="24" height="24" className={css.imginput}>
										<use href="/sprite.svg#icon-lock" />
									</svg>
									<Field
										name="confirmPassword"
										type="password"
										placeholder="Confirm password"
										className={css.inputfield}
										disabled={isSubmitting}
									/>
									<ErrorMessage
										name="confirmPassword"
										component="div"
										className={css.error}
									/>
								</div>

								<button
									type="submit"
									className={css.btnsubmit}
									disabled={isSubmitting}>
									{isSubmitting ? "Register..." : "Register"}
								</button>

								<button
									type="button"
									className={css.btnlogin}
									onClick={() => router.push("/login")}
									disabled={isSubmitting}>
									Log in
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</section>
	);
}
