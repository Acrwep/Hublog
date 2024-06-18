import React from "react";
import { Select } from "antd";
import "./commonstyles.css";

export default function CommonSelectField({
  label,
  options,
  onChange,
  value,
  error,
  mandatory,
  mode,
  placeholder,
  style,
}) {
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <Select
        className="commonSelectfield"
        style={{ width: "100%" }}
        onChange={onChange}
        options={options.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        value={value}
        error={error}
        status={error ? "error" : ""}
        mode={mode}
        placeholder={placeholder}
        allowClear
      />
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
}
