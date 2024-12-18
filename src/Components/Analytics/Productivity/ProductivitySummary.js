import React, { useEffect, useState } from "react";
import { Row, Col, Progress, Flex, Tooltip, Divider, Skeleton } from "antd";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../../Common/CommonDonutChart";
import CommonBarChart from "../../Common/CommonBarChart";
import { useSelector } from "react-redux";
import "../styles.css";
import CommonNodatafound from "../../Common/CommonNodatafound";

const ProductivitySummary = ({
  totalProductivityTime,
  breakdownTotalDuration,
  breakdownAverageTime,
  totalProductivity,
  topAppName,
  topAppUsageTime,
  topUrlName,
  topUrlUsageTime,
  topCategoryName,
  topCategoryUsageTime,
  isBreakdownEmpty,
  loading,
}) => {
  const breakdownData = useSelector((state) => state.productivitybreakdown);
  const teamwiseData = useSelector((state) => state.teamwiseproductivity);
  const mostProductivityTeams = useSelector(
    (state) => state.mostproductivityteams
  );
  const leastProductivityTeams = useSelector(
    (state) => state.leastproductivityteams
  );

  const xasis = teamwiseData.map((item) => item.teamName);

  const parseTimeToDecimal = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };
  const series = [
    {
      name: "Productivity time",
      data: teamwiseData.map((item) => {
        return parseTimeToDecimal(item.totalProductiveDuration);
      }),
    },
    {
      name: "Neutral time",
      data: teamwiseData.map((item) => {
        return parseTimeToDecimal(item.totalNeutralDuration);
      }),
    },
    {
      name: "Unproductive time",
      data: teamwiseData.map((item) => {
        return parseTimeToDecimal(item.totalUnproductiveDuration);
      }),
    },
  ];

  const barchartColors = ["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"];

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Productivity</p>
                <p className="userproductivity_contents">{totalProductivity}</p>
                <p className="userproductivity_hours">
                  {totalProductivityTime}
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top Application</p>
                <p className="userproductivity_contents">{topAppName}</p>
                <p className="userproductivity_hours">{topAppUsageTime}</p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top URL</p>
                <Tooltip placement="top" title={`https://${topUrlName}`}>
                  <p className="userproductivity_contents">
                    {topUrlName === "-"
                      ? topUrlName
                      : `${
                          topUrlName === "localhost" ? "http://" : "https://"
                        }${topUrlName}`}
                  </p>
                </Tooltip>
                <p className="userproductivity_hours">{topUrlUsageTime}</p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top Category</p>
                <p className="userproductivity_contents">{topCategoryName}</p>
                <p className="userproductivity_hours">{topCategoryUsageTime}</p>
              </>
            )}
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
                  style={{ height: "45vh" }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Productivity Breakdown</p>
                  {isBreakdownEmpty === false ? (
                    <>
                      <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalproductive_timeheading">
                            Total productive time
                          </p>
                          <p className="totalproductive_time">
                            {breakdownTotalDuration}
                          </p>
                          <p className="totalproductive_timeheading">
                            For the selected range
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
              {loading ? (
                <Skeleton
                  active
                  style={{ height: "45vh" }}
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
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
                    {mostProductivityTeams.length >= 1 ? (
                      <>
                        {mostProductivityTeams.map((item, index) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>
                                {index + 1 + ")" + " " + item.team_name}
                              </p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  strokeColor="#25a17d"
                                  percent={Math.floor(item.productive_percent)}
                                  format={(percent) => (
                                    <span style={{ color: "#1f1f1f" }}>
                                      {percent}%
                                    </span>
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
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
                    {leastProductivityTeams.length >= 1 ? (
                      <>
                        {leastProductivityTeams.map((item, index) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>
                                {index + 1 + ")" + " " + item.team_name}
                              </p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  strokeColor="rgba(244, 67, 54, 0.62)"
                                  percent={Math.floor(item.productive_percent)}
                                  format={(percent) => (
                                    <span style={{ color: "#1f1f1f" }}>
                                      {percent}%
                                    </span>
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          {loading ? (
            <div style={{ height: "45vh" }}>
              <Skeleton
                active
                title={{ width: 140 }}
                paragraph={{
                  rows: 0,
                }}
              />
            </div>
          ) : (
            <>
              <p className="devices_chartheading">Team Wise Utilization</p>
              <CommonBarChart
                xasis={xasis}
                series={series}
                colors={barchartColors}
                timebased="true"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductivitySummary;
