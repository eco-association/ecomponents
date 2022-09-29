import React from "react";
import styled from "@emotion/styled";

import { ArrowDown } from "./Arrows";
import { cloneElement } from "./utils/jsxClone";

interface DropdownProps {
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div({
  position: "absolute",
  right: 20,
  top: "25%",
  padding: "1rem",
  overflow: "hidden",
  textAlign: "right",
  transition: "height 500ms ease",
  "&:hover": {
    cursor: "pointer",
  },
});

export const Dropdown = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<DropdownProps>
>((props, ref) => {
  const { children, open, setOpen } = props;
  return (
    <Container as="ul" ref={ref} {...props}>
      <ArrowDown onClick={() => setOpen(!open)} />
      {open &&
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          return cloneElement(child, {});
        })}
    </Container>
  );
});

Dropdown.displayName = "Dropdown";
