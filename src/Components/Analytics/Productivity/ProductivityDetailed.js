import React, { useState } from "react";
import { Flex, Progress, Skeleton } from "antd";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import moment from "moment";
import { useSelector } from "react-redux";
import { parseTimeToDecimal } from "../../Common/Validation";
import CommonNodatafound from "../../Common/CommonNodatafound";
import CommonTrendsChart from "../../Common/CommonTrendsChart";

const ProductivityDetailed = ({ loading }) => {
  const worktimeTrendsData = useSelector(
    (state) => state.productivityworktimetrends
  );
  const productivityTrendData = useSelector((state) => state.productivitytrend);
  const productivityEmployeesListData = useSelector(
    (state) => state.productivityemployeelist
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
  const productivityTrendXasis = productivityTrendData.map((item) =>
    moment(item.date).format("DD/MM/YYYY")
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

  const productivityTrendSeries = [
    {
      name: "Productive",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.productive_Duration);
      }),
    },
    {
      name: "Neutral",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.neutral_Duration);
      }),
    },
    {
      name: "Unproductive",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.unproductive_Duration);
      }),
    },
  ];

  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
    },
    stroke: {
      curve: "smooth", // Keeps the line straight for the line chart
    },
    xaxis: {
      categories: productivityTrendXasis,
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
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    colors: ["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"], // Different colors for the three series
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
      dataIndex: "AttendanceCount",
      key: "AttendanceCount",
      width: 140,
      render: (text, record) => {
        if (text === null) {
          return 0;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Working time",
      dataIndex: "total_wokingtime",
      key: "total_wokingtime",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Online time",
      dataIndex: "OnlineDuration",
      key: "OnlineDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "BreakDuration",
      key: "BreakDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity time",
      dataIndex: "TotalProductiveDuration",
      key: "TotalProductiveDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Neutral time",
      dataIndex: "TotalNeutralDuration",
      key: "TotalNeutralDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Unproductivity time",
      dataIndex: "TotalUnproductiveDuration",
      key: "TotalUnproductiveDuration",
      width: 170,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity",
      dataIndex: "PercentageProductiveDuration",
      key: "PercentageProductiveDuration",
      width: 150,
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
              <CommonTrendsChart
                xaxis={worktimeTrendsXasis}
                series={worktimeTrendsSeries}
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
            <p className="devices_chartheading">Productivity Trend</p>
            {productivityTrendData.length >= 1 ? (
              <ReactApexChart
                options={lineChartOptions}
                series={productivityTrendSeries}
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
          dataSource={productivityEmployeesListData}
          scroll={{ x: 1400 }}
          dataPerPage={10}
          size="small"
          bordered="false"
          checkBox="false"
          loading={loading}
        />
      </div>
    </div>
  );
};
export default ProductivityDetailed;
