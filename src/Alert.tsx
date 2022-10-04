import React from "react";
import styled from "@emotion/styled";
import { CustomizableComponent } from "./types/components";
import { Typography } from "./Typography";
import { Grid } from "./Grid";
import { Column } from "./Column";

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
  fontSize: theme.components.alert.fontSize,
  color: theme.palette.secondary.main,
  "& span": {
    fontSize: theme.components.alert.fontSize,
    lineHeight: "18px",
  },
  ...(color === "transparent"
    ? {
        borderColor: theme.components.alert.borderColor,
      }
    : {
        backgroundColor: theme.palette[color].bg,
        borderColor:
          color === "disabled" ? undefined : theme.palette[color].main,
      }),
}));

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<AlertProps>
>(({ title, ...props }, ref) => {
  const { button, color, children } = props;
  const text = (
    <Column gap="sm">
      <div>
        {!!title ? (
          React.isValidElement(title) ? (
            title
          ) : (
            <Typography
              color={color === "transparent" ? undefined : color}
              variant="h5"
            >
              {title}
            </Typography>
          )
        ) : null}
      </div>
      <div>{children}</div>
    </Column>
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
