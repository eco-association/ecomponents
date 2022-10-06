import React, { useRef } from "react";
import styled from "@emotion/styled";
import { ArrowDown } from "./Arrows";

interface DropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, "as"> {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div({ cursor: "pointer" });

const DropdownMenu = styled.div<{ top: number; right: number }>(
  ({ top, right }) => ({
    position: "absolute",
    top,
    right,
  })
);

export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({
  children,
  open,
  setOpen,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { innerWidth = 0 } = window || {};
  const {
    offsetTop = 0,
    offsetLeft = 0,
    offsetWidth = 0,
    offsetHeight = 0,
  } = ref.current || {};

  return (
    <Container as="ul" ref={ref} {...props}>
      <ArrowDown onClick={() => setOpen(!open)} />
      {open && (
        <DropdownMenu
          top={offsetTop + offsetHeight}
          right={innerWidth - offsetLeft - offsetWidth}
        >
          {children}
        </DropdownMenu>
      )}
    </Container>
  );
};

Dropdown.displayName = "Dropdown";
