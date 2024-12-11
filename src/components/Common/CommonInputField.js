import React from "react";
import { Input } from "antd";
import "./commonstyles.css";

/**
 * @typedef {Object} CommonInputFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange]
 * @property {any} [value]
 * @property {string} [error]
 * @property {number} [maxLength]
 * @property {boolean} [mandatory]
 * @property {React.CSSProperties} [style]
 * @property {React.ReactNode} [addonAfter]
 * @property {React.ReactNode} [prefix]
 * @property {string} [className]
 * @property {string} [type]
 * @property {React.ReactNode} [suffix]
 */

/**
 * @param {CommonInputFieldProps} props
 */

const CommonInputField = ({
  label,
  placeholder,
  onChange,
  name,
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
        // className={`commonInputfield ${className}`}
        className={`${
          error === "" || error === null || error === undefined
            ? "commonInputfield"
            : "commonInputfield_error"
        } ${className}`}
        label={label}
        placeholder={placeholder}
        name={name}
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
