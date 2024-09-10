import React, { useState } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import "./styles.css";
import ReactApexChart from "react-apexcharts";

const Summary = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [{ id: 1, name: "Operation" }];

  const OverallWellness = [15, 6];
  const TopHealthy = [10, 20, 40];
  const TopOverburdened = [20, 40, 30];
  const TopUnderutilized = [80, 20, 40];

  const attendanceTrendsXasis = [
    "23/06/24",
    "24/06/24",
    "25/06/24",
    "26/06/24",
  ];

  const attendanceTrendsSeries = [
    { name: "Present", data: [12, 10, 20, 30] },
    { name: "Absent", data: [5, 6, 10, 12] },
  ];
  const attendanceTrendsColors = ["#25a17d", "#ABB3B3"];

  const lateArrivalSeries = [
    { name: "On time arrivals", data: [12, 10, 20, 30] },
    { name: "Late arrivals", data: [5, 6, 10, 12] },
  ];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  const datas = {
    series: [
      {
        name: "Active Time",
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "2024-02-01",
          "2024-02-02",
          "2024-02-03",
          "2024-02-04",
          "2024-02-05",
          "2024-02-06",
        ],
        title: {
          text: "",
        },
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        forceNiceScale: true,
      },
      colors: ["#25a17d", "#F44336"], // Blue for Active Time, Red for Idle Time
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDoubleDatePicker />
            </div>
            <Tooltip placement="top" title="Download">
              <Button className="dashboard_download_button">
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Attendance %</p>
            <p className="userproductivity_contents">41.69%</p>
            <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "600" }}>0.14%</span>{" "}
              More than last period
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Late Arrivals</p>
            <p className="userproductivity_contents">0%</p>
            <p className="userproductivity_hours">same as previous day</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Break time</p>
            <p className="userproductivity_contents">70h:12m</p>
            <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "600" }}>
                82h:22m
              </span>{" "}
              Less than last period
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Working time</p>
            <p className="userproductivity_contents">575h:04m</p>
            <p className="userproductivity_hours">
              <span style={{ color: "#e93b3a", fontWeight: "600" }}>
                82h:22m
              </span>{" "}
              Less than last period
            </p>{" "}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Today's Attendance</p>

              <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">On time arrivals</p>
                  <p className="totalactive_time">14</p>
                  <p className="totalactive_timeheading">100%</p>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">Late arrivals</p>
                  <p className="totalactive_time">0</p>
                  <p className="totalactive_timeheading">0%</p>
                </Col>
              </Row>
              <CommonDonutChart
                labels={["Present", "Absent"]}
                colors={["#25a17d", "#ABB3B3"]}
                series={OverallWellness}
                labelsfontSize="17px"
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={17} lg={17}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Activity Level Breakdown</p>
              <CommonBarChart
                xasis={attendanceTrendsXasis}
                series={attendanceTrendsSeries}
                colors={attendanceTrendsColors}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={16} style={{ marginTop: "25px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Break Trends</p>
            <ReactApexChart
              options={datas.options}
              series={datas.series}
              type="line"
              height={300}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Late Arrival Tendency</p>
            <CommonBarChart
              xasis={attendanceTrendsXasis}
              series={lateArrivalSeries}
              colors={["#25a17d", "#ABB3B3"]}
            />
          </div>
        </Col>
      </Row>
      {/* <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Team Wise Utilization</p>
          <CommonBarChart
            xasis={xasis}
            series={series}
            colors={barchartColors}
            timebased="true"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Summary;
