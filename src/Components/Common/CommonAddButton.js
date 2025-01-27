import React from "react";
import { Button } from "antd";
import "./commonstyles.css";
import { MdOutlineAdd } from "react-icons/md";

const CommonAddButton = ({ name, onClick, iconVisible }) => {
  return (
    <Button type="primary" className="commonadd_button" onClick={onClick}>
      {iconVisible === "false" ? (
        ""
      ) : (
        <MdOutlineAdd
          className="common_buttonaddIcon"
          style={{ marginRight: "0px" }}
        />
      )}
      {name}
    </Button>
  );
};
export default CommonAddButton;
