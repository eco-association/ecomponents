import React from "react";
import { jsx } from "@emotion/react";

/**
 * The `css` prop relies on `jsx` which is ignored using `React.cloneElement`
 */
export const cloneElement = (
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  props: Record<string, unknown>
) => {
  return jsx(element.type, {
    key: element.key,
    ...element.props,
    ...props,
  });
};
