import React from "react";
import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";

export interface ButtonProps
  extends CustomizableComponent,
    Omit<React.HTMLProps<HTMLButtonElement>, "color" | "size"> {
  size?: "md" | "sm";
  variant?: "fill" | "outline";
}

export const Button = styled("button")<ButtonProps>(
  ({ theme, color = "primary", variant = "fill", size = "md", disabled }) => ({
    ...theme["typography"]["button"],
    border: 0,
    outline: 0,
    borderRadius: 4,
    padding: theme.components.button[size].padding,
    fontSize: theme.components.button[size].fontSize,
    "&:disabled": { opacity: 0.7 },
    ...(size === "sm" ? {} : { minWidth: 120 }),
    ...(variant === "outline"
      ? {
          color: theme["palette"][color]["main"],
          background: "transparent",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme["palette"][color]["main"],
        }
      : {
          color: theme["palette"][color]["contrastText"],
          backgroundColor: theme["palette"][color]["main"],
        }),
    ...(!disabled
      ? {
          cursor: "pointer",
          transitionDuration: "0.125s",
          transitionProperty: "transform",
          transitionTimingFunction: "ease",
          "&:hover": {
            transform: "scale(1.025)",
          },
        }
      : {}),
    ...(color === "error"
      ? {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme["palette"]["error"]["main"],
        }
      : {}),
  })
);
