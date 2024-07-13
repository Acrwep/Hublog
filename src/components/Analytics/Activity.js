import React, { useState } from "react";
import { Row, Col, Button, Tooltip, Progress, Flex } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../Common/CommonDonutChart";
import CommonBarChart from "../Common/CommonBarChart";
import { MdRocketLaunch } from "react-icons/md";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import { FiActivity } from "react-icons/fi";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";

const Activity = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [{ id: 1, name: "Operation" }];

  const OverallWellness = [15, 6];
  const TopHealthy = [10, 20, 40];
  const TopOverburdened = [20, 40, 30];
  const TopUnderutilized = [80, 20, 40];

  const xasis = [
    "SEO",
    "External HR",
    "Internal HR",
    "Branch Operation",
    "Quality",
    "Operation",
    "Sales",
  ];

  const series = [
    {
      name: "Active time",
      data: [3.0, 3.5, 5.5, 6.75, 9.0, 2.5, 4.25],
    },
    {
      name: "Idle time",
      data: [2.72, 4.42, 2.0, 2.58, 1.5, 5.0, 3.5], // Representing hours and minutes in decimal format
    },
  ];

  const barchartColors = ["#25a17d", "#ABB3B3"];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  const productiveTeamsItems = [
    { id: 1, name: "INTERNAL HR", percentage: 90 },
    { id: 2, name: "EXTERNAL HR", percentage: 85 },
    { id: 3, name: "SEO", percentage: 75 },
  ];
  const nonProductiveteamsItems = [
    { id: 1, name: "OPERATION", percentage: 30 },
    { id: 2, name: "QUALITY", percentage: 20 },
    { id: 3, name: "Sales", percentage: 10 },
  ];
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <FiActivity size={20} />
        </div>
        <h2 className="allpage_mainheadings">Activity</h2>
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
              {/* <CommonDatePicker onChange={onDateChange} value={date} /> */}
              <CommonDoubleDatePicker />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
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
            <p>Productivity</p>
            <p className="userproductivity_contents">41.69%</p>
            <p className="userproductivity_hours">388h:49m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Application</p>
            <p className="userproductivity_contents">Chrome</p>
            <p className="userproductivity_hours">346h:32m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top URL</p>
            <p className="userproductivity_contents">
              https://web.whatsapppppp
            </p>
            <p className="userproductivity_hours">174h:42m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Category</p>
            <p className="userproductivity_contents">Internet</p>
            <p className="userproductivity_hours">661h:44m</p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Online Time Breakdown</p>

              <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">Total online time</p>
                  <p className="totalactive_time">826h 39m</p>
                  <p className="totalactive_timeheading">For the last 7 days</p>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">Average online time</p>
                  <p className="totalactive_time">4h 55m</p>
                  <p className="totalactive_timeheading">Average per day</p>
                </Col>
              </Row>
              <CommonDonutChart
                labels={["Active time", "Idle time"]}
                colors={["#25a17d", "#ABB3B3"]}
                series={OverallWellness}
                labelsfontSize="17px"
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Activity Level Breakdown</p>

              <CommonDonutChart
                labels={["Healthy", "Overburdened"]}
                colors={["#25a17d", "#ABB3B3"]}
                series={OverallWellness}
                labelsfontSize="15px"
                style={{
                  marginTop: "97px",
                }}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={10} lg={10}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Activity outliers</p>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <PiCellSignalHighFill
                  color="#25a17d"
                  size={22}
                  style={{ marginRight: "12px" }}
                />
                <p className="mostproductive_heading">Most active Team(s)</p>
              </div>

              <div style={{ marginTop: "15px" }}>
                {productiveTeamsItems.map((item) => (
                  <Row>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p style={{ fontWeight: 500 }}>{item.name}</p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Flex gap="small" vertical>
                        <Progress percent={item.percentage} />
                      </Flex>
                    </Col>
                  </Row>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <PiCellSignalLowFill
                  color="#e93b3a"
                  size={22}
                  style={{ marginRight: "12px" }}
                />
                <p className="mostproductive_heading">Least active Team(s)</p>
              </div>
              <div style={{ marginTop: "15px" }}>
                {productiveTeamsItems.map((item) => (
                  <Row>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p style={{ fontWeight: 500 }}>{item.name}</p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Flex gap="small" vertical>
                        <Progress percent={item.percentage} />
                      </Flex>
                    </Col>
                  </Row>
                ))}
              </div>
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
            timebased="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;
