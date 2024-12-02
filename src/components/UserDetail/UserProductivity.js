import React, { useState } from "react";
import { Row, Col, Skeleton, Tooltip, Flex, Progress } from "antd";
import CommonTable from "../../Components/Common/CommonTable";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import Loader from "../Common/Loader";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";
import { useSelector } from "react-redux";

export default function UserProductivity({
  breakdownTotalDuration,
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
    // {
    //   title: "Employee",
    //   dataIndex: "FullName",
    //   key: "FullName",
    //   width: 240,
    //   fixed: "left",
    //   render: (text, record) => {
    //     return (
    //       <div className="breakreport_employeenameContainer">
    //         <CommonAvatar avatarSize={28} itemName={text} />
    //         <p className="reports_avatarname">{text}</p>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Attendance",
      dataIndex: "AttendanceCount",
      key: "AttendanceCount",
      width: "150px",
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
      title: "Break time",
      dataIndex: "break_duration",
      key: "break_duration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity time",
      dataIndex: "TotalProductiveDuration",
      key: "TotalProductiveDuration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Neutral time",
      dataIndex: "TotalNeutralDuration",
      key: "TotalNeutralDuration",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Unproductivity time",
      dataIndex: "TotalUnproductiveDuration",
      key: "TotalUnproductiveDuration",
      width: "180px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity",
      dataIndex: "PercentageProductiveDuration",
      key: "PercentageProductiveDuration",
      width: "170px",
      fixed: "right",
      render: (text) => {
        return (
          <Flex gap="small" vertical>
            <Progress percent={Math.floor(text)} strokeColor="#25a17d" />
          </Flex>
        );
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
                        <p className="totalproductive_time">2h 8m</p>
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
                      labelsfontSize="14px"
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
              scroll={{ x: 600 }}
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
