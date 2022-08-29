import React, { ReactNode } from "react";

import classnames from "classnames";

type BadgeProps = {
  /** Intent controls the color of the badge to convey meaning and reinforces importance */
  intent: "basic" | "warning" | "info" | "danger" | "success" | "none";
  /** Solid badges are filled in with the main color
   *  Light badges are filled in with a lighter opacity of the color + dark text
   *  Hollow buttons have no background with colored border and text */
  kind: "solid" | "light" | "hollow";
  onClick?: () => void;
  children: ReactNode;
};

const Badge = ({ intent, kind = "solid", onClick, children }: BadgeProps) => {
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
      "bg-eco-medium-gray text-white": intent === "none" && kind === "solid",
    },
    {
      "bg-eco-dark-gray/10 text-eco-dark-gray":
        intent === "none" && kind === "light",
    },
    {
      "bg-inherit border border-eco-medium-gray text-eco-medium-gray":
        intent === "none" && kind === "hollow",
    },
    { "hover:opacity-75 cursor-pointer": !!onClick }
  );

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Badge;
