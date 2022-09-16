import React from "react";
import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Typography } from "./Typography";
import { Grid } from "./Grid";

interface AlertProps extends CustomizableComponent {
  title?: string;
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
  borderColor: theme.palette[color].main,
  backgroundColor: theme.palette[color].bg,
}));

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<AlertProps>
>((props, ref) => {
  const { button, color, title, children } = props;
  const text = (
    <React.Fragment>
      {title ? (
        <Typography color={color} variant="h5">
          {title}
        </Typography>
      ) : null}
      {children}
    </React.Fragment>
  );

  if (button) {
    return (
      <AlertStyled ref={ref} {...props}>
        <Grid columns="auto auto" gridGap="16px" alignItems="center">
          <Grid.Item>{text}</Grid.Item>
          <Grid.Item>{button}</Grid.Item>
        </Grid>
      </AlertStyled>
    );
  }

  return (
    <AlertStyled ref={ref} {...props}>
      {text}
    </AlertStyled>
  );
});
