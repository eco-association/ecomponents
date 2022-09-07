import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";

interface ButtonProps extends CustomizableComponent {}

export const Button = styled("button")<ButtonProps>(({ theme, color }) => ({
  ...theme["typography"]["button"],
  minWidth: 120,
  borderRadius: 4,
  border: 0,
  padding: "10px 24px",
  color: theme["patelle"][color || "primary"]["contrastText"],
  backgroundColor: theme["patelle"][color || "primary"]["main"],
  ...(color === "error"
    ? {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme["patelle"]["error"]["main"],
      }
    : {}),
}));
