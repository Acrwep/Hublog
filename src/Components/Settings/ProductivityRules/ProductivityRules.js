import React from "react";
import { Tabs } from "antd";
import "../styles.css";
import Categories from "./Categories";
import Mapping from "./Mapping";

const ProductivityRules = ({ loading }) => {
  const items = [
    {
      key: "1",
      label: "Categories",
      children: <Categories loading={loading} />,
    },
    {
      key: "2",
      label: "Mapping",
      children: <Mapping loading={loading} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ProductivityRules;
