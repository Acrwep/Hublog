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
  style,
  addonAfter,
  prefix,
  className,
  type,
  suffix,
}) => {
  return (
    <div style={style} className="commonInputfield_container">
      {label && (
        <div style={{ display: "flex" }}>
          <label className="commonfield_label">{label}</label>
          {mandatory ? (
            <p style={{ color: "red", marginLeft: "4px" }}>*</p>
          ) : (
            ""
          )}
        </div>
      )}
      <Input
        // className="commonInputfield"
        className={`commonInputfield ${className}`}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        mandatory={mandatory}
        error={error}
        status={error ? "error" : ""}
        maxLength={maxLength}
        addonAfter={addonAfter}
        prefix={prefix}
        type={type}
        suffix={suffix}
      />
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
};
export default CommonInputField;
