import React, { useState, useEffect } from "react";
import { Slider, ConfigProvider } from "antd";
import "./styles.css";

const Workplace = () => {
  const [values, setValues] = useState([6, 18]); // Default range values

  const tooltipFormatter = (value) => {
    if (value === values[0]) {
      return (
        <>
          <div className="workplace_UndertooltipCircle" />
          <p style={{ fontWeight: 600 }}>
            Underutilized: <span style={{ fontWeight: 400 }}>{value}hr</span>
          </p>
        </>
      );
    } else if (value === values[1]) {
      return (
        <>
          <div className="workplace_healthytooltipCircle" />
          <p style={{ fontWeight: 600 }}>
            Healthy: <span style={{ fontWeight: 400 }}>{value}hr</span>
          </p>
        </>
      );
    }
    return value;
  };

  return (
    <div>
      <p className="settings_workplaceheading">
        Set your ranges for healthy, underutilized, and overburned levels
      </p>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              dotBorderColor: "#ABB3B3",
              dotActiveBorderColor: "#ABB3B3",
              controlSize: 20, // Increases the height of the slider
              railSize: 11, // Increases the height of the rail
              handleColor: "#ABB3B3", // Default handle color
              handleActiveColor: "#ABB3B3", // Handle color on hover
              handleActiveOutlineColor: "#ABB3B3",
              trackBg: "#25a17d", // Active track color
              trackHoverBg: "#25a17d", // Active track color on hover
              railBg: "#d9d9d9", // Inactive rail color
              railHoverBg: "#bfbfbf", // Inactive rail color on hover
              handleSize: 14, // Handle size
              handleSizeHover: 14, // Handle size on hover
              handleLineWidth: 3, // Handle border width
              handleLineWidthHover: 4, // Handle border width on hover
            },
          },
        }}
      >
        <Slider
          range
          max={24}
          min={1}
          defaultValue={values}
          onChange={(newValues) => setValues(newValues)} // Update range values
          tooltip={{
            open: true,
            autoAdjustOverflow: false,
            formatter: tooltipFormatter,
            getPopupContainer: (triggerNode) => triggerNode.parentNode, // Ensures tooltip is within the slider's container
          }}
          controlSize={20}
          className="custom-slider" // Add custom CSS class
        />
      </ConfigProvider>
    </div>
  );
};

export default Workplace;
