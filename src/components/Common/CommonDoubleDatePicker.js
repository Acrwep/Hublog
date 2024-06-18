import React from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export default function CommonDoubleDatePicker() {
  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker />
      </Space>
    </div>
  );
}
