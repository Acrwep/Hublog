import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardChart = ({ data }) => {
  // Function to convert time in HH:MM:SS format to minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
  };

  // Extracting data for the chart
  const attendanceDates = data.map(
    (item) =>
      // new Date(item.attendanceDate).toLocaleDateString()
      item.attendanceDate
  );
  const presentCount = data.map((item) => item.presentCount);
  const absentCount = data.map((item) => item.absentCount);
  const attendancePercentage = data.map((item) =>
    item.attendancePercentage.toFixed(2)
  );
  const averageWorkingTime = data.map((item) =>
    convertTimeToMinutes(item.averageWorkingTime)
  );

  const formatAverageWorkingTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours}h:${minutes}m`;
  };

  // Chart options configuration
  const options = {
    chart: {
      type: "line",
      height: 350,
      stacked: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    plotOptions: {
      labels: true,
      distributed: false,
      columnWidth: "40%", // Corrected column width to a percentage
      horizontal: false,
    },
    dataLabels: {
      enabled: false,
    },
    labels: attendanceDates,
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: { text: "Attendance Count" },
        min: 0,
        max: Math.max(...presentCount, ...absentCount) + 1,
        labels: {
          formatter: (value) => Math.round(value), // Remove decimals
          style: {
            colors: "#25a17d", // Color for this axis
          },
        },
        axisBorder: {
          show: true,
          color: "#25a17d", // Axis line color
        },
        axisTicks: {
          show: true,
          color: "#25a17d",
        },
      },
      {
        opposite: true,
        min: 0,
        max: 100,
        title: { text: "Attendance % / Avg Working Hours" },
        labels: {
          formatter: (value) => Math.round(value), // Remove decimals
          style: {
            colors: "#FEB019", // Color for this axis
          },
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        axisTicks: {
          show: true,
          color: "#FEB019",
        },
        offsetX: 10, // Adjust the position to prevent overlap
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (val) => `Date: ${moment(val).format("DD-MM-YYYY")}`, // Customize date format if needed
      },
      y: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          if (seriesIndex === 3) {
            // Assuming Avg Working Hours is the fourth series
            const averageTime = data[dataPointIndex].averageWorkingTime; // Access the original time
            return formatAverageWorkingTime(averageTime);
          }
          return value;
        },
      },
    },
    colors: ["#25a17d", "#ABB3B3", "#FEB019", "#00E396"],
  };

  // Series data for the chart
  const series = [
    { name: "Present", type: "bar", data: presentCount },
    { name: "Absent", type: "bar", data: absentCount },
    {
      name: "Attendance %",
      type: "line",
      data: attendancePercentage,
    },
    {
      name: "Avg Working Hours",
      type: "line",
      data: averageWorkingTime,
    },
  ];

  return (
    <div>
      <ReactApexChart
        series={series}
        options={options}
        type="line"
        height={350}
      />
    </div>
  );
};

export default DashboardChart;
