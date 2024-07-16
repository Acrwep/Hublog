import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../../Components/Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import { GiLotus } from "react-icons/gi";
import "./styles.css";
import CommonSelectField from "../../Components/Common/CommonSelectField";

const Wellness = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [{ id: 1, name: "Operation" }];

  const OverallWellness = [15, 6];
  const TopHealthy = [10, 20, 40];
  const TopOverburdened = [20, 40, 30];
  const TopUnderutilized = [80, 20, 40];

  const xasis = [
    "Branch Operation",
    "External HR",
    "Internal HR",
    "Operation",
    "Quality",
    "SEO",
    "Sales",
  ];

  const series = [
    {
      name: "Health",
      data: [18, 20, 35, 45, 20, 18, 30],
    },
    {
      name: "Overburdened",
      data: [3, 2, 12, 17, 12, 30, 20],
    },
    {
      name: "Underutilized",
      data: [14, 10, 10, 15, 16, 10, 13],
    },
  ];

  const barchartColors = ["#25a17d", "#ABB3B3", "#4FA2C7"];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <GiLotus size={20} />
        </div>
        <h2 className="allpage_mainheadings">Wellness</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Healthy employees</p>
            <p className="userproductivity_contents">30.61%</p>
            <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "bold" }}>
                16.66%
              </span>{" "}
              Less than previous day
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Working time</p>
            <p className="userproductivity_contents">133h:03m</p>
            <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "bold" }}>
                16.66%
              </span>{" "}
              Less than previous day
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Overburdened employee</p>
            <p className="wellness_employeename">LAVANYA K</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Overburdened employee</p>
            <p className="wellness_employeename">LAVANYA K</p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Overall Wellness</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["Healthy", "Overburdened"]}
                colors={["#25a17d", "#ABB3B3"]}
                series={OverallWellness}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Healthy</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["External HR", "SEO", "Quality"]}
                colors={["#258ea1", "#5976B3", "#25a17d"]}
                series={TopHealthy}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Overburdened</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["External HR", "Sales", "Quality"]}
                colors={["#258ea1", "#EA87C0", "#25a17d"]}
                series={TopOverburdened}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Underutilized</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["SEO", "Quality", "Branch Operation"]}
                colors={["#5976B3", "#25a17d", "#F5BD7D"]}
                series={TopUnderutilized}
                labelsfontSize="17px"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Team Wise Utilization</p>
          <CommonBarChart
            xasis={xasis}
            series={series}
            colors={barchartColors}
          />
        </div>
      </div>
    </div>
  );
};

export default Wellness;
