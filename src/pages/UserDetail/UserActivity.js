import React, { useState } from "react";
import { Row, Col } from "antd";
import CommonTable from "../../components/Common/CommonTable";
import ReactApexChart from "react-apexcharts";
import "./styles.css";
import CommonDonutChart from "../../components/Common/CommonDonutChart";

export default function UserActivity() {
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

  const series = [9.72, 4.0];

  return (
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
            <p className="userproductivity_contents">https://ads.google.com/</p>
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
        <p className="userproductivity_chartheading">Online Time Breakdown</p>
        <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={6}>
            <p className="totalproductive_timeheading">Total productive time</p>
            <p className="totalproductive_time">17h 51m</p>
            <p className="totalproductive_timeheading">For the last 7 days</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18}>
            <p className="totalproductive_timeheading">
              Average productive time
            </p>
            <p className="totalproductive_time">2h 51m</p>
            <p className="totalproductive_timeheading">Average per day</p>
          </Col>
        </Row>
        <CommonDonutChart
          labels={["Productive time", "Unproductive time"]}
          colors={["#25a17d", "#7A7D7C"]}
          series={series}
          timebased={true}
          labelsfontSize="14px"
        />
      </div>

      <div className="userattendancetable_Container">
        <p style={{ fontWeight: 600, fontSize: "17px", marginBottom: "10px" }}>
          Detail
        </p>

        <CommonTable
          columns={columns}
          dataSource={dummydatas}
          scroll={{ x: 600 }}
          dataPerPage={4}
        />
      </div>
    </div>
  );
}
