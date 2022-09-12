import styled from "@emotion/styled";
import { Gray } from "./colors";

interface CardProps {
  active?: boolean;
  color?: "default" | "paper";
}

export const Card = styled("div")<CardProps>(
  ({ theme, color = "default", active = false }) => ({
    padding: 24,
    borderWidth: 1,
    borderRadius: 14,
    borderStyle: "solid",
    backgroundColor: theme.palette.background[color],
    borderColor: active ? theme.palette.text.active : Gray.medlight,
  })
);
