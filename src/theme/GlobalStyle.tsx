import { css, Global, useTheme } from "@emotion/react";
import React from "react";

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
          font-family: ${theme.typography.fontFamily};
          font-size: ${theme.typography.fontSize};
        `}
      />
    </React.Fragment>
  );
};
