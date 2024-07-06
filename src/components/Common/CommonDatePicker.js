import React from "react";
import { DatePicker, Space } from "antd";
import { dayJs } from "../Utils";

export default function CommonDatePicker({
  onChange,
  value,
  defaultValue,
  month,
}) {
  return (
    <Space direction="vertical">
      <DatePicker
        picker={month === "true" ? "month" : "date"}
        onChange={onChange}
        value={value ? dayJs(value) : null}
        defaultValue={defaultValue}
        format="DD-MM-YYYY"
      />
    </Space>
  );
}
