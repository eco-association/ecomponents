import React, { FocusEvent } from "react";

import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classNames from "classnames";

import { TextInput } from "..";

import CalendarDateHeader from "./CalendarDateInputHeader";

type CalendarDateInputProps = {
  /** The value of the CalendarDateInput */
  value: Date;
  /** Called when the value of the CalendarDateInput changes */
  onChange: (value: Date) => void;
  /** The placeholder text that will be displayed when the input is empty */
  placeholder?: string;
  /** Called when the input is blurred */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Give the CalendarDateInput a disabled prop */
  disabled?: boolean;
  /** Give the CalendarDateInput an invalid prop */
  isInvalid?: boolean;
  /** The date format string that is used to display a date to the use.
   *  This should be a moment format string, like "MM-DD-YYYY".
   *  https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/ */
  dateStringFormat?: string;
  /** The minimum date that can be selected */
  minDate?: Date;
  /** The maximum date that can be selected */
  maxDate?: Date;
  /** Used to filter calendar dates, like 'no mondays' */
  filterDate?: (date: Date) => boolean;
};

const CalendarDateInput = ({
  value,
  onChange,
  placeholder,
  onBlur,
  disabled = false,
  isInvalid = false,
  dateStringFormat,
  minDate,
  maxDate,
  filterDate,
}: CalendarDateInputProps) => {
  return (
    <div className="font-sans">
      <DatePicker
        selected={value}
        onChange={onChange}
        // @ts-ignore - The rest of the props will be passed in from the DatePicker
        customInput={React.createElement(TextInput, { isInvalid })}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        onBlur={onBlur}
        filterDate={filterDate}
        placeholderText={placeholder}
        renderCustomHeader={CalendarDateHeader}
      />
    </div>
  );
};

export default CalendarDateInput;
