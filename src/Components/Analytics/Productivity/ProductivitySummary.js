import React, { useState } from "react";
import { Row, Col, Progress, Flex, Tooltip, Divider, Skeleton } from "antd";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../../Common/CommonDonutChart";
import CommonBarChart from "../../Common/CommonBarChart";
import { useSelector } from "react-redux";
import "../styles.css";
import CommonNodatafound from "../../Common/CommonNodatafound";

const ProductivitySummary = ({
  breakdownTotalDuration,
  breakdownAverageTime,
  isBreakdownEmpty,
  loading,
}) => {
  const breakdownData = useSelector((state) => state.productivitybreakdown);

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
      name: "Productive time",
      data: [2.72, 4.42, 5.5, 6.58, 7.5, 5.0, 3.5], // Representing hours and minutes in decimal format
    },
    {
      name: "Neutral",
      data: [2.17, 1.83, 1.83, 2.75, 2.67, 1.67, 2.08],
    },
    {
      name: "Unproductive time",
      data: [3.0, 3.5, 2.5, 3.75, 3.0, 2.5, 4.25],
    },
  ];

  const barchartColors = ["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"];

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
          <Col xs={24} sm={24} md={10} lg={10}>
            <div className="devices_chartsContainer">
              {loading ? (
                <Skeleton
                  active
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  {isBreakdownEmpty === false ? (
                    <>
                      <p className="devices_chartheading">
                        Productivity Breakdown
                      </p>

                      <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalproductive_timeheading">
                            Total productive time
                          </p>
                          <p className="totalproductive_time">
                            {breakdownTotalDuration}
                          </p>
                          <p className="totalproductive_timeheading">
                            For the selected days
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalproductive_timeheading">
                            Average productive time
                          </p>
                          <p className="totalproductive_time">
                            {breakdownAverageTime}
                          </p>
                          <p className="totalproductive_timeheading">
                            Average per day
                          </p>
                        </Col>
                      </Row>
                      <CommonDonutChart
                        labels={[
                          "Productive time",
                          "Neutral time",
                          "Unproductive time",
                        ]}
                        colors={[
                          "#25a17d",
                          "#8a8c8c",
                          "rgba(244, 67, 54, 0.82)",
                        ]}
                        series={breakdownData}
                        timebased="true"
                        labelsfontSize="16px"
                        height={325}
                      />
                    </>
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Productivity outliers</p>
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
                <p className="mostproductive_heading">
                  Most productive Team(s)
                </p>
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
                  size={23}
                  style={{ marginRight: "12px" }}
                />
                <p className="mostproductive_heading">
                  Least productive Team(s)
                </p>
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
export default ProductivitySummary;
