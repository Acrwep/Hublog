import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Progress, Flex, Tooltip, Skeleton } from "antd";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../../Common/CommonDonutChart";
import CommonBarChart from "../../Common/CommonBarChart";
import { useSelector } from "react-redux";
import "../styles.css";
import { parseTimeToDecimal } from "../../Common/Validation";
import CommonNodatafound from "../../Common/CommonNodatafound";

const ActivitySummary = ({
  totalActivity,
  totalActivityTime,
  totalBreakdownOnlineTime,
  breakdownAverageTime,
  topAppName,
  topAppUsageTime,
  topUrlName,
  topUrlUsageTime,
  topCategoryName,
  topCategoryUsageTime,
  isBreakdownEmpty,
  loading,
}) => {
  const breakdownData = useSelector((state) => state.activitybreakdown);
  const teamLevelbreakdownData = useSelector(
    (state) => state.activityteamlevelbreakdown
  );
  const teamwiseActivityData = useSelector((state) => state.teamwiseactivity);
  const mostActivityTeams = useSelector((state) => state.mostactivityteams);
  const leastActivityTeams = useSelector((state) => state.leastactivityteams);

  const OverallWellness = [15, 6];

  const xasis = teamwiseActivityData.map((item) => item.team_name);

  const series = [
    {
      name: "Active time",
      data: teamwiseActivityData.map((item) => {
        return parseTimeToDecimal(item.active_time);
      }),
    },
    {
      name: "Idle time",
      data: teamwiseActivityData.map((item) => {
        return parseTimeToDecimal(item.idle_duration);
      }),
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
                <p>Activity</p>
                <p className="userproductivity_contents">
                  {totalActivity === "-"
                    ? "-"
                    : totalActivity === 0
                    ? "0%"
                    : totalActivity.toFixed(0) + "%"}
                </p>
                <p className="userproductivity_hours">{totalActivityTime}</p>
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
          <Col xs={24} sm={24} md={7} lg={7}>
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
                  <p className="devices_chartheading">Online Time Breakdown</p>
                  {isBreakdownEmpty === false ? (
                    <>
                      <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalactive_timeheading">
                            Total online time
                          </p>
                          <p className="totalactive_time">
                            {totalBreakdownOnlineTime}
                          </p>
                          <p className="totalactive_timeheading">
                            For the selected range
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalactive_timeheading">
                            Average online time
                          </p>
                          <p className="totalactive_time">
                            {breakdownAverageTime}
                          </p>
                          <p className="totalactive_timeheading">
                            Average per day
                          </p>
                        </Col>
                      </Row>
                      <CommonDonutChart
                        labels={["Active time", "Idle time"]}
                        colors={["#25a17d", "#ABB3B3"]}
                        series={breakdownData}
                        timebased="true"
                        labelsfontSize="16px"
                        height={300}
                      />
                    </>
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>

          <Col xs={24} sm={24} md={7} lg={7}>
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
                  <p className="devices_chartheading">
                    Team Level Activity Breakdown
                  </p>
                  <CommonDonutChart
                    labels={["75-100%", "50-75%", "<50%"]}
                    colors={["#25a17d", "rgba(20,94,240,0.70)", "#ABB3B3"]}
                    series={teamLevelbreakdownData}
                    labelsfontSize="16px"
                    style={{
                      marginTop: "97px",
                    }}
                  />
                </>
              )}
            </div>
          </Col>

          <Col xs={24} sm={24} md={10} lg={10}>
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
                    <p className="mostproductive_heading">
                      Most active Team(s)
                    </p>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    {mostActivityTeams.length >= 1 ? (
                      <>
                        {mostActivityTeams.map((item, index) => (
                          <React.Fragment key={index}>
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
                                    percent={Math.floor(item.activeTimePercent)}
                                    format={(percent) => (
                                      <span style={{ color: "#1f1f1f" }}>
                                        {percent}%
                                      </span>
                                    )}
                                  />
                                </Flex>
                              </Col>
                            </Row>
                          </React.Fragment>
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
                      size={22}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Least active Team(s)
                    </p>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {leastActivityTeams.length >= 1 ? (
                      <>
                        {leastActivityTeams.map((item, index) => (
                          <React.Fragment key={index}>
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
                                    percent={Math.floor(item.activeTimePercent)}
                                    format={(percent) => (
                                      <span style={{ color: "#1f1f1f" }}>
                                        {percent}%
                                      </span>
                                    )}
                                  />
                                </Flex>
                              </Col>
                            </Row>
                          </React.Fragment>
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
              <p className="devices_chartheading">
                Team wise Activity Breakdown
              </p>
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

export default ActivitySummary;
