import React from "react";
import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Theme, Variant } from "./types/theme";

type SpecialColor = "textPrimary" | "white" | "black";

export interface TypographyProps
  extends Omit<
    React.HTMLProps<HTMLLinkElement | HTMLSpanElement | HTMLHeadingElement>,
    "as" | "ref"
  > {
  as?: React.ElementType<any>;
  link?: boolean;
  inline?: boolean;
  variant?: Variant;
  color?: CustomizableComponent["color"] | SpecialColor;
}

const createCustomColors = (theme: Theme): Record<SpecialColor, string> => ({
  textPrimary: theme.palette.text.primary,
  white: theme.palette.common.light,
  black: theme.palette.common.dark,
});

const TypographyStyled = styled("span")<TypographyProps>(
  ({ theme, color = "textPrimary", variant = "body1", link, inline }) => {
    const customColors = createCustomColors(theme);
    const specialColors = Object.keys(customColors);
    return {
      ...theme["typography"][variant],
      ...(["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
        ? { display: "block" }
        : {}),
      ...(inline ? { display: "inline-block" } : {}),
      ...(link
        ? {
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }
        : {}),
      color: specialColors.includes(color)
        ? customColors[color as SpecialColor]
        : theme["palette"][(color as CustomizableComponent["color"])!]["main"],
    };
  }
);

export const Typography = React.forwardRef<
  HTMLSpanElement,
  React.PropsWithChildren<TypographyProps>
>((props, ref) => {
  const as = props.link ? "a" : undefined;
  return <TypographyStyled as={as} ref={ref} {...props} />;
});
