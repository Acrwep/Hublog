import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./commonstyles.css";

const CommonWarningModal = ({ onDelete, title }) => {
  Modal.warning({
    title: title,
    icon: <ExclamationCircleFilled />,
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
          className="warning_modal_cancelbutton"
          onClick={() => {
            Modal.destroyAll();
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onDelete();
            Modal.destroyAll();
          }}
        >
          Yes
        </Button>
      </div>
    ),
  });
};

export default CommonWarningModal;
