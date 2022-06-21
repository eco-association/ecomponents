import React from "react";

import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

import { toast as reactToastify } from "react-toastify";

import classnames from "classnames";

import "./toast.css";

const Icons = {
  basic: BellIcon,
  success: CheckCircleIcon,
  danger: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

type Intent = "basic" | "success" | "danger" | "warning" | "info";

type ToastBodyProps = {
  title: string;
  body?: string | JSX.Element;
};

const ToastBody = ({ title, body }: ToastBodyProps) => {
  return (
    <div className="font-sans text-eco-dark-gray">
      <div className="font-medium">{title}</div>
      <div className="text-sm">{body}</div>
    </div>
  );
};

type ToastProps = {
  title: string;
  body?: string | JSX.Element;
  intent?: Intent;
  hideProgressBar?: boolean;
};

const toast = ({
  title,
  body,
  intent = "basic",
  hideProgressBar = false,
}: ToastProps) => {
  const Icon = Icons[intent];

  const iconClassName = classnames("h-5 w-5", {
    "text-eco-blue-primary": intent === "basic",
    "text-eco-green-success": intent === "success",
    "text-eco-teal-accent": intent === "info",
    "text-eco-yellow-warning": intent === "warning",
    "text-eco-red-danger": intent === "danger",
  });

  const toastBody = <ToastBody title={title} body={body} />;
  const toastOptions = {
    hideProgressBar,
    icon: <Icon className={iconClassName} />,
  };

  switch (intent) {
    case "basic":
      return reactToastify(toastBody, toastOptions);
    case "success":
      return reactToastify.success(toastBody, toastOptions);
    case "danger":
      return reactToastify.error(toastBody, toastOptions);
    case "warning":
      return reactToastify.warning(toastBody, toastOptions);
    case "info":
      return reactToastify.info(toastBody, toastOptions);
    default:
      return reactToastify(toastBody, toastOptions);
  }
};

export default toast;
