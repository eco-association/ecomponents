import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Column } from "./Column";
import { Row, RowProps } from "./Row";
import { Typography } from "./Typography";
import { Color } from "./types";

const DottedLineSvg = (
  color: string
) => `<svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="4" height="5" x="2" fill="${color}" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M 0 0 L 0 5 H 2 L 2 0" fill="transparent"/>
</svg>`;

interface ProgressBarProps {
  text?: string;
  textColor?: Color;
  textRight?: boolean;
  BarContainerProps?: RowProps;
  BarStyle?: CSSProperties | CSSProperties[];
  LabelsStyle?: CSSProperties;

  bars: BarProps[];
}

interface BarProps extends React.PropsWithChildren<any> {
  color: Color;
  percentage: number;
  label?: React.ReactNode;
  type?: "solid" | "dotted";
  position?: "left" | "right";
  style?: CSSProperties;
  props?: Omit<React.HTMLProps<HTMLDivElement>, "as" | "label">;
}

const Container = styled(Row)({ width: "100%" });

const BarContainer = styled(Container)({
  position: "absolute",
  width: "100%",
  height: "100%",
});

const BarsContainer = styled(Row)(({ theme }) => ({
  height: 5,
  borderRadius: 24,
  width: "100%",
  overflow: "visible",
  position: "relative",
  backgroundColor: theme.palette.background.light,
}));

const Bar = styled.div<BarProps>(
  ({ theme, position, percentage, color, type }) => ({
    height: "100%",
    width: `${percentage * 100}%`,
    transition: "width ease 1s",
    ...(type === "dotted"
      ? {
          backgroundImage: `url('data:image/svg+xml;base64,${Buffer.from(
            DottedLineSvg(theme.palette[color].main)
          ).toString("base64")}')`,
        }
      : { backgroundColor: theme.palette[color].main }),
    ...(position === "left"
      ? {
          "&:first-child": {
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
        }
      : {
          "&:last-child": {
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
          },
        }),
  })
);

const SquareColor = styled.div<BarProps>(({ theme, color }) => ({
  width: 16,
  height: 16,
  borderRadius: 2,
  backgroundColor: theme.palette[color].main,
}));

const BarTextContainer = styled.div<{ right?: boolean }>(
  ({ theme, right }) => ({
    zIndex: 1,
    padding: 2,
    top: "50%",
    position: "absolute",
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

const getByPosition = (bars: BarProps[], position: BarProps["position"]) =>
  bars.filter((bar) => bar.position === position);

const getLabel = (bar: BarProps, index: number) => {
  if (!bar.label) return null;
  const children = [<SquareColor key={index} {...bar} />, bar.label];
  if (bar.position === "right") children.reverse();
  return (
    <Row key={index} gap="sm" items="center">
      {children}
    </Row>
  );
};

const getBar = (bar: BarProps, index: number) => {
  return <Bar key={index} {...bar} />;
};

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
  BarContainerProps,
  LabelsStyle,
  bars: _bars,
}: ProgressBarProps) => {
  const bars = _bars.map((props) => ({
    ...props,
    percentage: Math.min(1, props.percentage),
  }));
  return (
    <Column gap={12}>
      <BarsContainer justify="space-between" {...BarContainerProps}>
        <BarText text={text} color={textColor} right={textRight} />
        <BarContainer>{getByPosition(bars, "left").map(getBar)}</BarContainer>
        <BarContainer justify="end">
          {getByPosition(bars, "right").map(getBar)}
        </BarContainer>
      </BarsContainer>
      <Row justify="space-between" gap="lg" style={LabelsStyle}>
        <Container gap="lg">
          {getByPosition(bars, "left").map(getLabel)}
        </Container>
        <Container gap="lg" justify="end">
          {getByPosition(bars, "right").map(getLabel)}
        </Container>
      </Row>
    </Column>
  );
};
