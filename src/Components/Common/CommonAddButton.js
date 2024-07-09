import React from "react";
import { Button } from "antd";
import "./commonstyles.css";
import { MdAdd } from "react-icons/md";

const CommonAddButton = ({ name, onClick, iconVisible }) => {
  return (
    <Button type="primary" className="commonadd_button" onClick={onClick}>
      {iconVisible === "false" ? (
        ""
      ) : (
        <MdAdd
          className="common_buttonaddIcon"
          style={{ marginRight: "6px" }}
        />
      )}
      {name}
    </Button>
  );
};
export default CommonAddButton;
