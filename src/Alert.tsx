import styled from "@emotion/styled";
import React from "react";

import { Column } from "./Column";
import { Grid } from "./Grid";
import { CustomizableComponent } from "./types/components";
import { Typography } from "./Typography";

interface AlertProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "color" | "title" | "as"> {
  color?: CustomizableComponent["color"] | "transparent";
  title?: React.ReactNode;
  button?: React.ReactNode;
}

const AlertStyled = styled("div")<AlertProps>(({ theme, color = "info" }) => ({
  ...theme["typography"]["body1"],
  padding: 16,
  borderWidth: 1,
  borderRadius: 6,
  lineHeight: "18px",
  borderStyle: "solid",
  letterSpacing: "-0.005em",
  color: theme.palette.secondary.main,
  ...(color === "transparent"
    ? {
        borderColor: theme.components.alert.borderColor,
      }
    : {
        backgroundColor: theme.palette[color].bg,
        borderColor: color === "disabled" ? undefined : theme.palette[color].main,
      }),
}));

const SGrid = styled.div`
  display: grid;
  grid-gap: 16px;

  @media screen and (min-width: 576px) {
    align-items: center;
    grid-template-columns: auto auto;
  }
`;

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<AlertProps>
>(({ title, ...props }, ref) => {
  const { button, color, children } = props;
  const text = !!title ? (
    <Column gap='sm'>
      <div>
        {React.isValidElement(title) ? (
          title
        ) : (
          <Typography color={color === "transparent" ? undefined : color} variant='h5'>
            {title}
          </Typography>
        )}
      </div>
      <div>{children}</div>
    </Column>
  ) : (
    children
  );
  if (button) {
    return (
      <AlertStyled ref={ref} {...props}>
        <SGrid>
          <Grid.Item>{text}</Grid.Item>
          <Grid.Item>{button}</Grid.Item>
        </SGrid>
      </AlertStyled>
    );
  }

  return (
    <AlertStyled ref={ref} {...props}>
      {text}
    </AlertStyled>
  );
});
