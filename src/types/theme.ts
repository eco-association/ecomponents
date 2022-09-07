import React, {CSSProperties} from "react";

export interface TypeBackground {
    default: string;
    paper: string;
}

export interface PaletteColorOptions {
    main: string;
    bg?: string;
    contrastText?: string;
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
    | "caption"
    | "button"
    | "overline";
export type Color = "primary" | "secondary" | "error" | "warning" | "info" | "success";

export interface FontStyle
    extends Required<{
        fontFamily: React.CSSProperties["fontFamily"];
        fontSize: number;
        fontWeightLight: React.CSSProperties["fontWeight"];
        fontWeightRegular: React.CSSProperties["fontWeight"];
        fontWeightMedium: React.CSSProperties["fontWeight"];
        fontWeightBold: React.CSSProperties["fontWeight"];
        htmlFontSize: number;
    }> {
}

export interface TypographyOptions
    extends Partial<Record<Variant, CSSProperties> & Partial<FontStyle>> {
}

export interface TypographyUtils {
    pxToRem: (px: number) => string;
}

export type Typography = Record<Variant, CSSProperties> &
    FontStyle &
    TypographyUtils;

export interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
}

export interface Palette {
    primary: PaletteColorOptions;
    secondary: PaletteColorOptions;
    error: PaletteColorOptions;
    warning: PaletteColorOptions;
    info: PaletteColorOptions;
    success: PaletteColorOptions;
    text: TypeText;
    background: TypeBackground;
    common: {
        light: string;
        dark: string;
    };
}
