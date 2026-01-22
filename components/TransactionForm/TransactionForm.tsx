"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { useRef, useState, useEffect } from "react";

import css from "./TransactionForm.module.css";
import CategorySelect from "../CategorySelect/CategorySelect";
import { fetchCategories } from "@/lib/api/category";

export interface TransactionFormValues {
  type: "income" | "expense";
  amount: number | "";
  date: Date;
  category: string;
  comment: string;
}

interface Props {
  initialValues: TransactionFormValues;
  submitText: string;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
}

const categoryOptions = [
  { value: "Products", label: "Products" },
  { value: "Car", label: "Car" },
  { value: "Education", label: "Education" },
];

const validationSchema = Yup.object({
  type: Yup.string().oneOf(["income", "expense"]).required(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be greater than 0"),
  date: Yup.date().required(),
  category: Yup.string().when("type", {
    is: "expense",
    then: (schema) => schema.required("Category is required"),
  }),
  comment: Yup.string().max(100),
});

export default function TransactionForm({
  initialValues,
  submitText,
  onSubmit,
}: Props) {
  const datePickerRef = useRef<DatePicker>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories({ type: "income" }).then((a) => console.log(a));
  }, []);

  return (
    <Formik<TransactionFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.toggleWrapper}>
            <label className={css.toggle}>
              <span
                className={`${css.label} ${
                  values.type === "income" ? css.active : ""
                }`}
              >
                Income
              </span>

              <Field
                type="checkbox"
                name="type"
                checked={values.type === "expense"}
                onChange={() =>
                  setFieldValue(
                    "type",
                    values.type === "income" ? "expense" : "income",
                  )
                }
                className={css.hiddenInput}
              />

              <span className={css.track}>
                <span
                  className={`${css.thumb} ${
                    values.type === "expense" ? css.expense : css.income
                  }`}
                >
                  <svg
                    className={`${css.iconThumb} ${css.minus}`}
                    width="20"
                    height="20"
                  >
                    <use href="/sprite.svg#icon-minus" />
                  </svg>

                  <svg
                    className={`${css.iconThumb} ${css.plus}`}
                    width="20"
                    height="20"
                  >
                    <use href="/sprite.svg#icon-plus" />
                  </svg>
                </span>
              </span>

              <span
                className={`${css.label} ${
                  values.type === "expense" ? css.active : ""
                }`}
              >
                Expense
              </span>
            </label>
          </div>

          {values.type === "expense" && (
            <div style={{ width: "100%", paddingBottom: "12px" }}>
              <Field
                name="category"
                component={CategorySelect}
                options={categoryOptions}
                hasError={touched.category && !!errors.category}
                hasSuccess={touched.category && !errors.category}
              />
              <ErrorMessage
                name="category"
                component="p"
                className={css.errorText}
              />
            </div>
          )}
          <div className={css.fixedWidthGrop}>
            <div className={css.formGrop}>
              <Field
                className={`${css.input} ${css.fixedWidth} ${
                  touched.amount
                    ? errors.amount
                      ? css.inputError
                      : css.inputSuccess
                    : ""
                }`}
                name="amount"
                type="number"
                placeholder="0.00"
              />
              <ErrorMessage
                name="amount"
                component="p"
                className={css.errorText}
              />
            </div>

            <div className={css.formGrop}>
              <DatePicker
                ref={datePickerRef}
                open={isOpen}
                dateFormat="dd.MM.yyyy"
                customInput={<input className={css.input} />}
                onClickOutside={() => setIsOpen(false)}
                onSelect={() => setIsOpen(false)}
                className={`${css.input} ${css.fixedWidth} ${
                  touched.date
                    ? errors.date
                      ? css.inputError
                      : css.inputSuccess
                    : ""
                }`}
                selected={values.date}
                onChange={(date: Date | null) => setFieldValue("date", date)}
              />
              <ErrorMessage
                name="date"
                component="p"
                className={css.errorText}
              />
              <button
                type="button"
                className={css.iconButton}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <svg className={css.icon} width="24" height="24">
                  <use href="/sprite.svg#icon-date-range" />
                </svg>
              </button>
            </div>
          </div>
          <div className={css.formGrop}>
            <Field className={css.input} name="comment" placeholder="Comment" />
            <ErrorMessage
              name="comment"
              component="p"
              className={css.errorText}
            />
          </div>

          <button
            className={css.buttonSubmit}
            type="submit"
            disabled={isSubmitting}
          >
            {submitText}
          </button>
        </Form>
      )}
    </Formik>
  );
}
