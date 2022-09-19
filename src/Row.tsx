import React from "react";
import clsx from "clsx";
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_MIN_BREAKPOINT,
  FlexComponent,
  useFlex,
} from "./Column";

type RowColWidth =
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
  | "12"
  | "auto";

type RowColumns = RowColWidth | { cols?: RowColWidth };

export interface RowProps
  extends React.HTMLAttributes<HTMLElement>,
    FlexComponent {
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
  xxl?: RowColumns;

  [key: string]: any;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    {
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = "div",
      ...props
    }: RowProps,
    ref
  ) => {
    const sizePrefix = `row-cols`;
    const classes: string[] = ["row"];

    DEFAULT_BREAKPOINTS.forEach((brkPoint) => {
      const propValue = props[brkPoint];
      delete props[brkPoint];

      let cols;
      if (propValue != null && typeof propValue === "object") {
        ({ cols } = propValue);
      } else {
        cols = propValue;
      }

      const infix = brkPoint !== DEFAULT_MIN_BREAKPOINT ? `-${brkPoint}` : "";

      if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
    });

    const flex = useFlex(props);

    return (
      <Component
        {...props}
        ref={ref}
        css={flex}
        className={clsx(className, ...classes)}
      />
    );
  }
);
