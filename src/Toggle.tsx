import React from "react";

import { Switch } from "@headlessui/react";

import classnames from "classnames";

type Props = {
  value: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange: (value: boolean) => void;
  intent?: "basic" | "danger";
};

const Toggle = ({
  value,
  disabled = false,
  size = "md",
  onChange,
  intent = "basic",
}: Props) => {
  const switchClassName = classnames(
    "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    /** Basic Toggle */
    { "focus:ring-eco-blue-primary": intent === "basic" },
    { "bg-eco-blue-primary": value && intent === "basic" },
    /** Danger Toggle */
    { "focus:ring-eco-danger-red": intent === "danger" },
    { "bg-eco-red-danger": value && intent === "danger" },
    /** Small Toggle */
    { "h-4 w-7": size === "sm" },
    /** Medium Toggle */
    { "h-6 w-11": size === "md" },
    /** Large Toggle */
    { "h-8 w-15": size === "lg" },
    { "bg-gray-200": !value }
  );

  const indicatorClassName = classnames(
    "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
    { "translate-x-0": !value },
    /** Small Toggle */
    { "h-3 w-3": size === "sm" },
    { "translate-x-3": value && size === "sm" },
    /** Medium Toggle */
    { "h-5 w-5": size === "md" },
    { "translate-x-5": value && size === "md" },
    /** Large Toggle */
    { "h-7 w-7": size === "lg" },
    { "translate-x-7": value && size === "lg" }
  );

  return (
    <Switch
      disabled={disabled}
      checked={value}
      onChange={onChange}
      className={switchClassName}
    >
      <span className="sr-only">Use setting</span>
      <span aria-hidden="true" className={indicatorClassName} />
    </Switch>
  );
};

export default Toggle;
