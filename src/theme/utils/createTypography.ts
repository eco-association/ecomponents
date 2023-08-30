import React from "react";
import { Typography, TypographyOptions } from "../../types/theme";

const defaultFontFamily = "'Inter', sans-serif";

export function createTypography(typography?: TypographyOptions): Typography {
  const {
    fontFamily = defaultFontFamily,
    fontSize = 15,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 600,
    fontWeightBold = 700,
  } = typography || {};

  const pxToRem = (size: number) =>
    `${size / parseInt(fontSize.toString())}rem`;
  const buildVariant = (
    fontWeight: React.CSSProperties["fontWeight"],
    size: number
  ) => ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
  });

  const variants = {
    h1: buildVariant(fontWeightBold, 32),
    h2: buildVariant(fontWeightBold, 24),
    h3: buildVariant(fontWeightBold, 20),
    h4: buildVariant(fontWeightBold, 18),
    h5: buildVariant(fontWeightBold, 15),
    h6: buildVariant(fontWeightBold, 11),
    subtitle1: buildVariant(fontWeightRegular, 16),
    subtitle2: buildVariant(fontWeightMedium, 14),
    body1: buildVariant(fontWeightRegular, 15),
    body2: buildVariant(fontWeightRegular, 13),
    body3: buildVariant(fontWeightRegular, 11),
    button: buildVariant(fontWeightMedium, 15),
    caption: buildVariant(fontWeightRegular, 12),
    overline: buildVariant(fontWeightRegular, 12),
  };

  return {
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    ...variants,
  };
}
