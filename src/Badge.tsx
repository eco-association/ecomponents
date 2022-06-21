import React from "react";

import classnames from "classnames";

type BadgeProps = {
  /** Intent controls the color of the badge to convey meaning and reinforces importance */
  intent: "basic" | "warning" | "info" | "danger" | "success" | "none";
  /** Solid badges are filled in with the main color
   *  Light badges are filled in with a lighter opacity of the color + dark text
   *  Hollow buttons have no background with colored border and text */
  kind: "solid" | "light" | "hollow";
  /** Rendered within the Badge */
  children: string | JSX.Element;
};

const Badge = ({ intent, kind = "solid", children }: BadgeProps) => {
  const className = classnames(
    "inline-flex items-center h-0 px-2.5 py-2.5 rounded-lg text-xs font-medium",
    /** Basic Styles */
    {
      "bg-eco-blue-primary text-white": intent === "basic" && kind === "solid",
    },
    {
      "bg-eco-blue-primary/25 text-eco-blue-primary":
        intent === "basic" && kind === "light",
    },
    {
      "bg-inherit border border-eco-blue-primary text-eco-blue-primary":
        intent === "basic" && kind === "hollow",
    },
    /** Warning Styles */
    {
      "bg-eco-yellow-warning text-white":
        intent === "warning" && kind === "solid",
    },
    {
      "bg-eco-yellow-warning/25 text-eco-yellow-warning":
        intent === "warning" && kind === "light",
    },
    {
      "bg-inherit border border-eco-yellow-warning text-eco-yellow-warning":
        intent === "warning" && kind === "hollow",
    },
    /** Info Styles */
    {
      "bg-eco-teal-accent text-white": intent === "info" && kind === "solid",
    },
    {
      "bg-eco-teal-accent/25 text-eco-teal-accent":
        intent === "info" && kind === "light",
    },
    {
      "bg-inherit border border-eco-teal-accent text-eco-teal-accent":
        intent === "info" && kind === "hollow",
    },
    /** Danger Styles */
    {
      "bg-eco-red-danger text-white": intent === "danger" && kind === "solid",
    },
    {
      "bg-eco-red-danger/25 text-eco-red-danger":
        intent === "danger" && kind === "light",
    },
    {
      "bg-inherit border border-eco-red-danger text-eco-red-danger":
        intent === "danger" && kind === "hollow",
    },
    /** Success Styles */
    {
      "bg-eco-green-success text-white":
        intent === "success" && kind === "solid",
    },
    {
      "bg-eco-green-success/25 text-eco-green-success":
        intent === "success" && kind === "light",
    },
    {
      "bg-inherit border border-eco-green-success text-eco-green-success":
        intent === "success" && kind === "hollow",
    },
    /** None Styles */
    {
      "bg-black text-white": intent === "none" && kind === "solid",
    },
    {
      "bg-black/25 text-black": intent === "none" && kind === "light",
    },
    {
      "bg-inherit border border-black text-black":
        intent === "none" && kind === "hollow",
    }
  );

  return <div className={className}>{children}</div>;
};

export default Badge;
