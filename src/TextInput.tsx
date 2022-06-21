import React, { MouseEvent, FocusEvent } from "react";

import classnames from "classnames";

export type PrefixSuffix = {
  value: string | JSX.Element;
  onClick?: () => void;
};

type TextInputProps = {
  /** Note that this must be a string, and cannot be null or undefined. */
  value: string;
  /** Called when the value of the textinput changes */
  onChange: (value: string) => void;
  /** The HTML type of this text input, see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input for a complete list */
  type: "text" | "password" | "email" | "number";
  /** The placeholder text that will be displayed when the input is empty */
  placeholder?: string;
  /** Called when the input is clicked */
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  /** Called when the input is focused */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Called when the input is blurred */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled or not */
  disabled?: boolean;
  /** Whether the input is readonly or not */
  readOnly?: boolean;
  /** Whether the input is invalid or not */
  isInvalid?: boolean;
  /** Prefix that will appear within and at the start of the input field */
  prefix?: PrefixSuffix;
  /** Suffix that will appear within and at the end of the input field */
  suffix?: PrefixSuffix;
};

const TextInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  onClick,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  isInvalid,
  prefix,
  suffix,
}: TextInputProps) => {
  const className = classnames(
    "shadow-sm py-1.5 sm:text-sm border px-4 w-full rounded-md",
    /** Invalid Styles */
    { "border-eco-light-gray": !isInvalid },
    { "border-eco-red-danger": isInvalid },
    /** Disabled Styles */
    { "cursor-not-allowed": disabled },
    /** ReadOnly Styles */
    { "border-none shadow-none": readOnly },
    /** Prefix Styles */
    { "rounded-l-none": !!prefix },
    /** Suffix Styles */
    { "rounded-r-none": !!suffix }
  );

  const prefixSuffixClassName = (
    hasOnClick: boolean,
    side: "left" | "right"
  ): string => {
    return classnames(
      "flex shadow-sm hover items-center border px-4",
      { "text-eco-blue-primary hover:bg-eco-blue-primary/20": hasOnClick },
      { "cursor-default": !hasOnClick },
      { "rounded-l-md border-r-0": side === "left" },
      { "rounded-r-md border-l-0": side === "right" },
      { "border-eco-light-gray": !isInvalid },
      { "border-eco-red-danger": isInvalid }
    );
  };

  return (
    <div className="flex">
      {prefix ? (
        <button
          type="button"
          className={prefixSuffixClassName(!!prefix.onClick, "left")}
          onClick={prefix.onClick}
        >
          {prefix.value}
        </button>
      ) : null}
      <input
        type={type}
        value={value || ""}
        step={type === "number" ? "any" : null}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
      {suffix ? (
        <button
          type="button"
          className={prefixSuffixClassName(!!suffix.onClick, "right")}
          onClick={suffix.onClick}
        >
          {suffix.value}
        </button>
      ) : null}
    </div>
  );
};

export default TextInput;
