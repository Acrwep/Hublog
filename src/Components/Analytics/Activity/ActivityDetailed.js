import React, { useState } from "react";
import { Flex, Progress, Skeleton } from "antd";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import { useSelector } from "react-redux";
import moment from "moment";
import { parseTimeToDecimal } from "../../Common/Validation";
import CommonNodatafound from "../../Common/CommonNodatafound";
import CommonTrendsChart from "../../Common/CommonTrendsChart";

const ActivityDetailed = ({ loading }) => {
  const activityWorktimeTrendsData = useSelector(
    (state) => state.activityworktimetrends
  );
  const activityTrendsData = useSelector((state) => state.activitytrends);

  const activityWorktimeTrendsXasis = activityWorktimeTrendsData.map((item) =>
    moment(item.start_timing).format("DD/MM/YYYY")
  );

  const activityTrendXasis = activityTrendsData.map((item) =>
    moment(item.date, "MM/DD/YYYY HH:mm:ss").format("DD/MM/YYYY")
  );

  const activityWorktimeTrendsSeries = [
    {
      name: "Online time",
      data: activityWorktimeTrendsData.map((item) => {
        return parseTimeToDecimal(item.active_duration);
      }),
    },
    {
      name: "Break time",
      data: activityWorktimeTrendsData.map((item) => {
        return parseTimeToDecimal(item.break_duration);
      }),
    },
  ];

  const activityTrendSeries = [
    {
      name: "Active time",
      data: activityTrendsData.map((item) => {
        return parseTimeToDecimal(item.active_Duration);
      }),
    },
    {
      name: "Ideal time",
      data: activityTrendsData.map((item) => {
        return parseTimeToDecimal(item.idle_Duration);
      }),
    },
  ];

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

  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth", // Keeps the line straight for the line chart
    },
    xaxis: {
      categories: activityTrendXasis,
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
          )}</span>`;
        },
      },
    },
    colors: ["#25a17d", "#8a8c8c"], // Different colors for the three series
  };

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
            {activityWorktimeTrendsData.length >= 1 ? (
              <CommonTrendsChart
                xaxis={activityWorktimeTrendsXasis}
                series={activityWorktimeTrendsSeries}
              />
            ) : (
              <CommonNodatafound />
            )}
          </>
        )}
      </div>
      <div className="devices_chartsContainer" style={{ marginTop: "25px" }}>
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
            <p className="devices_chartheading">Activity Trend</p>
            {activityTrendsData.length >= 1 ? (
              <ReactApexChart
                options={lineChartOptions}
                series={activityTrendSeries}
                type="line"
                height={350}
              />
            ) : (
              <CommonNodatafound />
            )}
          </>
        )}
      </div>

      <div className="devices_chartsContainer" style={{ marginTop: "20px" }}>
        <p className="devices_chartheading">Employee List</p>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          dataPerPage={10}
          size="small"
          bordered="false"
          checkBox="false"
        />
      </div>
    </div>
  );
};
export default ActivityDetailed;
