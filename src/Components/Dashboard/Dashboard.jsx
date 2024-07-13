import React from "react";
import DoughnutChart from "../chart/DoughnutChart";
import { Row, Col, Tooltip, Button, Flex, Progress } from "antd";
import ReactApexChart from "react-apexcharts";
// import BarChart from '../Components/chart/BarChart';
import LineChart from "../chart/LineChart";
import Dropdown from "../dropdown/Dropdown";
import { MdRefresh } from "react-icons/md";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../Common/CommonDonutChart";
import DateRangePicker from "../dateRangePicker/DatePicker";
import { LineCharts } from "../chart/RangeChart";
import { MdDashboardCustomize } from "react-icons/md";
import MyTable, { MyTable2 } from "../table/DemoTable";
import "./styles.css";
// import { Progress } from 'antd';
// import { DatePicker } from 'antd';

const Dashboard = () => {
  // Sample data for charts

  const lineData = {
    dates: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-06"],
    present: [40, 30, 35, 50, 40, 35, 10],
    absent: [10, 20, 15, 0, 10, 15, 40],
    attendancePercentage: [80, 65, 70, 75, 85, 70, 65],
    averageWorkingHours: [6.5, 6.7, 7.0, 9, 7.2, 8, 7.1],
  };

  const lineData1 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    // activeTime: [45, 51, 30, 30, 64, 55],
    // idealTime: [35, 41, 20, 19, 44, 45],

    datasets: [
      {
        label: "Active Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Ideal Time",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const lineData2 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    datasets: [
      {
        label: "Productive Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "UnProductive Time",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(0, 0, 0, 1)",
      },
      {
        label: "Natural Time",
        data: [40, 35, 30, 28, 54, 50],
        borderColor: "rgba(0, 0, 255, 1)",
      },
    ],
  };

  const options = {
    chart: {
      type: "line", // Default type, can be overridden in series
      height: 350,
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2], // Enable data labels only for the third series
    },
    labels: [
      "01/01/2023",
      "02/01/2023",
      "03/01/2023",
      "04/01/2023",
      "05/01/2023",
      "06/01/2023",
      "07/01/2023",
      "08/01/2023",
      "09/01/2023",
      "10/01/2023",
      "11/01/2023",
      "12/01/2023",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Values",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const series = [
    {
      name: "Column Series",
      type: "column",
      data: [23, 34, 45, 56, 67, 78, 89, 90, 100, 110, 120, 130],
    },
    {
      name: "Area Series",
      type: "area",
      data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132],
    },
    {
      name: "Line Series",
      type: "line",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    },
  ];

  const productiveTeamsItems = [
    { id: 1, name: "INTERNAL HR", percentage: 90 },
    { id: 2, name: "EXTERNAL HR", percentage: 85 },
    { id: 3, name: "SEO", percentage: 75 },
  ];

  var activityTrend = {
    series: [
      {
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
      {
        name: "Total Visits",
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "Page Statistics",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <div className="max-sm:p-0" style={{ padding: "19px 26px" }}>
      <div className="flex justify-start items-center">
        <div className="dashboard_iconContainer">
          <MdDashboardCustomize size={20} className="attendance_icon" />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Dashboard
        </h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <DateRangePicker />
          </div>
          <Tooltip placement="top" title="Download PDF">
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
      </div>

      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Today's Attendance</p>

              <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">On time arrivals</p>
                  <p className="totalactive_time">2</p>
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
                series={[12, 20]}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={17} lg={17}>
            <div className="devices_chartsContainer">
              {/* <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={350}
              /> */}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              <p>Hiii</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={9} lg={9}>
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
          <Col xs={24} sm={24} md={9} lg={8}>
            <div className="devices_chartsContainer">
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
                <p className="mostproductive_heading">Most active Team(s)</p>
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
                <p className="mostproductive_heading">Least active Team(s)</p>
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
      <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
        <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:w-full max-sm:p-0">
          <h3 className="mb-3">Activity Trend</h3>
          <div className=" h-72">
            <hr />
            {/* <LineCharts data={lineData1} /> */}
            <ReactApexChart
              options={activityTrend}
              series={series}
              height={350}
            />
          </div>
        </div>
        <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:grid-cols-1 max-sm:p-0">
          <h3 className="mb-3">Productivity Trend</h3>
          <div className="">
            <hr />
            <LineCharts data={lineData2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
