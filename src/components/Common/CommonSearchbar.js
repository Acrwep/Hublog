import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;

export default function CommonSearchField({ onSearch, placeholder, style }) {
  return (
    <div style={style}>
      <Space direction="vertical">
        <Search
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
