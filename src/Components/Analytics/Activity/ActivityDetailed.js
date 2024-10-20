import React, { useState } from "react";
import { Flex, Progress } from "antd";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import moment from "moment";

const ActivityDetailed = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // This makes it a Spline Area Chart
    },
    colors: ["#00e396", "#0791fb"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    tooltip: {
      x: {
        format: "MM",
      },
    },
    fill: {
      opacity: 0.3,
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Online time",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 147],
    },
    {
      name: "Break time",
      data: [23, 42, 35, 27, 43, 22, 31, 34, 52],
    },
  ]);

  const [splineAreaOptions, setSplineAreaOptions] = useState({
    chart: {
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // Spline for smooth curve
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    fill: {
      opacity: 0.3,
    },
    colors: ["#FF0000", "#000000"], // Red and Black colors for the spline area chart
  });

  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "straight", // Keeps the line straight for the line chart
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    colors: ["#25a17d", "#8a8c8c"], // Different colors for the three series
  };

  const [lineChartSeries, setLineChartSeries] = useState([
    {
      name: "Active time",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Idle time",
      data: [20, 30, 35, 40, 39, 50, 60, 81, 95],
    },
  ]);

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
            <CommonAvatar avatarSize={30} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: "150px",
    },
    {
      title: "Online time",
      dataIndex: "online_time",
      key: "online_time",
      width: "170px",
      // render: (text, record) => {
      //   if (text === "0001-01-01T00:00:00" || text === null) {
      //     return "00h:00m";
      //   }
      //   return <p>{moment(text, "HH:mm:ss").format("HH[h]:mm[m]")}</p>;
      // },
    },
    {
      title: "Active time",
      dataIndex: "active_time",
      key: "active_time",
      width: "170px",
    },
    {
      title: "Idle time",
      dataIndex: "idle_time",
      key: "idle_time",
      width: "180px",
    },
    {
      title: "Break time",
      dataIndex: "break_time",
      key: "break_time",
      width: "170px",
    },
    {
      title: "Activity",
      dataIndex: "activity_percentage",
      key: "activity_percentage",
      width: "170px",
      fixed: "right",
      render: (text) => {
        return (
          <Flex gap="small" vertical>
            <Progress percent={text} strokeColor="#25a17d" />
          </Flex>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      full_Name: "Balaji R",
      attendance: 2,
      online_time: "17h:16m",
      active_time: "00h:00m",
      idle_time: "00h:00m",
      break_time: "02h:18m:05s",
      activity_percentage: 20,
    },
  ];
  return (
    <div>
      <div className="devices_chartsContainer">
        <p className="devices_chartheading">Working Time Trends</p>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      </div>
      <div className="devices_chartsContainer" style={{ marginTop: "25px" }}>
        <p className="devices_chartheading">Productivity Trend</p>
        <ReactApexChart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={350}
        />
      </div>

      <div className="devices_chartsContainer" style={{ marginTop: "20px" }}>
        <p className="devices_chartheading">Employee List</p>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          dataPerPage={10}
          bordered="false"
          checkBox="false"
        />
      </div>
    </div>
  );
};
export default ActivityDetailed;
