import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React, { forwardRef, Ref, useRef } from "react";

import { ArrowDown, ArrowUp } from "./Arrows";

interface DropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, "as"> {
  children: React.ReactNode;
  open: boolean;
  showCaret?: boolean;
  menuStyle?: SerializedStyles;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div({ cursor: "pointer" });

const DropdownMenu = styled.div<{ top: number; right: number }>(({ top, right }) => ({
  position: "absolute",
  top,
  right,
}));

export const Dropdown = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<DropdownProps>
>(
  (
    { children, open, showCaret = true, setOpen, menuStyle, ...props },
    ref: Ref<HTMLDivElement>
  ) => {
    const { innerWidth = 0 } = window || {};
    const {
      offsetTop = 0,
      offsetLeft = 0,
      offsetWidth = 0,
      offsetHeight = 0,
    } = (ref as React.RefObject<HTMLDivElement>)?.current || {};
    console.log("SHOE", { showCaret, open });
    return (
      <Container as='ul' ref={ref} {...props}>
        {showCaret &&
          (open ? (
            <ArrowUp onClick={() => setOpen(!open)} />
          ) : (
            <ArrowDown onClick={() => setOpen(!open)} />
          ))}

        {open && (
          <DropdownMenu
            top={offsetTop + offsetHeight}
            right={innerWidth - offsetLeft - offsetWidth}
            css={css({ ...menuStyle })}>
            {children}
          </DropdownMenu>
        )}
      </Container>
    );
  }
);

Dropdown.displayName = "Dropdown";
