import React from "react";

import ReactTooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

import colors from "../styles/colors";

import "./tooltip.css";

type TooltipProps = {
  placement?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  value: string | JSX.Element;
  children: JSX.Element;
};

const Tooltip = ({ placement = "top", value, children }: TooltipProps) => {
  return (
    <ReactTooltip
      placement={placement}
      overlayStyle={{
        background: "none",
      }}
      overlayInnerStyle={{
        borderColor: colors.lightGray,
        background: colors.offBlack,
        color: colors.white,
        opacity: 100,
        borderRadius: 8,
      }}
      overlay={
        <div className="w-fit max-w-xs h-fit bg-transparent">{value}</div>
      }
    >
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
