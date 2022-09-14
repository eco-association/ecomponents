import styled from "@emotion/styled";
import React from "react";
import { Typography, TypographyProps } from "./Typography";

interface MenuItemProps extends TypographyProps {
  active?: boolean;
}

const MenuItemStyled = styled(Typography)<MenuItemProps>(
  ({ theme, active }) => ({
    textDecoration: "none",
    cursor: "pointer",
    ...(active
      ? {
          color: theme["palette"]["text"]["active"],
          fontWeight: theme["typography"]["fontWeightBold"],
        }
      : {}),
  })
);

export const MenuItem = React.forwardRef<HTMLLinkElement, MenuItemProps>(
  (props, ref) => {
    const { children } = props;
    return (
      <MenuItemStyled as="a" ref={ref} {...props}>
        {children}
      </MenuItemStyled>
    );
  }
);
