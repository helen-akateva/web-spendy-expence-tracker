"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { useRef, useState, useEffect, useMemo } from "react";

import css from "./TransactionForm.module.css";
import CategorySelect, { Option } from "../CategorySelect/CategorySelect";

import Toggle from "../Toggle/Toggle";
import {
  useCategoriesStore,
  CategoriesState,
} from "@/lib/stores/categoriesStore";

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
  disabled?: boolean;
}

export default function TransactionForm({
  initialValues,
  submitText,
  onSubmit,
  disabled,
}: Props) {
  const datePickerRef = useRef<DatePicker>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [type, setType] = useState<"income" | "expense">(initialValues.type);
  // Використовуємо по одному селектору, щоб уникнути проблем з типами
  const incomeCategories = useCategoriesStore(
    (state: CategoriesState) => state.incomeCategories,
  );
  const expenseCategories = useCategoriesStore(
    (state: CategoriesState) => state.expenseCategories,
  );
  const loadCategories = useCategoriesStore(
    (state: CategoriesState) => state.loadCategories,
  );
  const isLoaded = useCategoriesStore(
    (state: CategoriesState) => state.isLoaded,
  );
  const isLoading = useCategoriesStore(
    (state: CategoriesState) => state.isLoading,
  );

  // Завантажуємо категорії один раз
  useEffect(() => {
    if (!isLoaded && !isLoading) loadCategories();
  }, [isLoaded, isLoading, loadCategories]);

  // Генеруємо опції для селекту
  const categoryOptions: Option[] = useMemo(() => {
    const categories = type === "income" ? incomeCategories : expenseCategories;
    if (isLoading) return [{ value: "", label: "Loading..." }];
    return categories.map((cat) => ({ value: cat._id, label: cat.name }));
  }, [type, incomeCategories, expenseCategories, isLoading]);

  const validationSchema = useMemo(() => {
    return Yup.object({
      type: Yup.string().oneOf(["income", "expense"]).required(),
      amount: Yup.number()
        .required("Amount is required")
        .min(1, "Amount must be at least 1")
        .max(1000000, "Amount must be at most 1 000 000")
        .typeError("Amount must be a number"),
      date: Yup.date()
        .required("Date is required")
        .max(new Date(), "Cannot select future date")
        .min(
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          "Date cannot be older than 1 year",
        ),
      categoryId: Yup.string().required("Category is required"),
      comment: Yup.string()
        .required("Comment is required")
        .min(2, "Comment must be at least 2 characters")
        .max(192, "Comment must be at most 192 characters"),
    });
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
      {({ values, setFieldValue, errors, touched }) => (
        <Form className={css.form}>
          <Toggle
            value={values.type}
            onChange={(value) => {
              setType(value);
              setFieldValue("type", value);
            }}
          />

          <div className={css.formGrop}>
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
                min={0}
                max={1000000}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  let value = parseFloat(input.value);

                  if (isNaN(value)) value = 0;
                  if (value < 0) input.value = "0";
                  if (value > 1000000) input.value = "1000000";
                }}
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
                maxDate={new Date()}
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
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
            disabled={disabled}
          >
            {submitText}
          </button>
        </Form>
      )}
    </Formik>
  );
}
