import React from "react";
import { css, Global, useTheme } from "@emotion/react";
import { gridStyle } from "./styles/gridStyle";

const InterFontCss = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
`;

export const GlobalStyle = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Global styles={InterFontCss} />
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: ${theme.typography.fontFamily};
            font-size: ${theme.typography.fontSize}px;
            background-color: ${theme.palette.background.default};
          }
          hr {
            width: 100%;
            border: 0;
            margin: 0;
            border-top: 1px solid #c7d9e4;
          }
          ${gridStyle}
        `}
      />
    </React.Fragment>
  );
};
