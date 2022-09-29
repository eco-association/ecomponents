import React, { CSSProperties } from "react";
import clsx from "clsx";
import { css } from "@emotion/react";

type NumberAttr =
  | number
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type ColumnSize = boolean | "auto" | NumberAttr;
type ColumnSpec = ColumnSize | { span?: ColumnSize };

export type GapSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface FlexComponent {
  gap?: GapSize | number;
  items?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
}

const gapSizes: Record<GapSize, number> = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const useFlex = ({ gap, items, justify }: FlexComponent) => {
  return css({
    ...(gap !== undefined
      ? { gap: typeof gap === "number" ? gap : gapSizes[gap] }
      : {}),
    ...(items !== undefined ? { alignItems: items } : {}),
    ...(justify !== undefined ? { justifyContent: justify } : {}),
  });
};

export interface ColumnProps
  extends React.HTMLAttributes<HTMLElement>,
    FlexComponent {
  xs?: ColumnSpec;
  sm?: ColumnSpec;
  md?: ColumnSpec;
  lg?: ColumnSpec;
  xl?: ColumnSpec;
  xxl?: ColumnSpec;
  [key: string]: any;
}

interface UseColumnMetadata {
  as?: React.ElementType;
  bsPrefix: string;
  spans: string[];
}

export const DEFAULT_BREAKPOINTS = ["xxl", "xl", "lg", "md", "sm", "xs"];
export const DEFAULT_MIN_BREAKPOINT = "xs";

function useColumn({
  as,
  className,
  ...props
}: ColumnProps): [any, UseColumnMetadata] {
  const bsPrefix = "col";
  const spans: string[] = [];

  DEFAULT_BREAKPOINTS.forEach((brkPoint) => {
    let span: ColumnSize | undefined = props[brkPoint];
    delete props[brkPoint];
    const infix = brkPoint !== DEFAULT_MIN_BREAKPOINT ? `-${brkPoint}` : "";

    if (span)
      spans.push(
        span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`
      );
  });

  return [
    { ...props, className: clsx(className, ...spans) },
    {
      as,
      bsPrefix,
      spans,
    },
  ];
}

export const Column = React.forwardRef<HTMLElement, ColumnProps>(
  (props, ref) => {
    const [
      { className, ...colProps },
      { as: Component = "div", bsPrefix, spans },
    ] = useColumn(props);

    const flex = useFlex(props);

    return (
      <Component
        {...colProps}
        ref={ref}
        css={flex}
        className={clsx("col", className, !spans.length && bsPrefix)}
      />
    );
  }
);
