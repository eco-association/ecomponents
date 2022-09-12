import { IndexableCSS } from "./types";

export const checkOverlapping = (
  propName: string,
  ...props: (boolean | undefined)[]
): void => {
  let foundOne = false;
  props.forEach((prop: boolean | undefined) => {
    if (prop) {
      if (foundOne) {
        console.warn(
          `[@react-css/grid] Multiple values have been provided for ${propName}.`
        );
        return;
      }
      foundOne = true;
    }
  });
};

export const trimUndefined = (style: IndexableCSS): IndexableCSS => {
  style = { ...style };
  // remove all CSS Properties that are undefined
  Object.keys(style).forEach(
    (key) => style[key] === undefined && delete style[key]
  );
  return style;
};
