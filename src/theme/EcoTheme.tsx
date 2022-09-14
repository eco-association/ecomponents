import React from "react";
import { Theme, ThemeProvider } from "@emotion/react";
import merge from "lodash.merge";
import { Gray } from "../colors";
import { createTypography } from "./utils/createTypography";
import { GlobalStyle } from "./GlobalStyle";
import { PaletteColorOptions, TypeBackground, TypeText } from "../types/theme";

export interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  common?: {
    light: string;
    dark: string;
  };
  text?: Partial<TypeText>;
  background?: Partial<TypeBackground>;
}

interface EcoThemeOption {
  palette?: PaletteOptions;
}

interface EcoThemeProps {
  theme?: EcoThemeOption;
}

const rootTheme: Theme = {
  palette: {
    primary: {
      main: "#04128b",
      contrastText: "#000000CC",
      bg: "#04128b0d",
    },
    secondary: {
      main: Gray.med,
      contrastText: "#22313A",
      bg: Gray.bg,
    },
    success: {
      main: "#5AE4BF",
      contrastText: "#22313A",
      bg: "#5ae4bf0d",
    },
    info: {
      main: "#6F8EFF",
      contrastText: "#22313A",
      bg: "#6F8EFF0C",
    },
    error: {
      main: "#DA1E28",
      contrastText: "#22313A",
      bg: "#DA1E280D",
    },
    disabled: {
      main: Gray.medlight,
      contrastText: Gray.medlight,
      bg: Gray.light,
    },
    common: {
      light: "#FFFFFF",
      dark: "#000000",
    },
    text: {
      primary: "#22313A",
      active: "#0624E0",
    },
    background: {
      default: "#FFFFFF",
      paper: Gray.bg,
      light: Gray.light,
    },
  },
  typography: createTypography(),
};

export const EcoTheme: React.FC<EcoThemeProps> = ({
  theme: customTheme,
  children,
}) => {
  const theme: Theme = merge(rootTheme, customTheme || {});
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
