import { max } from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";

const AttendanceTrendsChart = ({ xasis, series }) => {
  const attendanceTrendsData = useSelector((state) => state.attendancetrends);
  const attendanceTrendsXaxis = attendanceTrendsData.map((a) =>
    moment(a.attendanceDate).format("DD/MM/YYYY")
  );
  // const options = {
  //   chart: {
  //     height: 350,
  //     type: "line", // Main type is "line" to support mixed chart types
  //     stacked: false, // No stacking
  //   },
  //   colors: ["#25a17d", "#FF6347", "rgba(0,126,241,0.64)", "#ABB3B3"], // Colors for Present, Absent, Attendance %, and Time
  //   stroke: {
  //     width: [0, 0, 5, 2], // Width for bar (0), line (5), and area (2)
  //     curve: "smooth", // Smooth curve for line and area
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: "50%",
  //     },
  //   },
  //   fill: {
  //     opacity: [0.85, 1, 1, 0.25], // Set different opacities for each series
  //     gradient: {
  //       inverseColors: false,
  //       shade: "light",
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100],
  //     },
  //   },
  //   labels: xasis, // Replace with your date labels
  //   markers: {
  //     size: 0, // Disable markers on the line chart
  //   },
  //   xaxis: {
  //     categories: xasis, // Your date categories
  //     type: "category", // Category type to handle date labels
  //   },
  //   yaxis: [
  //     {
  //       title: {
  //         text: "Count (Present & Absent)", // Left y-axis for Present and Absent
  //       },
  //       min: 0,
  //       max: 10,
  //       forceNiceScale: true, // Forces the y-axis to show a nice range
  //       labels: {
  //         formatter: (value) => Math.round(value), // Round numbers to whole numbers
  //       },
  //     },
  //     {
  //       opposite: true, // Right y-axis for the percentage and hours
  //       title: {
  //         text: "Attendance % / Avg Working Hours",
  //       },
  //       min: 0,
  //       max: 100, // For the percentage line
  //     },
  //   ],
  //   // yaxis: [
  //   //   {
  //   //     title: {
  //   //       text: "Count (Present & Absent)",
  //   //     },
  //   //     min: 0,
  //   //     max: Math.max(
  //   //       ...attendanceTrendsData.map(
  //   //         (item) => item.presentCount + item.absentCount
  //   //       )
  //   //     ),
  //   //     labels: {
  //   //       formatter: (value) => Math.round(value), // Round to whole numbers
  //   //     },
  //   //   },
  //   //   {
  //   //     opposite: true, // Right y-axis for attendance percentage
  //   //     title: {
  //   //       text: "Attendance Percentage",
  //   //     },
  //   //     min: 0,
  //   //     max: 100, // Set the maximum to 100%
  //   //     labels: {
  //   //       formatter: (value) => `${value.toFixed(2)}%`, // Format to 2 decimal places
  //   //     },
  //   //   },
  //   // ],
  //   tooltip: {
  //     shared: true, // Show data for all series on hover
  //     intersect: false,
  //   },
  // };

  const options = {
    chart: {
      type: "line", // Mixed chart with line and bar series
      stacked: false, // Ensure no stacking when using both column and line
    },
    series: attendanceTrendsData, // Use the generated series
    stroke: {
      width: [0, 0, 5, 2], // Width for bar (0), line (5), and area (2)
      curve: "smooth", // Smooth curve for line and area
    },
    xaxis: {
      categories: attendanceTrendsXaxis, // Attendance dates as x-axis categories
      title: {
        text: "Attendance Date",
      },
    },
    yaxis: [
      {
        title: {
          text: "Count (Present/Absent)",
        },
        // Left side y-axis for counts
      },
      {
        opposite: true, // Right side y-axis for attendance percentage
        title: {
          text: "Attendance Percentage",
        },
        max: 100, // Set the max value to 100 for percentage
        labels: {
          formatter: function (val) {
            return val + "%"; // Format the labels as percentage
          },
        },
      },
    ],
    tooltip: {
      shared: true, // Show tooltips for all series together
    },
    plotOptions: {
      bar: {
        columnWidth: "50%", // Customize column width
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        xasis={xasis}
        height={350}
      />
    </div>
  );
};

export default AttendanceTrendsChart;
