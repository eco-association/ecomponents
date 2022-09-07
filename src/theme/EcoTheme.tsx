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
  patelle: {
    primary: {
      main: "#6F8EFF",
      contrastText: "#000000CC",
    },
    secondary: {
      main: "#5AE4BF",
      contrastText: "#22313A",
    },
    success: {
      main: "#5AE4BF",
      contrastText: "#0B331B",
      bg: "#5AE4BF7F",
    },
    info: {
      main: "#6F8EFF",
      contrastText: "#22313A",
    },
    warning: {
      main: "",
      contrastText: "",
    },
    error: {
      main: "#DA1E28",
      contrastText: "#510408",
      bg: "#DA1E287F",
    },
    common: {
      light: "#FFFFFF",
      dark: "#000000",
    },
    text: {
      primary: "#22313A",
      secondary: Gray.med,
      disabled: Gray.medlight,
    },
    background: {
      default: "",
      paper: "",
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
