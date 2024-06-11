import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const { RangePicker } = DatePicker;
const DateRangePicker = ({ dates = [], setDates }) => {
  const [selectedRange, setSelectedRange] = useState([]);

  useEffect(() => {
    if (dates?.length > 0) {
      // setSelectedRange([dayjs(dates[0]), dayjs(dates[1])]);
    } else {
      // setSelectedRange([dayjs().subtract(6, 'd'), today]);
    }
  }, [dates]);

  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  const rangePresets = [
    { label: "Today", value: [today, today] },
    { label: "Yesterday", value: [yesterday, yesterday] },
    { label: "Last 7 Days", value: [dayjs().subtract(6, "d"), today] },
    { label: "Last 15 Days", value: [dayjs().subtract(14, "d"), today] },
    { label: "Last 31 Days", value: [dayjs().subtract(30, "d"), today] },
  ];

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
    setDates(dates);
  };
  return (
    <div>
      {/* <RangePicker onChange={handleRangeChange} value={selectedRange} /> */}
      <RangePicker
        presets={rangePresets}
        onChange={handleRangeChange}
        value={selectedRange}
      />
    </div>
  );
};

export default DateRangePicker;
