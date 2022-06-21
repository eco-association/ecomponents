import React from "react";

import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import moment from "moment";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import { SelectInput } from "..";

const CalendarDateHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const twentyYearsFromNow = moment().year() + 20;
  const firstYear = 1971;

  const yearOptions = Array.from(
    Array(twentyYearsFromNow - firstYear).keys()
  ).map((x) => ({
    value: x + firstYear,
    label: x + firstYear,
  }));

  const monthOptions = [
    { value: 0, label: "Jan" },
    { value: 1, label: "Feb" },
    { value: 2, label: "Mar" },
    { value: 3, label: "Apr" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "Aug" },
    { value: 8, label: "Sept" },
    { value: 9, label: "Oct" },
    { value: 10, label: "Nov" },
    { value: 11, label: "Dec" },
  ];

  return (
    <div className="flex gap-2 px-5">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <ChevronLeftIcon className="w-3 h-3" />
      </button>
      <SelectInput
        value={monthOptions[moment(date).month()].value}
        options={monthOptions}
        onChange={changeMonth}
      />

      <SelectInput
        value={moment(date).year()}
        options={yearOptions}
        onChange={changeYear}
      />

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <ChevronRightIcon className="w-3 h-3" />
      </button>
    </div>
  );
};

export default CalendarDateHeader;
