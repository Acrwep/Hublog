import React, { useState } from "react";
import { Row, Col, Skeleton, Tooltip, Flex, Progress } from "antd";
import CommonTable from "../../Components/Common/CommonTable";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import Loader from "../Common/Loader";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";
import { useSelector } from "react-redux";
import CommonAvatar from "../Common/CommonAvatar";

export default function UserProductivity({
  breakdownTotalDuration,
  breakdownAverageTime,
  isBreakdownEmpty,
  loading,
  filterLoading,
  topAppName,
  topAppUsageTime,
  topUrlName,
  topUrlUsageTime,
  topCategoryName,
  topCategoryUsageTime,
  productivityEmployeesData,
}) {
  const breakdownData = useSelector((state) => state.productivitybreakdown);
  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: 240,
      fixed: "left",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={28} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attendanceCount",
      key: "attendanceCount",
      width: 140,
      render: (text, record) => {
        if (text === null) {
          return 0;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Working time",
      dataIndex: "total_wokingtime",
      key: "total_wokingtime",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Online time",
      dataIndex: "onlineDuration",
      key: "onlineDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "breakDuration",
      key: "breakDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity time",
      dataIndex: "totalProductiveDuration",
      key: "totalProductiveDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Neutral time",
      dataIndex: "totalNeutralDuration",
      key: "totalNeutralDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Unproductivity time",
      dataIndex: "totalUnproductiveDuration",
      key: "totalUnproductiveDuration",
      width: 170,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity",
      dataIndex: "percentageProductiveDuration",
      key: "percentageProductiveDuration",
      width: 150,
      fixed: "right",
      render: (text) => {
        if (text === null) {
          return (
            <Flex gap="small" vertical>
              <Progress percent={0} strokeColor="#25a17d" />
            </Flex>
          );
        } else {
          return (
            <Flex gap="small" vertical>
              <Progress
                percent={Math.floor(text)}
                strokeColor="#25a17d"
                format={(percent) => (
                  <span style={{ color: "#1f1f1f" }}>{percent}%</span>
                )}
              />
            </Flex>
          );
        }
      },
    },
  ];

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
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
            <Col xs={24} sm={24} md={24} lg={12}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
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
                    <p>Top Urls</p>
                    <Tooltip placement="top" title={`https://${topUrlName}`}>
                      <p className="userproductivity_contents">
                        {topUrlName === "-"
                          ? topUrlName
                          : `${
                              topUrlName === "localhost"
                                ? "http://"
                                : "https://"
                            }${topUrlName}`}
                      </p>
                    </Tooltip>
                    <p className="userproductivity_hours">{topUrlUsageTime}</p>
                  </>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
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
                    <p className="userproductivity_contents">
                      {topCategoryName}
                    </p>
                    <p className="userproductivity_hours">
                      {topCategoryUsageTime}
                    </p>
                  </>
                )}
              </div>
            </Col>
          </Row>

          <div className="userproductivity_chartContainer">
            {filterLoading ? (
              <div style={{ height: "40vh" }}>
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
                <p className="userproductivity_chartheading">
                  Productivity Breakdown
                </p>
                {isBreakdownEmpty === false ? (
                  <>
                    <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Col xs={24} sm={24} md={24} lg={6}>
                        <p className="totalproductive_timeheading">
                          Total productive time
                        </p>
                        <p className="totalproductive_time">
                          {breakdownTotalDuration}
                        </p>
                        <p className="totalproductive_timeheading">
                          For the last 7 days
                        </p>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={18}>
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
                      colors={["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"]}
                      series={breakdownData}
                      timebased="true"
                      labelsfontSize="16px"
                    />
                  </>
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>

          <div className="userattendancetable_Container">
            <p style={{ fontWeight: 600, fontSize: "17px" }}>Detail</p>

            <CommonTable
              columns={columns}
              dataSource={productivityEmployeesData}
              scroll={{ x: 1400 }}
              dataPerPage={10}
              loading={filterLoading}
              size="small"
              checkBox="false"
            />
          </div>
        </div>
      )}
    </>
  );
}
