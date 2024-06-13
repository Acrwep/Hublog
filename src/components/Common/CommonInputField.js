import React from "react";
import { Input } from "antd";
import "./commonstyles.css";

const CommonInputField = ({
  label,
  placeholder,
  onChange,
  value,
  error,
  maxLength,
  mandatory,
}) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <Input
        className="commonInputfield"
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        mandatory={mandatory}
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
export default CommonInputField;
