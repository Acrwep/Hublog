import React from "react";
import { Tabs } from "antd";
import "../styles.css";
import Users from "./Users";
import Designation from "./Designation";

const UserandDesignation = () => {
  const items = [
    {
      key: "1",
      label: "Users",
      children: <Users />,
    },
    {
      key: "2",
      label: "Designation",
      children: <Designation />,
    },
  ];
  return (
    <div className="settings_usersContainer">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default UserandDesignation;
