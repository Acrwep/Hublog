import React from "react";
import ReactApexChart from "react-apexcharts";

const CommonTrendsChart = ({ xaxis, series }) => {
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

  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // This makes it a Spline Area Chart
    },
    xaxis: {
      categories: xaxis,
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
          )}</span>`;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    fill: {
      opacity: 0.3,
    },
  };
  return (
    <ReactApexChart
      options={chartOptions}
      xaxis={xaxis}
      series={series}
      type="area"
      height={350}
    />
  );
};
export default CommonTrendsChart;
