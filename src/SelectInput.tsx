import React, { Fragment, FocusEvent } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "@heroicons/react/outline";

import classnames from "classnames";

export type Option<T> = {
  /** The value of the selected option, hidden from the user */
  value: T;
  /** The user visible representation of the option */
  label: string | number | JSX.Element;
  /** If extra detail is needed to describe the option, displayed below the label only in the dropdown */
  detail?: string | number | JSX.Element;
  /** If an option is disabled */
  disabled?: boolean;
};

type SelectInputProps<T> = {
  /** The currently selected value of the input */
  value: T | null;
  /** Called when the value of the select input is changed */
  onChange: (value: T) => void;
  /** The options that the select input contains */
  options: Option<T>[];
  /** The placeholder text that will be displayed when the input is empty */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is invalid */
  isInvalid?: boolean;
  /** when true, this allows the user to select the empty element from the list. this calls onChange with `null`. */
  isNullable?: boolean;
  /** Called when the input is blurred */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

const SelectInput = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled,
  isInvalid,
  isNullable,
  onBlur,
}: SelectInputProps<any>) => {
  const optionsValue = options.find((options) => options.value === value);

  return (
    <Listbox
      value={optionsValue}
      onChange={(selection: Option<any>) => onChange(selection.value)}
      disabled={disabled}
    >
      {({ open }: { open: boolean }) => (
        <div className="relative text-black ">
          <Listbox.Button
            className={classnames(
              "cursor-pointer bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-1.5 text-left focus:outline-none focus:ring-1 focus:ring-eco-blue-primary focus:border-eco-blue-primary sm:text-sm",
              { "bg-eco-light-gray text-white cursor-not-allowed": disabled },
              { "border-eco-light-gray": !isInvalid },
              { "border-eco-red-danger": isInvalid }
            )}
            onBlur={onBlur}
          >
            <span
              className={classnames("block truncate", {
                "text-eco-dark-gray": !optionsValue,
              })}
            >
              {optionsValue?.label || placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {value && isNullable ? (
                <button onClick={() => onChange(null)}>
                  <XIcon className="h-4 w-4 text-eco-dark-gray" />
                </button>
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-eco-dark-gray" />
              )}
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-fit bg-white shadow-xl max-h-60 rounded-md py-1 text-base ring-1 ring-white ring-opacity-4 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={JSON.stringify(option.value)}
                  value={option}
                  disabled={option.disabled}
                >
                  {({
                    selected,
                    active,
                    disabled,
                  }: {
                    selected: boolean;
                    active: boolean;
                    disabled: boolean;
                  }) => (
                    <div
                      className={classnames(
                        "flex items-center pl-4 pr-10 justify-between cursor-pointer select-none relative py-2 px-3",
                        {
                          "font-medium": selected,
                        },
                        {
                          "bg-eco-blue-primary text-white": active,
                        },
                        {
                          "bg-eco-medium-gray text-white cursor-not-allowed":
                            disabled,
                        }
                      )}
                    >
                      <div className="flex flex-col">
                        {option.label}
                        {option.detail ? (
                          <div
                            className={classnames(
                              "text-xs font-normal",
                              { "text-eco-dark-gray": !active && !disabled },
                              { "text-white": active && !disabled }
                            )}
                          >
                            {option.detail}{" "}
                          </div>
                        ) : null}
                      </div>
                      {selected ? (
                        <span
                          className={classnames(
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon
                            className={classnames(
                              "w-5 h-5",
                              { "text-eco-blue-primary": !active },
                              { "text-white": active }
                            )}
                          />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default SelectInput;
