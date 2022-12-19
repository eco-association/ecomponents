import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useTheme } from "./hooks";
import { ButtonProps } from "./Button";
import { cloneElement } from "./utils/jsxClone";

const Container = styled.div({ display: "inline-block" });

const groupedButton = css({
  padding: "4px 8px",
  minWidth: "initial",
  "&:hover": {
    transform: "none",
    backgroundColor: "var(--btnHoverColor)",
  },
});

const leftButton = css({ borderRadius: "4px 0 0 4px" });
const centerButton = css({ borderLeft: 0, borderRadius: "0 0 0 0" });
const rightButton = css({ borderLeft: 0, borderRadius: "0 4px 4px 0" });

function getButtonClass(index: number, count: number) {
  if (index + 1 === count) return rightButton;
  if (index === 0) return leftButton;
  return centerButton;
}

export const ButtonGroup: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const theme = useTheme();
  const count = React.Children.count(children);
  return (
    <Container>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const css = getButtonClass(index, count);
        const { color = "primary" } = child.props as ButtonProps;
        const style = {
          "--btnHoverColor": theme.palette[color]?.bg,
        };
        return cloneElement(child, {
          css: [groupedButton, css],
          style,
        });
      })}
    </Container>
  );
};
