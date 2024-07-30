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
  className,
  style,
  showSearch,
  defaultValue,
  allowClear,
  disabled,
}) {
  return (
    <div style={style} className={className}>
      {label ? (
        <div style={{ display: "flex" }}>
          <label className="commonfield_label">{label}</label>
          {mandatory ? (
            <p style={{ color: "red", marginLeft: "4px" }}>*</p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <Select
        className="commonSelectfield"
        style={{ width: "100%" }}
        onChange={onChange}
        options={options.map((item) => ({
          value: item.id,
          label: item.first_Name ? item.first_Name : item.name,
        }))}
        value={value}
        error={error}
        status={error ? "error" : ""}
        mode={mode}
        placeholder={placeholder}
        showSearch={showSearch}
        disabled={disabled}
        allowClear={false}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={defaultValue}
      />
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
}
