import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

import { Column } from "./Column";
import { Row } from "./Row";
import { Color } from "./types";
import { Typography } from "./Typography";

type Position = "left" | "right";

interface ProgressBarProps {
  fullWidth?: boolean;
  text?: string;
  textColor?: Color;
  textRight?: boolean;
  color: Color | Color[];
  percentage: number | number[];
  position?: Position | Position[];
  label: React.ReactNode | React.ReactNode[];
  BarContainerProps?: Omit<React.HTMLProps<HTMLDivElement>, "as">;
  BarStyle?: CSSProperties | CSSProperties[];
  LabelsStyle?: CSSProperties;
}

type BarProps = React.PropsWithChildren<{
  color: Color;
  percentage: number;
}>;

const StyledRow = styled(Column)({
  [`@media screen and (min-width: 576px)`]: {
    flexDirection: "row",
    justifyContent: "space-between",

    "div:nth-child(2) div:nth-child(2)": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
});

const BarContainer = styled.div<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  width: "100%",

  "&:first-of-type": {
    marginBottom: "24px",
  },

  [`@media screen and (min-width: 576px)`]: {
    width: fullWidth ? "100%" : "50%",
    "&:first-of-type": {
      marginBottom: 0,
    },
  },
}));

const BarsContainer = styled.div<Pick<ProgressBarProps, "position">>(({ position }) => ({
  position: "relative",
  width: "100%",
  height: 5,
  borderRadius: 25,
  overflow: "visible",
  marginBottom: 8,
  background: "linear-gradient(0deg, #EFF8FE 0%, #DEE6EB 100%)",

  [`@media screen and (min-width: 576px)`]: {
    ...(position === "right"
      ? { borderRadius: "0 25px 25px 0" }
      : { borderRadius: "25px 0 0 25px" }),
  },
}));

const Bar = styled.div<BarProps & Pick<ProgressBarProps, "position">>(
  ({ theme, position, percentage, color }) => ({
    position: "absolute",
    height: "100%",
    width: `${percentage * 100}%`,
    borderRadius: 25,
    backgroundColor: theme.palette[color].main,

    [`@media screen and (min-width: 576px)`]: {
      ...(position === "right" ? { right: 0 } : { left: 0 }),
    },
  })
);

const SquareColor = styled.div<Pick<BarProps, "color">>(({ theme, color }) => ({
  backgroundColor: theme.palette[color].main,
  borderRadius: 2,
  width: 16,
  minWidth: 16,
  height: 16,
}));

const BarTextContainer = styled.div<{ right?: boolean }>(({ theme, right }) => ({
  padding: 2,
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  backgroundColor: theme.palette.background.default,
  zIndex: 1,
  ...(right ? { right: 30 } : { left: 24 }),
}));

interface BarTextProps {
  text: ProgressBarProps["text"];
  color: ProgressBarProps["textColor"];
  right: ProgressBarProps["textRight"];
}

const BarText = ({ text, color, right }: BarTextProps) => {
  if (!text) return null;
  return (
    <BarTextContainer right={right}>
      <Typography color={color} variant='body3' css={css({ lineHeight: 2 })}>
        {text}
      </Typography>
    </BarTextContainer>
  );
};

export const ProgressBar = ({
  fullWidth,
  text: rawTexts,
  textColor,
  textRight,
  position,
  label: rawLabels,
  color: rawColors,
  percentage: rawPercentages,
  BarContainerProps,
  BarStyle,
}: ProgressBarProps) => {
  const labels: React.ReactNode[] = Array.isArray(rawLabels) ? rawLabels : [rawLabels];
  const texts = Array.isArray(rawTexts) ? rawTexts : [rawTexts];
  const colors = Array.isArray(rawColors) ? rawColors : [rawColors];
  const percentages = Array.isArray(rawPercentages) ? rawPercentages : [rawPercentages];

  if (colors.length !== percentages.length) throw new Error("Mismatched number of bars");

  const bars = colors.map((color, index) => ({
    color,
    text: texts[index],
    label: labels[index],
    percentage: Math.min(1, percentages[index]),
    position: Array.isArray(position) ? position[index] : position,
    style: Array.isArray(BarStyle) ? BarStyle[index] : BarStyle,
  }));

  return (
    <StyledRow>
      {bars.map((bar, key) => {
        const children = [
          <SquareColor color={bar.color} />,
          <Typography variant='body3' color='secondary'>
            {bar.label}
          </Typography>,
        ];

        if (position === "right") children.reverse();

        return (
          <BarContainer fullWidth={fullWidth} key={key}>
            <BarsContainer position={bar.position} {...BarContainerProps}>
              <BarText text={bar.text} color={textColor} right={textRight} />

              <Bar key={key} {...bar} />
            </BarsContainer>

            <div>
              <Row key={key} gap='sm' items='center'>
                {children}
              </Row>
            </div>
          </BarContainer>
        );
      })}
    </StyledRow>
  );
};
