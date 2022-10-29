import { CSSProperties } from "react";

interface TypeBackground {
  default: string;
  paper: string;
  light: string;
}

interface PaletteColorOptions {
  main: string;
  bg: string;
  bgDark: string;
  contrastText: string;
}

export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "body3"
  | "caption"
  | "button"
  | "overline";

export type Color =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "active"
  | "disabled"
  | "success";

export interface FontStyle
  extends Required<{
    fontFamily: CSSProperties["fontFamily"];
    fontSize: CSSProperties["fontSize"];
    fontWeightLight: CSSProperties["fontWeight"];
    fontWeightRegular: CSSProperties["fontWeight"];
    fontWeightMedium: CSSProperties["fontWeight"];
    fontWeightBold: CSSProperties["fontWeight"];
  }> {}

export interface TypographyOptions
  extends Partial<Record<Variant, CSSProperties> & Partial<FontStyle>> {}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export type Typography = Record<Variant, CSSProperties> &
  FontStyle &
  TypographyUtils;

export interface TypeText {
  primary: string;
  active: string;
}

interface CardOptions {
  borderColor: CSSProperties["borderColor"];
  borderRadius: CSSProperties["borderRadius"];
}

interface ButtonOptions {
  fontSize: CSSProperties["fontSize"];
  padding: CSSProperties["padding"];
}

interface ButtonStyles {
  md: ButtonOptions;
  sm: ButtonOptions;
}

interface AlertStyles {
  borderColor: CSSProperties["borderColor"];
  fontSize: CSSProperties["fontSize"];
}

interface DialogStyles {
  content?: CSSProperties;
  overlay?: CSSProperties;
}

export interface ComponentsStyles {
  card: CardOptions;
  button: ButtonStyles;
  alert: AlertStyles;
  dialog?: DialogStyles;
}

export interface Palette extends Record<Color, PaletteColorOptions> {
  text: TypeText;
  background: TypeBackground;
  common: {
    light: string;
    dark: string;
  };
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  components: ComponentsStyles;
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type CustomEcoTheme = RecursivePartial<Theme>;
