import React from "react";
import { Space, TimePicker } from "antd";
import { dayJs } from "../Utils";
import "./commonstyles.css";

const CommonTimePicker = ({
  onChange,
  value,
  label,
  error,
  mandatory,
  style,
}) => {
  //   const onChange = (time, timeString) => {
  //     console.log(time, timeString);
  //   };
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <TimePicker
          use12Hours
          format="h:mm A"
          value={value}
          onChange={onChange}
          placeholder="Select time"
          style={{ width: "100%" }}
          status={error ? "error" : ""}
        />
      </Space>
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
};
export default CommonTimePicker;
