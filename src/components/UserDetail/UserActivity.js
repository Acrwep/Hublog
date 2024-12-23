import React, { useState } from "react";
import { Row, Col, Skeleton, Tooltip, Flex, Progress } from "antd";
import CommonTable from "../../Components/Common/CommonTable";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../Common/CommonAvatar";
import Loader from "../Common/Loader";
import "./styles.css";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonNodatafound from "../Common/CommonNodatafound";

export default function UserActivity({
  loading,
  filterLoading,
  topAppName,
  topAppUsageTime,
  topUrlName,
  topUrlUsageTime,
  topCategoryName,
  topCategoryUsageTime,
  totalBreakdownOnlineTime,
  activityBreakdownAverageTime,
  activityBreakdownData,
  activityEmployeesData,
  isActivityBreakdownEmpty,
}) {
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
      width: "150px",
      render: (text, record) => {
        if (text === null) {
          return 0;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Online time",
      dataIndex: "online_duration",
      key: "online_duration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Active time",
      dataIndex: "activeTime",
      key: "activeTime",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Idle time",
      dataIndex: "idleDuration",
      key: "idleDuration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "breakDuration",
      key: "breakDuration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Activity",
      dataIndex: "activePercentage",
      key: "activePercentage",
      width: "170px",
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
                <p className="userproductivity_chartheading">
                  Online Time Breakdown
                </p>
                {isActivityBreakdownEmpty === false ? (
                  <>
                    <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                      <Col xs={24} sm={24} md={24} lg={6}>
                        <p className="totalproductive_timeheading">
                          Total productive time
                        </p>
                        <p className="totalproductive_time">
                          {totalBreakdownOnlineTime}
                        </p>
                        <p className="totalproductive_timeheading">
                          For the selected range
                        </p>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={18}>
                        <p className="totalproductive_timeheading">
                          Average productive time
                        </p>
                        <p className="totalproductive_time">
                          {activityBreakdownAverageTime}
                        </p>
                        <p className="totalproductive_timeheading">
                          Average per day
                        </p>
                      </Col>
                    </Row>
                    <CommonDonutChart
                      labels={["Active time", "Idle time"]}
                      colors={["#25a17d", "#ABB3B3"]}
                      series={activityBreakdownData}
                      timebased="true"
                      labelsfontSize="15px"
                      height={280}
                    />
                  </>
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>

          <div className="userattendancetable_Container">
            <p
              style={{
                fontWeight: 600,
                fontSize: "17px",
                marginBottom: "10px",
              }}
            >
              Detail
            </p>

            <CommonTable
              columns={columns}
              dataSource={activityEmployeesData}
              scroll={{ x: 1200 }}
              dataPerPage={10}
              size="small"
              bordered="false"
              checkBox="false"
              loading={filterLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
