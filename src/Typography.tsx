import React from "react";
import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Theme, Variant } from "./types/theme";

type SpecialColor = "textPrimary" | "white" | "black";

export interface TypographyProps
  extends Omit<
    React.HTMLProps<HTMLLinkElement | HTMLSpanElement | HTMLHeadingElement>,
    "as"
  > {
  inline?: boolean;
  variant?: Variant;
  color?: CustomizableComponent["color"] | SpecialColor;
}

const createCustomColors = (theme: Theme): Record<SpecialColor, string> => ({
  textPrimary: theme.palette.text.primary,
  white: theme.palette.common.light,
  black: theme.palette.common.dark,
});

export const Typography = styled("span")<TypographyProps>(
  ({ theme, color = "textPrimary", variant = "body1", inline }) => {
    const customColors = createCustomColors(theme);
    const specialColors = Object.keys(customColors);
    return {
      ...theme["typography"][variant],
      ...(["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
        ? { display: "block" }
        : {}),
      ...(inline ? { display: "inline-block" } : {}),
      color: specialColors.includes(color)
        ? customColors[color as SpecialColor]
        : theme["palette"][(color as CustomizableComponent["color"])!]["main"],
    };
  }
);
