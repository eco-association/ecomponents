import React from "react";

import { Control, FieldValues, Controller } from "react-hook-form";

import { CalendarDateInput, Label } from "..";

import { Error } from ".";

import Rules from "./rules";

import capitalizeWords from "../utilities/capitalizeWords";

type FormSelectInputProps<T> = {
  /** The control for this instance of React Hook Form */
  control: Control<FieldValues, any>;
  /** The name of the component in reference to the form values */
  name: string;
  /** The placeholder text that will be displayed when the input is empty */
  placeholder?: string;
  /** Give the input a disabled prop */
  disabled?: boolean;
  /** The date format string that is used to display a date to the use.
   *  This should be a moment format string, like "MM-DD-YYYY".
   *  https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/ */
  dateStringFormat?: string;
  /** The minimum date that can be selected */
  minDate?: Date;
  /** The maximum date that can be selected */
  maxDate?: Date;
  /** Text to be displayed above the input */
  label?: string;
  /** Controls the optional text in the label */
  isOptional?: boolean;
  /** If present shows a tooltip next to the label with this help text */
  tooltipText?: string;
  /** The valiation rules that this input has to abide by */
  rules?: Rules;
};

const FormSelectInput = ({
  control,
  name,
  placeholder,
  disabled,
  minDate,
  maxDate,
  dateStringFormat,
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
            <CalendarDateInput
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              minDate={minDate}
              maxDate={maxDate}
              dateStringFormat={dateStringFormat}
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
