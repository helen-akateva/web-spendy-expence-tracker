"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { useRef, useState, useEffect } from "react";

import css from "./TransactionForm.module.css";
import CategorySelect, { Option } from "../CategorySelect/CategorySelect";
import { fetchCategories } from "@/lib/api/category";
import Toggle from "../Toggle/Toggle";

export interface TransactionFormValues {
  type: "income" | "expense";
  amount: number;
  date: Date;
  categoryId: string;
  comment: string;
}

interface Props {
  initialValues: TransactionFormValues;
  submitText: string;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
}

const validationSchema = Yup.object({
  type: Yup.string().oneOf(["income", "expense"]).required(),
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be at least 1")
    .max(1000000, "Amount must be at most 1 000 000")
    .typeError("Amount must be a number"),
  date: Yup.date().required("Date is required"),
  categoryId: Yup.string().when("type", {
    is: "expense",
    then: (schema) => schema.required("Category is required"),
  }),
  comment: Yup.string()
    .min(2, "Comment must be at least 2 characters")
    .max(192, "Comment must be at most 192 characters")
    .optional(),
});

export default function TransactionForm({
  initialValues,
  submitText,
  onSubmit,
}: Props) {
  const datePickerRef = useRef<DatePicker>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [type, setType] = useState<"income" | "expense">(initialValues.type);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchCategories({ type }).then((categories) =>
      setCategoryOptions(
        categories.map((cat) => ({ value: cat._id, label: cat.name })),
      ),
    );
  }, [type]);

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
          <Toggle
            value={values.type}
            onChange={(value) => {
              setType(value);
              setFieldValue("type", value);
            }}
          />

          <div style={{ width: "100%", paddingBottom: "12px" }}>
            <Field
              name="categoryId"
              component={CategorySelect}
              options={categoryOptions}
              hasError={touched.categoryId && !!errors.categoryId}
              hasSuccess={touched.categoryId && !errors.categoryId}
            />
            <ErrorMessage
              name="categoryId"
              component="p"
              className={css.errorText}
            />
          </div>

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
                portalId="root-datepicker"
                dateFormat="dd.MM.yyyy"
                customInput={<input className={css.input} />}
                onClickOutside={() => setIsOpen(false)}
                onSelect={() => setIsOpen(false)}
                className={`${css.input} ${css.fixedWidth}  ${
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
                className={css.iconDate}
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
