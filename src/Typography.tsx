import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Variant } from "./types/theme";

export interface TypographyProps {
  inline?: boolean;
  variant?: Variant;
  color?: CustomizableComponent["color"];
}

export const Typography = styled("span")<TypographyProps>(
  ({ theme, color, variant = "body1", inline }) => ({
    ...theme["typography"][variant],
    ...(["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
      ? { display: "block" }
      : {}),
    ...(inline ? { display: "inline-block" } : {}),
    color: color
      ? theme["palette"][color]["main"]
      : theme["palette"]["text"]["primary"],
  })
);
