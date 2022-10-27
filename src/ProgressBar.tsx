import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "./types";
import { Row } from "./Row";
import { Column } from "./Column";
import { Typography } from "./Typography";
import React, { CSSProperties } from "react";

type Position = "left" | "right";

interface ProgressBarProps {
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

const BarsContainer = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 5,
  borderRadius: 25,
  backgroundColor: theme.palette.background.light,
}));

const Bar = styled.div<BarProps & Pick<ProgressBarProps, "position">>(
  ({ theme, position, percentage, color }) => ({
    position: "absolute",
    height: "100%",
    width: `${percentage * 100}%`,
    backgroundColor: theme.palette[color].main,
    ...(position === "right" ? { right: 0 } : { left: 0 }),
  })
);

const SquareColor = styled.div<Pick<BarProps, "color">>(({ theme, color }) => ({
  backgroundColor: theme.palette[color].main,
  borderRadius: 2,
  width: 16,
  height: 16,
}));

const Labels = styled(Row)({ flexWrap: "wrap" });

const BarTextContainer = styled.div<{ right?: boolean }>(
  ({ theme, right }) => ({
    padding: 2,
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    backgroundColor: theme.palette.background.default,
    zIndex: 1,
    ...(right ? { right: 30 } : { left: 24 }),
  })
);

interface BarTextProps {
  text: ProgressBarProps["text"];
  color: ProgressBarProps["textColor"];
  right: ProgressBarProps["textRight"];
}

const BarText = ({ text, color, right }: BarTextProps) => {
  if (!text) return null;
  return (
    <BarTextContainer right={right}>
      <Typography color={color} variant="body3" css={css({ lineHeight: 2 })}>
        {text}
      </Typography>
    </BarTextContainer>
  );
};

export const ProgressBar = ({
  text,
  textColor,
  textRight,
  position,
  label: rawLabels,
  color: rawColors,
  percentage: rawPercentages,
  BarContainerProps,
  BarStyle,
  LabelsStyle,
}: ProgressBarProps) => {
  const labels: React.ReactNode[] = Array.isArray(rawLabels)
    ? rawLabels
    : [rawLabels];
  const colors = Array.isArray(rawColors) ? rawColors : [rawColors];
  const percentages = Array.isArray(rawPercentages)
    ? rawPercentages
    : [rawPercentages];

  if (colors.length !== percentages.length)
    throw new Error("Mismatched number of bars");

  const bars = colors.map((color, index) => ({
    color,
    label: labels[index],
    percentage: Math.min(1, percentages[index]),
    position: Array.isArray(position) ? position[index] : position,
    style: Array.isArray(BarStyle) ? BarStyle[index] : BarStyle,
  }));

  const barsSorted = [...bars].sort((a, b) =>
    b.percentage === a.percentage ? -1 : b.percentage - a.percentage
  );

  return (
    <Column gap={12}>
      <BarsContainer {...BarContainerProps}>
        <BarText text={text} color={textColor} right={textRight} />
        {barsSorted.map((bar, key) => (
          <Bar key={key} {...bar} />
        ))}
      </BarsContainer>
      <Labels
        gap="lg"
        justify={position === "right" ? "end" : undefined}
        style={LabelsStyle}
      >
        {bars.map((bar, key) => {
          const children = [
            <SquareColor color={bar.color} />,
            <Typography variant="body3" color="secondary">
              {bar.label}
            </Typography>,
          ];
          if (position === "right") children.reverse();
          return (
            <Row key={key} gap="sm" items="center">
              {children}
            </Row>
          );
        })}
      </Labels>
    </Column>
  );
};
