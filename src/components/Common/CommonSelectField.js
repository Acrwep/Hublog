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
}) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <Select
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
        className="commonSelectfield"
      />
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
}
