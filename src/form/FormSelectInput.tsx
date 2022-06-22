import React from "react";

import { Control, FieldValues, Controller } from "react-hook-form";

import { SelectInput, Label } from "..";

import { Option } from "../SelectInput";

import { Error } from ".";

import Rules from "./rules";

import capitalizeWords from "../utilities/capitalizeWords";

type FormSelectInputProps<T> = {
  control: Control<FieldValues, any>;
  name: string;
  /** The options that the select input contains */
  options: Option<T>[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  isOptional?: boolean;
  tooltipText?: string;
  rules?: Rules;
};

const FormSelectInput = ({
  control,
  name,
  options,
  placeholder,
  disabled,
  readOnly,
  label,
  isOptional,
  tooltipText,
  rules = {},
}: FormSelectInputProps<any>) => {
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
            {label ? (
              <Label
                value={label}
                isRequired={!!rules.required}
                isOptional={isOptional}
                tooltipText={tooltipText}
              />
            ) : null}
            <SelectInput
              value={value}
              options={options}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              isInvalid={!!error}
            />
            <Error error={error} />
          </div>
        );
      }}
    />
  );
};

export default FormSelectInput;
