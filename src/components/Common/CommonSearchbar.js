import React from "react";
import { Input, Space } from "antd";
import "./commonstyles.css";
const { Search } = Input;

export default function CommonSearchField({
  onSearch,
  placeholder,
  style,
  className,
}) {
  return (
    <div style={style}>
      <Space direction="vertical">
        <Search
          className={`commonsearchbar ${className}`}
          placeholder={placeholder}
          allowClear
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </Space>
    </div>
  );
}
