import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";
import "../styles.css";
import Users from "./Users";
import Designation from "./Designation";

const UserandDesignation = ({ loading, userCount, designationCount }) => {
  const location = useLocation();

  const items = [
    {
      key: "1",
      label: "Users",
      children: <Users loading={loading} userCount={userCount} />,
    },
    {
      key: "2",
      label: "Designation",
      children: (
        <Designation loading={loading} designationCount={designationCount} />
      ),
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default UserandDesignation;
