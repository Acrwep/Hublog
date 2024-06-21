import React from "react";
import { DatePicker, Space } from "antd";
import { dayJs } from "../Utils";

export default function CommonDatePicker({ onChange, value, defaultValue }) {
  return (
    <Space direction="vertical">
      <DatePicker
        onChange={onChange}
        value={value ? dayJs(value) : null}
        defaultValue={defaultValue}
        format="DD-MM-YYYY"
      />
    </Space>
  );
}
