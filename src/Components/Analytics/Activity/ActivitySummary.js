import React, { useState } from "react";
import { Row, Col, Divider, Progress, Flex, Tooltip } from "antd";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../../Common/CommonDonutChart";
import CommonBarChart from "../../Common/CommonBarChart";
import "../styles.css";

const ActivitySummary = () => {
  const OverallWellness = [15, 6];

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

  const productiveTeamsItems = [
    { id: 1, name: "INTERNAL HR", percentage: 90 },
    { id: 2, name: "EXTERNAL HR", percentage: 85 },
    { id: 3, name: "SEO", percentage: 75 },
  ];
  return (
    <div>
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
            <Tooltip placement="top" title="https://web.whatsapppppp">
              <p className="userproductivity_contents">
                https://web.whatsapppppp
              </p>
            </Tooltip>
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
                  marginTop: "96px",
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

              <Divider className="productivity_outliersDivider" />

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

export default ActivitySummary;
