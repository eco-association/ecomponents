import React from "react";

import { InformationCircleIcon } from "@heroicons/react/outline/index.js";

import { Tooltip } from "./";

type LabelProps = {
  value: string;
  isOptional?: boolean;
  isRequired?: boolean;
  tooltipText?: string;
};

const Label = ({
  value,
  isOptional = false,
  isRequired = false,
  tooltipText,
}: LabelProps) => {
  return (
    <div className="flex items-center text-sm font-extralight">
      {value}
      {isOptional ? <span className="font-italics"> (Optional)</span> : null}
      {tooltipText ? (
        <>
          <div className="pl-1"> </div>
          <Tooltip placement="top" value={tooltipText}>
            <InformationCircleIcon className="h-3 w-3" />
          </Tooltip>
        </>
      ) : null}
      {isRequired ? (
        <span style={{ marginLeft: 2 }} className="text-eco-red-danger">
          *
        </span>
      ) : null}
    </div>
  );
};

export default Label;
