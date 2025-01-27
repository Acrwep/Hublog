import moment, { max } from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardChart = ({ data }) => {
  const presentCount = data.map((item) => item.presentCount);

  const absentCount = data.map((item) => item.absentCount);

  // Extracting data for the chart
  const attendanceDates = data.map((item) =>
    moment(item.attendanceDate).format("DD/MM/YYYY")
  );

  const convertTimeToMinutes = (time) => {
    if (time === null) {
      return "0h:0m:0s";
    } else {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 60 + minutes + seconds / 60;
    }
  };

  const averageWorkingTime = data.map(
    (item) =>
      item.averageWorkingTime
        ? convertTimeToMinutes(item.averageWorkingTime)
        : 0 // Fallback to 0 if undefined
  );

  const attendancePercentage = data.map(
    (item) =>
      item.attendancePercentage !== undefined ? item.attendancePercentage : 0 // Fallback to 0 if undefined
  );

  const formatAverageWorkingTime = (time) => {
    if (time === null || time === undefined) {
      return "0h:0m:0s";
    } else {
      const [hours, minutes, seonds] = time.split(":");
      return `${hours}h:${minutes}m:${seonds}s`;
    }
  };

  // Chart options configuration
  const options = {
    chart: {
      type: "line",
      height: 350,
      stacked: false,
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
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
      categories: attendanceDates,
      labels: {
        show: true,
        rotateAlways: data.length >= 9 ? true : false, // Ensure rotation is applied
        rotate: -45, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      trim: true,
    },
    yaxis: [
      {
        title: { text: "Attendance Count" },
        min: 0,
        // max: Math.max(...presentCount, ...absentCount) + 10,
        max: 100,
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
        offsetX: 10, // Further offset to prevent overlap
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      // x: {
      //   formatter: (val) => `Date: ${val}}`, // Customize date format if needed
      // },
      y: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          const dataPoint = data[dataPointIndex];
          if (!dataPoint) return value; // Ensure the dataPoint exists before accessing its properties

          if (seriesIndex === 2) {
            return dataPoint.attendancePercentage.toFixed(0) + "%";
          }
          if (seriesIndex === 3) {
            // Assuming Avg Working Hours is the fourth series
            const averageTime = dataPoint.averageWorkingTime;
            return formatAverageWorkingTime(averageTime);
          }
          return value;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
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
