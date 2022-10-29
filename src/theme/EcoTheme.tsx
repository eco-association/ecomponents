import React from "react";
import { Theme, ThemeProvider } from "@emotion/react";
import merge from "lodash.merge";
import { Gray } from "../colors";
import { createTypography } from "./utils/createTypography";
import { GlobalStyle } from "./GlobalStyle";
import { CustomEcoTheme } from "../types";

interface EcoThemeProps {
  theme?: CustomEcoTheme;
}

const rootTheme: Theme = {
  palette: {
    primary: {
      main: "#04128b",
      contrastText: "#000000CC",
      bg: "#04128b0d",
      bgDark: "#04128b33",
    },
    secondary: {
      main: Gray.med,
      contrastText: "#22313A",
      bg: Gray.bg,
      bgDark: Gray.light,
    },
    success: {
      main: "#5AE4BF",
      contrastText: "#22313A",
      bg: "#5ae4bf0d",
      bgDark: "#5ae4bf33",
    },
    info: {
      main: "#6F8EFF",
      contrastText: "#22313A",
      bg: "#6F8EFF0C",
      bgDark: "#6F8EFF33",
    },
    error: {
      main: "#DA1E28",
      contrastText: "#22313A",
      bg: "#DA1E280D",
      bgDark: "#DA1E2833",
    },
    active: {
      main: "#47b699",
      contrastText: "#22313A",
      bg: "#47b6990D",
      bgDark: "#47b69933",
    },
    disabled: {
      main: Gray.medlight,
      contrastText: Gray.medlight,
      bg: Gray.light,
      bgDark: Gray.light,
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
  components: {
    card: {
      borderColor: Gray.medlight,
      borderRadius: 14,
    },
    button: {
      md: {
        fontSize: 15,
        padding: "10px 24px",
      },
      sm: {
        fontSize: 13,
        padding: "8px 16px",
      },
    },
    alert: {
      fontSize: 15,
      borderColor: "#DCE9F0",
    },
  },
  typography: createTypography(),
};

export const EcoTheme: React.FC<React.PropsWithChildren<EcoThemeProps>> = ({
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
