"use client";

import Select from "react-select";
import { FieldProps } from "formik";

export interface Option {
  value: string;
  label: string;
}

interface Props extends FieldProps {
  options: Option[];
  hasError?: boolean;
  hasSuccess?: boolean;
}

export default function CategorySelect({
  field,
  form,
  options,
  hasError,
  hasSuccess,
}: Props) {
  const selectedOption =
    options.find((option) => option.value === field.value) || null;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => form.setFieldValue(field.name, option?.value)}
      onBlur={() => form.setFieldTouched(field.name, true)}
      placeholder="Select category"
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={{
        container: (base) => ({
          ...base,
          width: "100%",
        }),
        control: (base) => ({
          ...base,
          backgroundColor: "#508f8c",
          width: "100%",
          minHeight: "auto",
          borderRadius: "8px",
          border: hasError
            ? "1px solid #b20202"
            : hasSuccess
              ? "1px solid #0b6016"
              : "1px solid #081222",

          boxShadow: "none",
          cursor: "pointer",

          "&:hover": {
            border: hasError
              ? "1px solid #b20202"
              : hasSuccess
                ? "1px solid #0b6016"
                : "1px solid #081222",
          },
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "11px 14px",
        }),
        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
          fontSize: "18px",
          fontWeight: 500,
          color: "#081222",
        }),

        singleValue: (base) => ({
          ...base,
          fontSize: "18px",
          fontWeight: 500,
          color: "#081222",
        }),

        placeholder: (base) => ({
          ...base,
          color: "#3b5d63",
          fontSize: "18px",
          fontWeight: 500,
        }),

        indicatorsContainer: (base) => ({
          ...base,
          paddingRight: "14px",
        }),

        indicatorSeparator: () => ({
          display: "none",
        }),

        dropdownIndicator: (base, state) => ({
          ...base,
          padding: 0,
          color: "#081222",
          transition: "transform 0.2s ease",
          transform: state.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : "rotate(0deg)",
          "&:hover": {
            color: "#081222",
          },
        }),

        menu: (base) => ({
          ...base,
          borderRadius: "8px",
          background: "linear-gradient(180deg, #294045 0%, #1e2f33 100%)",

          marginTop: "0",
          zIndex: 20,
        }),

        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),

        option: (base) => ({
          ...base,
          background: "inherit;",
          color: " #fcfcfc",
          cursor: "pointer",

          "&:hover": {
            background: "linear-gradient(180deg, #355359 0%, #3b5d63 100%)",
          },
        }),
      }}
    />
  );
}
