import React from "react";
import { Controller, ValidationRule } from "react-hook-form";
import { Column } from "../Column";
import { Input, InputProps } from "../Input";
import { Typography } from "../Typography";
import { UseControllerProps } from "react-hook-form/dist/types/controller";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import styled from "@emotion/styled";
import { Color } from "../types";

type Rules = {
  required?: boolean | ValidationRule<boolean>;
  min?: number | ValidationRule<number>;
  max?: number | ValidationRule<number>;
  minLength?: number | ValidationRule<number>;
  maxLength?: number | ValidationRule<number>;
  pattern?: RegExp | ValidationRule<RegExp>;
  validate?: RegisterOptions["validate"];
};

type FormTextInputProps = Omit<
  InputProps,
  "value" | "onChange" | "onBlur" | "label" | "ref"
> & {
  control: any;
  name: string;
  label: React.ReactNode;
  note?: React.ReactNode;
  noteColor?: Color;
  type?: "address" | "text" | "password" | "email" | "number";
  rules?: Rules;
};

const Note = styled.div<Pick<FormTextInputProps, "color">>(
  ({ theme, color = "primary" }) => ({
    padding: 8,
    fontSize: 13,
    borderRadius: "0 0 4px 4px",
    backgroundColor: theme.palette[color].bgDark,
  })
);

function configureProps(
  props: FormTextInputProps
): Omit<FormTextInputProps, "rules"> & { rules: UseControllerProps["rules"] } {
  let { rules = {}, type, label, name } = props;

  if (rules.required === true) {
    rules = {
      ...rules,
      required: {
        value: true,
        message: `${label || name} is required`,
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

  if (type === "address") {
    props = { ...props, type: "text" };
    rules = {
      ...rules,
      pattern: {
        value: /^0x[a-fA-F0-9]{40}$/,
        message: "Not a valid ETH address",
      },
    };
  }

  return { ...props, rules };
}

export const FormTextField = (originalProps: FormTextInputProps) => {
  const { rules, control, name, label, note, noteColor, ...props } =
    configureProps(originalProps);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: fieldProps, fieldState: { error } }) => {
        const input = (
          <Input {...props} {...fieldProps} error={!!error || props.error} />
        );

        const content = note ? (
          <div>
            {input}
            <Note color={noteColor || props.color}>{note}</Note>
          </div>
        ) : (
          input
        );

        return (
          <Column gap="sm">
            <Typography color={props.color}>{label}</Typography>
            {content}
            {!!error ? (
              <Typography color="error" variant="h6">
                {error.message}
              </Typography>
            ) : null}
          </Column>
        );
      }}
    />
  );
};
