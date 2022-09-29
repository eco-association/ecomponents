import styled from "@emotion/styled";
import { Gray } from "./colors";

interface CardProps {
  disable?: boolean;
  color?: "default" | "paper";
}

export const Card = styled("div")<CardProps>(
  ({ theme, color = "default", disable = false }) => ({
    padding: 24,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: theme.components.card.borderRadius,
    borderColor: theme.components.card.borderColor,
    backgroundColor: theme.palette.background[color],
    ...(disable
      ? { cursor: "pointer", userSelect: "none", backgroundColor: "#FAFBFC" }
      : {}),
  })
);
