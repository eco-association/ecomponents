import styled from "@emotion/styled";
import { Gray } from "./colors";

interface CardProps {
  color: "default" | "paper";
}

export const Card = styled("button")<CardProps>(
  ({ theme, color = "default" }) => ({
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Gray.medlight,
    padding: "40px 30px",
    backgroundColor: theme["patelle"]["background"][color],
  })
);
