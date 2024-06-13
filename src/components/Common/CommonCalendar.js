import React from "react";
import { DatePicker } from "antd";
import { dayJs } from "../Utils";
import "./commonstyles.css";

export default function CommonCalendar({
  label,
  onChange,
  value,
  error,
  mandatory,
}) {
  const dateFormat = "DD/MM/YYYY";

  return (
    <div>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <DatePicker
        className="commonInputfield"
        format={dateFormat}
        onChange={onChange}
        mandatory={mandatory}
        value={value ? dayJs(value) : null}
        error={error}
        status={error ? "error" : ""}
      />
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
}
