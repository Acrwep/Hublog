import React from "react";
import { DatePicker, Space } from "antd";
import { dayJs } from "../Utils";
import "./commonstyles.css";
export default function CommonDatePicker({
  onChange,
  value,
  defaultValue,
  month,
  placeholder,
  label,
  error,
  mandatory,
  style,
}) {
  const handleChange = (date) => {
    const dates = new Date(date.$d);

    // Format the date using toString method
    const formattedDate = dates.toString();
    onChange(formattedDate);
  };
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        {label && <label className="commonfield_label">{label}</label>}
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <DatePicker
          picker={month === "true" ? "month" : "date"}
          onChange={handleChange}
          value={value ? dayJs(value) : null}
          defaultValue={defaultValue}
          format="DD-MM-YYYY"
          placeholder={placeholder}
          status={error ? "error" : ""}
          style={{ width: "100%" }}
          allowClear={false}
        />
      </Space>
      <div
        className={
          error
            ? "commoninput_errormessage_activediv"
            : "commoninput_errormessagediv"
        }
      >
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      </div>
    </div>
  );
}
