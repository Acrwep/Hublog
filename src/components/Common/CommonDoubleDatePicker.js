import React from "react";
import { dayJs } from "../Utils";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export default function CommonDoubleDatePicker({ onChange, value }) {
  const handleRangePickerChange = (dates, dateStrings) => {
    console.log("Selected dates:", dates);
    console.log("Formatted date strings:", dateStrings);

    // Pass the onChange event to parent component if provided
    if (onChange) {
      onChange(dates, dateStrings);
    }
  };
  const disabledDate = (current) => {
    // Disable dates that are after today
    return current && current > moment().endOf("day");
  };
  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker
          value={value ? [dayJs(value[0]), dayJs(value[1])] : null}
          onChange={handleRangePickerChange}
          disabledDate={disabledDate}
          allowClear={false}
        />
      </Space>
    </div>
  );
}
