import React, { MouseEvent } from "react";

import * as Icons from "@heroicons/react/outline/index.js";

import classnames from "classnames";

import TailSpin from "./TailSpin";

import colors from "./styles/colors";

export type Intent = "basic" | "danger" | "none";

export type Kind = "solid" | "hollow" | "bare" | "blank";

type ButtonProps = {
  /** The text that represents the primary action of the button. */
  label?: string;
  /** We skew toward only using specifying an intent when there is a direct correlation
   *  to the primary action. Intents convey meaning and reinforce importance. */
  intent?: Intent;
  /** Solid buttons usually constitute a primary action
   *  Hollow buttons are generally secondary
   *  Bare buttons can be used for rows of buttons or for more subtle buttons
   *  Blank buttons drop all padding and just retain colors */
  kind?: Kind;
  /** Whether the icon is loading or not */
  loading?: boolean;
  /** Give the button the disabled attribute, drop its opacity, and remove pointer-events. */
  disabled?: boolean;
  /** The name of the icon to be displayed within the button
   *  Full list of names: https://unpkg.com/browse/@heroicons/react@1.0.6/outline/ */
  iconName?: string;
  /** Rendered within the button if there's no label */
  children?: string | string[] | JSX.Element;
  /** Triggered when the button is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** type="button" is the default type and has no inherent behavior.
   *  type="reset" will reset the form if the button is meant to be a reset button.
   *  type="submit" will submit the form when used as a submission button */
  type?: "button" | "submit" | "reset";
};

const Button = ({
  label,
  intent = "basic",
  kind = "solid",
  loading = false,
  disabled = false,
  iconName,
  children,
  onClick,
  type = "button",
}: ButtonProps) => {
  const className = classnames(
    "inline-flex items-center px-5 h-10 py-2 w-fit border rounded-full shadow-sm text-md font-medium hover:opacity-80",
    // Basic Buttons
    {
      "bg-eco-blue-primary text-white": intent === "basic" && kind === "solid",
    },
    {
      "bg-white border-eco-blue-primary text-eco-blue-primary":
        intent === "basic" && kind === "hollow",
    },
    {
      "text-eco-blue-primary shadow-none hover:bg-eco-blue-primary/25":
        intent === "basic" && ["blank", "bare"].includes(kind),
    },
    // Danger Buttons
    {
      "bg-eco-red-danger text-white": intent === "danger" && kind === "solid",
    },
    {
      "bg-white border-eco-red-danger text-eco-red-danger":
        intent === "danger" && kind === "hollow",
    },
    {
      "text-eco-red-danger shadow-none":
        intent === "danger" && ["blank", "bare"].includes(kind),
    },
    // None Buttons
    {
      "bg-white text-black": intent === "none" && kind === "solid",
    },
    {
      "bg-white border-black text-black":
        intent === "none" && kind === "hollow",
    },
    {
      "text-black shadow-none":
        intent === "none" && ["blank", "bare"].includes(kind),
    },
    // Blank Buttons
    {
      "px-1 border-none": kind === "blank",
    },
    // Disabled Buttons
    {
      "opacity-60 hover:opacity-60": disabled === true || loading === true,
    }
  );

  let loadingColor = colors.white;
  if (intent === "none") {
    loadingColor = colors.black;
  } else if (["blank", "hollow", "bare"].includes(kind)) {
    if (intent === "basic") {
      loadingColor = colors.bluePrimary;
    } else if (intent === "danger") {
      loadingColor = colors.redDanger;
    }
  }

  const Icon = iconName ? Icons[iconName] : null;

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      <div className="flex items-center">
        {loading ? (
          <div className="pr-1">
            <TailSpin color={loadingColor} height={15} width={15} />
          </div>
        ) : null}
        {Icon ? <Icon className="h-5 w-5 pr-1" /> : null}
        {label || children}
      </div>
    </button>
  );
};

export default Button;
