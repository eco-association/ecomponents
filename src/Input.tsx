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

const InputContainer = styled.div<Pick<InputProps, "color" | "error">>(
  ({ theme, error, color = "primary" }) => ({
    height: 44,
    gridGap: 4,
    borderWidth: 1,
    borderRadius: 4,
    display: "grid",
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
  ({ append, color, as, ...props }, ref) => {
    return (
      <InputContainer color={color}>
        <BaseInput ref={ref} {...props} />
        {append}
      </InputContainer>
    );
  }
);
