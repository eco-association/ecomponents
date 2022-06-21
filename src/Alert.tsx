import React from "react";

import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

import classnames from "classnames";

type AlertProps = {
  /** Defines the visual style which conveys the level of importance / urgency to the user */
  intent: "success" | "info" | "warning" | "danger";
  /** The main content to be displayed in the center of the banner */
  message: string | JSX.Element;
  /** Controls whether the icon is shown */
  showIcon?: boolean;
  /** Additional content to be displayed in the center of the banner */
  additionalMessage?: string | JSX.Element;
  /** The call to action button at the bottom of the banner */
  ctaButton?: JSX.Element;
  /** The X icon only shows when onClose is provided */
  onClose?: () => void;
};

const Alert = ({
  intent,
  message,
  showIcon = true,
  additionalMessage,
  ctaButton,
  onClose,
}: AlertProps) => {
  if (typeof window === "undefined") {
    return null;
  }

  const bodyClassName = classnames("rounded-md p-4 w-full", {
    "bg-eco-green-success/20": intent === "success",
    "bg-eco-teal-accent/20": intent === "info",
    "bg-eco-yellow-warning/20": intent === "warning",
    "bg-eco-red-danger/20": intent === "danger",
  });

  const Icons = {
    success: CheckCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationIcon,
    danger: XCircleIcon,
  };

  const iconClassName = classnames("h-5 w-5", {
    "text-eco-green-success": intent === "success",
    "text-eco-teal-accent": intent === "info",
    "text-eco-yellow-warning": intent === "warning",
    "text-eco-red-danger": intent === "danger",
  });

  const Icon = Icons[intent];

  const messageClassName = classnames("text-sm ml-3 w-full font-medium", {
    "text-eco-green-success": intent === "success",
    "text-eco-teal-accent": intent === "info",
    "text-eco-yellow-warning": intent === "warning",
    "text-eco-red-danger": intent === "danger",
  });

  return (
    <div className={bodyClassName}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <Icon className={iconClassName} aria-hidden="true" />
          </div>
        )}
        <div className={messageClassName}>{message}</div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
