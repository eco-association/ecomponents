import styled from "@emotion/styled";
import React, { HTMLProps } from "react";

import { CustomizableComponent } from "./types/components";

export interface InputProps
  extends CustomizableComponent,
    Omit<HTMLProps<HTMLInputElement>, "color"> {
  error?: boolean;
  append?: React.ReactNode;
}

const BaseInput = styled.input(({ theme }) => ({
  border: 0,
  outline: 0,
  color: "inherit",
  background: "transparent",
  "&::placeholder": {
    color: theme.palette.disabled.main,
  },
}));

const Label = styled.div(({ theme }) => ({
  ...theme.typography.body3,
  position: "absolute",
  top: 0,
  left: 10,
  fontSize: 12,
  lineHeight: 1,
  borderRadius: 4,
  padding: "2px 4px",
  transform: "translate(0, -60%)",
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
}));

const InputContainer = styled.div<Pick<InputProps, "color" | "error">>(
  ({ theme, error, color = "primary" }) => ({
    height: 44,
    gridGap: 4,
    borderWidth: 1,
    borderRadius: 4,
    display: "grid",
    position: "relative",
    padding: "6px 12px",
    alignItems: "stretch",
    borderStyle: "solid",
    gridTemplateColumns: "1fr auto",
    borderColor: theme.palette[color].main,
    backgroundColor: theme.palette.background.default,
    ...(error
      ? {
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
        }
      : {}),
  })
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ append, color, label, as, ...props }, ref) => {
    return (
      <InputContainer color={color}>
        {label ? <Label>{label}</Label> : null}
        <BaseInput ref={ref} {...props} />
        {append}
      </InputContainer>
    );
  }
);
