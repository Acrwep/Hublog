import React, { useState } from "react";
import { InboxOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { CommonToaster } from "./CommonToaster";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./commonstyles.css";

const CommonImageUpload = ({
  uploadedFile,
  label,
  mandatory,
  error,
  style,
  imageName,
}) => {
  const { Dragger } = Upload;
  const handleAttachment = ({ file }) => {
    const isValidType =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg";
    const isValidSize = file.size <= 1024 * 1024;

    if (file.status === "uploading") {
      return;
    }
    if (!isValidType) {
      uploadedFile([]);
      CommonToaster("Attachment must be a Png or Jpg or Jpeg file", "error");
    } else if (!isValidSize) {
      uploadedFile([]);
      CommonToaster("Attachment must be less than 1 MB", "error");
    } else {
      CommonToaster("Attachment uploaded successfully", "success");
      uploadedFile([file]);
    }
  };

  return (
    <div style={style}>
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
      <Dragger
        multiple={false}
        onChange={handleAttachment}
        showUploadList={false}
        className="draganddrop_container"
      >
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined style={{ color: "#009737" }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      {imageName ? (
        <div className="imageupload_imagenameContainer">
          <p className="imageupload_imagename">{imageName}</p>
          <MdDeleteOutline
            className="imageupload_deleteicon"
            size={20}
            onClick={() => {
              uploadedFile([]);
            }}
          />
        </div>
      ) : (
        ""
      )}
      {error && (
        <p style={{ color: "#ff4d4f", marginTop: "2px" }}>{label + error}</p>
      )}
    </div>
  );
};
export default CommonImageUpload;
