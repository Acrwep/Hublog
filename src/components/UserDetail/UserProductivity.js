import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
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
}) {
  const breakdownData = useSelector((state) => state.productivitybreakdown);
  const columns = [
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: 100,
    },
    {
      title: "Online time",
      dataIndex: "onlinetime",
      key: "onlinetime",
      width: 120,
    },
    {
      title: "Productive Time",
      dataIndex: "productivetime",
      key: "productivetime",
      width: 120,
    },
    {
      title: "Unproductive Time",
      dataIndex: "unproductivetime",
      key: "unproductivetime",
      width: 120,
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
    {
      key: "2",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
    {
      key: "3",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
  ]);

  const series = [2.72, 3.0, 1.1];

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                <p>Top Application</p>
                <p className="userproductivity_contents">Chrome</p>
                <p className="userproductivity_hours">14h:47m</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div className="userproductivity_topContainers">
                <p>Top Urls</p>
                <p className="userproductivity_contents">
                  https://ads.google.com/
                </p>
                <p className="userproductivity_hours">14h:47m</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                <p>Top Category</p>
                <p className="userproductivity_contents">Internet</p>
                <p className="userproductivity_hours">14h:47m</p>
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
                {isBreakdownEmpty === false ? (
                  <>
                    <p className="userproductivity_chartheading">
                      Productivity Breakdown
                    </p>
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
              dataSource={dummydatas}
              scroll={{ x: 600 }}
              dataPerPage={10}
              checkBox="false"
            />
          </div>
        </div>
      )}
    </>
  );
}
