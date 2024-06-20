import React, { useState } from "react";
import { Col, Row } from "antd";
import ReactApexChart from "react-apexcharts";
import moment from "moment/moment";
import CommonTable from "../../components/Common/CommonTable";
import "./styles.css";
import CommonMonthlyCalendar from "../../components/Common/CommonMonthlyCalendar";

export default function UserAttendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const columns = [
    { title: "Date", dataIndex: "date", key: "date", width: 140 },
    { title: "In", dataIndex: "in", key: "in", width: 120 },
    { title: "Out", dataIndex: "out", key: "out", width: 120 },
    { title: "Duration", dataIndex: "duration", key: "duration", width: 120 },
    { title: "Logs", dataIndex: "logs", key: "logs", width: 120 },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      date: "17-06-2024",
      in: "09:14 AM",
      out: "06:32 PM",
      duration: "8h:02min",
    },
    {
      key: "2",
      date: "17-06-2024",
      in: "09:14 AM",
      out: "06:32 PM",
      duration: "8h:02min",
    },
    {
      key: "3",
      date: "17-06-2024",
      in: "09:14 AM",
      out: "06:32 PM",
      duration: "8h:02min",
    },
  ]);

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Present", "Absent"],
    colors: ["#25a17d", "#7A7D7C"], // Blue and Gray colors
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
              fontWeight: 600, // Increase font weight
              fontSize: "19px",
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              fontWeight: 700, // Increase font weight
              formatter: function (val) {
                return val; // Display value in the tooltip
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val; // Display value in the tooltip
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };
  const presentCount = 30;
  const absentCount = 20;
  const series = [presentCount, absentCount];

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="userdetail_calendarContainer">
            <p className="userattendance_heading">Attendance</p>
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={270}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="userdetail_calendarsContainer">
            <p className="userattendance_heading">Monthly Attendance</p>
            <CommonMonthlyCalendar />
          </div>
        </Col>
      </Row>

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
