import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";
import "../styles.css";
import Users from "./Users";
import Designation from "./Designation";

const UserandDesignation = ({ visited }) => {
  const location = useLocation();

  // useEffect(() => {
  //   console.log("ooooooo", visited);
  //   if (visited == false) {
  //     console.log("eeeeeeeeee", visited);
  //     visited = true;
  //   } else {
  //     visited(false);
  //   }
  // }, []);

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
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default UserandDesignation;
