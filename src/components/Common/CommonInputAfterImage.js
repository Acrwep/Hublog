import React from "react";
import { Input } from "antd";
import "./commonstyles.css";

const CommonInputAfterImage = ({
  label,
  placeholder,
  onChange,
  value,
  error,
  maxLength,
  mandatory,
  style,
  addonAfter,
  addonAfterStyle,
}) => {
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <label className="commonfield_label">{label}</label>
        {mandatory ? <p style={{ color: "red", marginLeft: "4px" }}>*</p> : ""}
      </div>
      <div className="commoninputafterimage_fieldContainer">
        <div style={{ width: "100%" }}>
          <Input
            className="commoninputafterimageField"
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
            <p style={{ color: "#ff4d4f", marginTop: "2px" }}>
              {label + error}
            </p>
          )}
        </div>
        <div className="inputafterimage_imageContainer" style={addonAfterStyle}>
          <p style={{ padding: "2px 4px" }}>{addonAfter}</p>
        </div>
      </div>
    </div>
  );
};
export default CommonInputAfterImage;
