import styled from "@emotion/styled";
import { CSSProperties } from "react";

const baseCss: CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  width: 0,
  height: 0,
};

export const ArrowUp = styled.div(({ theme }) => ({
  ...baseCss,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: `5px solid ${theme.palette.secondary.main}`,
}));

export const ArrowDown = styled.div(({ theme }) => ({
  ...baseCss,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: `5px solid ${theme.palette.secondary.main}`,
}));

export const ArrowLeft = styled.div(({ theme }) => ({
  ...baseCss,
  borderTop: "5px solid transparent",
  borderBottom: "5px solid transparent",
  borderRight: `5px solid ${theme.palette.secondary.main}`,
}));

export const ArrowRight = styled.div(({ theme }) => ({
  ...baseCss,
  borderTop: "5px solid transparent",
  borderBottom: "5px solid transparent",
  borderLeft: `5px solid ${theme.palette.secondary.main}`,
}));
