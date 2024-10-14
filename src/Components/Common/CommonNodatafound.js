import React from "react";
import { Empty } from "antd";
import Nodata from "../../assets/images/nodatafound.jpg";
import "./commonstyles.css";
export default function CommonNodatafound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100%",
      }}
    >
      {/* <img src={Nodata} className="commonnodata_image" />
      <p className="commonnodata_text">No Data Found</p> */}
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data found" />
    </div>
  );
}
