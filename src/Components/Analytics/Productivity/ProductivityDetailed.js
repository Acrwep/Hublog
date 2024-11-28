import React, { useState } from "react";
import { Flex, Progress, Skeleton } from "antd";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import moment from "moment";
import { useSelector } from "react-redux";
import { parseTimeToDecimal } from "../../Common/Validation";
import CommonNodatafound from "../../Common/CommonNodatafound";

const ProductivityDetailed = ({ loading }) => {
  const worktimeTrendsData = useSelector(
    (state) => state.productivityworktimetrends
  );

  const formatTimeInHours = (value) => {
    const hours = Math.floor(value); // Only display whole hours
    return `${hours}hr`;
  };

  const formatTooltipTime = (value) => {
    if (isNaN(value) || value === null || value === undefined)
      return "0hr 0m 0s";
    const hours = Math.floor(value);
    const minutes = Math.floor((value % 1) * 60);
    const seconds = Math.floor(((value % 1) * 3600) % 60);
    return `${hours}hr ${minutes}m ${seconds}s`;
  };

  const worktimeTrendsXasis = worktimeTrendsData.map((item) =>
    moment(item.start_timing).format("DD/MM/YYYY")
  );

  const worktimeTrendsSeries = [
    {
      name: "Online time",
      data: worktimeTrendsData.map((item) => {
        return parseTimeToDecimal(item.active_duration);
      }),
    },
    {
      name: "Break time",
      data: worktimeTrendsData.map((item) => {
        return parseTimeToDecimal(item.break_duration);
      }),
    },
  ];

  const chartOptions = {
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
    xaxis: {
      categories: worktimeTrendsXasis,
      labels: {
        show: true,
        rotate: -45, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      trim: true,
    },
    colors: ["#00e396", "#0791fb"],
    labels: {
      show: true,
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatTimeInHours(value);
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex }) {
          // Show corresponding x-axis name and y value
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${formatTooltipTime(
            val
          )}</span>: `;
        },
      },
    },
    fill: {
      opacity: 0.3,
    },
  };

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
    colors: ["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"], // Different colors for the three series
  };

  const [lineChartSeries, setLineChartSeries] = useState([
    {
      name: "Productive",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Neutral",
      data: [20, 30, 35, 40, 39, 50, 60, 81, 95],
    },
    {
      name: "Unproductive",
      data: [10, 20, 25, 30, 29, 40, 50, 61, 75],
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
      title: "Productivity time",
      dataIndex: "productivity_time",
      key: "productivity_time",
      width: "170px",
    },
    {
      title: "Unproductivity time",
      dataIndex: "unproductivty_time",
      key: "unproductivty_time",
      width: "180px",
    },
    {
      title: "Neutral time",
      dataIndex: "neutral_time",
      key: "neutral_time",
      width: "170px",
    },
    {
      title: "Break time",
      dataIndex: "break_time",
      key: "break_time",
      width: "170px",
    },
    {
      title: "Productivity",
      dataIndex: "productivity_percentage",
      key: "productivity_percentage",
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
      productivity_time: "00h:00m",
      unproductivty_time: "00h:00m",
      neutral_time: "15h:56m",
      break_time: "02h:18m:05s",
      productivity_percentage: 20,
    },
  ];

  return (
    <div>
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
            <p className="devices_chartheading">Working Time Trends</p>
            {worktimeTrendsData.length >= 1 ? (
              <ReactApexChart
                options={chartOptions}
                xaxis={worktimeTrendsXasis}
                series={worktimeTrendsSeries}
                type="area"
                height={350}
              />
            ) : (
              <CommonNodatafound />
            )}
          </>
        )}
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
          scroll={{ x: 1400 }}
          dataPerPage={10}
          bordered="false"
          checkBox="false"
        />
      </div>
    </div>
  );
};
export default ProductivityDetailed;
