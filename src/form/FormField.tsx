import React from "react";
import { Form, FormItemProps } from "antd";

import { Color } from "../types";
import { Column } from "../Column";
import { Typography, TypographyProps } from "../Typography";

type FormFieldBody = {
  color?: Color;
  label?: React.ReactNode;
  LabelProps?: TypographyProps;
};

export type FormFieldProps = FormItemProps & FormFieldBody;

export const FormField = ({
  color,
  label,
  children,
  LabelProps,
  ...formItemProps
}: FormFieldProps) => {
  return (
    <Form.Item {...formItemProps}>
      <Column gap="sm">
        {label ? (
          <Typography color={color} variant="subtitle1" {...LabelProps}>
            {label}
          </Typography>
        ) : null}
        {children}
      </Column>
    </Form.Item>
  );
};
