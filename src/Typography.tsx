import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Variant } from "./types/theme";

interface TypographyProps extends CustomizableComponent {
  variant?: Variant;
}

export const Typography = styled("span")<TypographyProps>(
  ({ theme, color, variant = "body1" }) => ({
    ...theme["typography"][variant],
    color: color
      ? theme["patelle"][color]["contrastText"]
      : theme["patelle"]["text"]["primary"],
  })
);
