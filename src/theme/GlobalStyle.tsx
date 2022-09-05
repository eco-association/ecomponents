import { css, Global } from "@emotion/react";

const InterFontCss = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
`;

export const GlobalStyle = () => {
  return <Global styles={InterFontCss} />;
};
