import React from "react";

import { Control, FieldValues, Controller } from "react-hook-form";

import { TextInput, Label } from "../";

import { Error } from ".";

import { PrefixSuffix } from "../TextInput";

import Rules from "./rules";

import capitalizeWords from "../utilities/capitalizeWords";

type FormTextInputProps = {
  control: Control<FieldValues, any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  label: string;
  isOptional?: boolean;
  tooltipText?: string;
  type?: "text" | "password" | "email" | "number";
  rules?: Rules;
  prefix?: PrefixSuffix;
  suffix?: PrefixSuffix;
};

const FormTextInput = ({
  control,
  name,
  placeholder,
  readOnly,
  disabled,
  label,
  isOptional = false,
  tooltipText,
  type = "text",
  rules = {},
  prefix,
  suffix,
}: FormTextInputProps) => {
  const required = rules.required === true;
  if (required) {
    rules = {
      ...rules,
      required: {
        value: true,
        message: `${label || capitalizeWords(name)} is required`,
      },
    };
  }

  if (typeof rules.min === "number") {
    rules = {
      ...rules,
      min: { value: rules.min, message: `Minimum value is ${rules.min}` },
    };
  }

  if (typeof rules.max === "number") {
    rules = {
      ...rules,
      max: { value: rules.max, message: `Maximum value is ${rules.max}` },
    };
  }

  if (typeof rules.maxLength === "number") {
    rules = {
      ...rules,
      maxLength: {
        value: rules.maxLength,
        message: `Max length is ${rules.maxLength}`,
      },
    };
  }

  if (typeof rules.minLength === "number") {
    rules = {
      ...rules,
      minLength: {
        value: rules.minLength,
        message: `Max length is ${rules.minLength}`,
      },
    };
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules as object}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <div>
            <Label
              value={label}
              isRequired={!!rules.required}
              isOptional={isOptional}
              tooltipText={tooltipText}
            />
            <TextInput
              value={value}
              onChange={onChange}
              type={type}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              isInvalid={!!error}
              prefix={prefix}
              suffix={suffix}
            />
            <Error error={error} />
          </div>
        );
      }}
    />
  );
};

export default FormTextInput;
