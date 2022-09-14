import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { HTMLProps } from "react";

export interface ButtonProps
  extends CustomizableComponent,
    HTMLProps<HTMLButtonElement> {
  variant?: "fill" | "outline";
  color?: CustomizableComponent["color"];
}

export const Button = styled("button")<ButtonProps>(
  ({ theme, color = "primary", variant = "fill", disabled }) => ({
    ...theme["typography"]["button"],
    border: 0,
    outline: 0,
    minWidth: 120,
    borderRadius: 4,
    padding: "10px 24px",
    "&:disabled": { opacity: 0.7 },
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
