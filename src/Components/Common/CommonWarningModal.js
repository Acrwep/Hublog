import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./commonstyles.css";

const { confirm } = Modal;
const CommonWarningModal = ({ onDelete, title }) => {
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    centered: true,
    footer: (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "12px",
        }}
        aria-hidden="false"
      >
        <Button
          className="warningmodal_cancelbutton"
          onClick={() => {
            Modal.destroyAll();
          }}
        >
          Cancel
        </Button>
        <Button
          className="warningmodal_deletebutton"
          onClick={() => {
            onDelete();
            Modal.destroyAll();
          }}
        >
          Yes
        </Button>
      </div>
    ),
    onOk() {
      onDelete();
      Modal.destroyAll();
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};

export default CommonWarningModal;
