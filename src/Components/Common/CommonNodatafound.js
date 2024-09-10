import React from "react";
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
      }}
    >
      <img src={Nodata} className="commonnodata_image" />
      <p className="commonnodata_text">No Data Found</p>
    </div>
  );
}
