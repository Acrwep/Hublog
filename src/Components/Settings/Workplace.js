import React, { useState, useEffect } from "react";
import { Slider, ConfigProvider, Row, Col } from "antd";
import "./styles.css";
import { getWellnessRules, updateWellnessRules } from "../APIservice.js/action";
import { storeWellnessRules } from "../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { CommonToaster } from "../Common/CommonToaster";
import Loader from "../Common/Loader";

const Workplace = ({ mainloader }) => {
  const dispatch = useDispatch();
  const wellnessData = useSelector((state) => state.wellnessrules);
  const [underutilized, setUnderutilized] = useState(null);
  const [healthy, setHealthy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]); // Default range values

  useEffect(() => {
    if (wellnessData && wellnessData.length > 0) {
      setValues([]);
      setValues([
        parseInt(wellnessData[0].underutilized),
        parseInt(wellnessData[0].healthy),
      ]);
      setUnderutilized(wellnessData[0].underutilized);
      setHealthy(wellnessData[0].healthy);
      setLoading(false);
    } else {
      setValues([0, 0]);
      setLoading(false);
    }
  }, [wellnessData]); // Dependency on wellnessData

  const getWellnessData = async () => {
    setLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getWellnessRules(orgId);
      console.log("wellness response", response.data);
      const wellnesslist = response.data;
      setValues([
        parseInt(wellnesslist[0].underutilized),
        parseInt(wellnesslist[0].healthy),
      ]);
      setUnderutilized(wellnesslist[0].underutilized);
      setHealthy(wellnesslist[0].healthy);
      dispatch(storeWellnessRules(wellnesslist));
    } catch (error) {
      dispatch(storeWellnessRules([]));
      CommonToaster(error?.response?.data?.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    if (values[0] === underutilized && values[1] === healthy) {
      CommonToaster("No changes found", "error");
      return;
    }
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const payload = {
      underutilized: values[0],
      healthy: values[1],
      overburdened: 24,
    };
    try {
      const response = await updateWellnessRules(orgId, payload);
      CommonToaster("Updated", "success");
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      getWellnessData();
    }
  };

  return (
    <>
      {loading || mainloader ? (
        <Loader />
      ) : (
        <div>
          <p className="settings_workplaceheading">Wellness Rules</p>
          <p className="settings_workplacecontent">
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
          <div>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div className="workplace_detailsContainer">
                  <div className="workplace_UndertooltipCircle" />
                  <p>Underutilized: 0hr to {values[0]}hr</p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div className="workplace_detailsContainer">
                  <div className="workplace_healthytooltipCircle" />
                  <p>
                    Healthy: {values[0]}hr:1m to {values[1]}hr
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div className="workplace_detailsContainer">
                  <div className="workplace_overburnedtooltipCircle" />
                  <p>Overburdened: {values[1]}hr:1m to 24hr</p>
                </div>
              </Col>
            </Row>
          </div>

          <button className="workplace_savechangesbutton" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}
    </>
  );
};

export default Workplace;
