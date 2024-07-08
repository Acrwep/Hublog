import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

const CommonTextArea = ({
  label,
  onChange,
  value,
  error,
  maxLength,
  mandatory,
  style,
}) => {
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <TextArea
        rows={4}
        placeholder="Type here..."
        onChange={onChange}
        value={value}
        error={error}
        status={error ? "error" : ""}
        maxLength={maxLength}
      />
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
};
export default CommonTextArea;
