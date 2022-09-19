import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface ArrowProps {
  disable?: boolean;
}

const baseCss: CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  width: 0,
  height: 0,
};

export const ArrowUp = styled.div<ArrowProps>(({ theme, disable }) => ({
  ...baseCss,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: `5px solid ${
    disable ? theme.palette.disabled.main : theme.palette.secondary.main
  }`,
}));

export const ArrowDown = styled.div<ArrowProps>(({ theme, disable }) => ({
  ...baseCss,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: `5px solid ${
    disable ? theme.palette.disabled.main : theme.palette.secondary.main
  }`,
}));

export const ArrowLeft = styled.div<ArrowProps>(({ theme, disable }) => ({
  ...baseCss,
  borderTop: "5px solid transparent",
  borderBottom: "5px solid transparent",
  borderRight: `5px solid ${
    disable ? theme.palette.disabled.main : theme.palette.secondary.main
  }`,
}));

export const ArrowRight = styled.div<ArrowProps>(({ theme, disable }) => ({
  ...baseCss,
  borderTop: "5px solid transparent",
  borderBottom: "5px solid transparent",
  borderLeft: `5px solid ${
    disable ? theme.palette.disabled.main : theme.palette.secondary.main
  }`,
}));
