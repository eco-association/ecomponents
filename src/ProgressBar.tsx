import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "./types";
import { Row } from "./Row";
import { Column } from "./Column";
import { Typography } from "./Typography";

interface ProgressBarProps {
  text?: string;
  textColor?: Color;
  textRight?: boolean;
  color: Color | Color[];
  label: string | string[];
  percentage: number | number[];
}

interface BarProps {
  label: string;
  color: Color;
  percentage: number;
}

const BarsContainer = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 5,
  borderRadius: 25,
  backgroundColor: theme.palette.background.light,
}));

const Bar = styled.div<BarProps>(({ theme, percentage, color }) => ({
  position: "absolute",
  height: "100%",
  width: `${percentage * 100}%`,
  backgroundColor: theme.palette[color].main,
}));

const SquareColor = styled.div<Pick<BarProps, "color">>(({ theme, color }) => ({
  backgroundColor: theme.palette[color].main,
  borderRadius: 2,
  width: 16,
  height: 16,
}));

const Labels = styled(Row)({
  flexWrap: "wrap",
});

const BarTextContainer = styled.div<{ right?: boolean }>(
  ({ theme, right }) => ({
    padding: 2,
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    backgroundColor: theme.palette.background.default,
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
      <Typography color={color} variant="body2" css={css({ lineHeight: 2 })}>
        {text}
      </Typography>
    </BarTextContainer>
  );
};

export const ProgressBar = ({
  text,
  textColor,
  textRight,
  label: rawLabels,
  color: rawColors,
  percentage: rawPercentages,
}: ProgressBarProps) => {
  const labels = Array.isArray(rawLabels) ? rawLabels : [rawLabels];
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
  }));

  const barsSorted = [...bars].sort((a, b) =>
    b.percentage === a.percentage ? -1 : b.percentage - a.percentage
  );

  return (
    <Column gap={12}>
      <BarsContainer>
        <BarText text={text} color={textColor} right={textRight} />
        {barsSorted.map((bar) => (
          <Bar key={bar.label} {...bar} />
        ))}
      </BarsContainer>
      <Labels gap="lg">
        {bars.map((bar) => (
          <Row key={bar.label} gap="sm">
            <SquareColor color={bar.color} />
            <Typography variant="body2" color="secondary">
              {bar.label}
            </Typography>
          </Row>
        ))}
      </Labels>
    </Column>
  );
};
