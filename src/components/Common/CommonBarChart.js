import React from "react";
import ReactApexChart from "react-apexcharts";

const CommonBarChart = ({
  colors,
  xasis,
  series,
  timebased,
  distributed,
  legend,
}) => {
  // Function to format time as "1hr" for y-axis labels
  const formatTimeInHours = (value) => {
    const hours = Math.floor(value); // Only display whole hours
    return `${hours}hr`;
  };

  // Function to format time as "1hr 30min" for tooltips
  const formatTooltipTime = (value) => {
    // const hours = Math.floor(value);
    // const minutes = Math.round((value % 1) * 60); // Convert decimal to minutes
    // return `${hours}h:${minutes}m`;

    if (isNaN(value) || value === null || value === undefined)
      return "0hr 0m 0s";
    const hours = Math.floor(value);
    const minutes = Math.floor((value % 1) * 60);
    const seconds = Math.floor(((value % 1) * 3600) % 60);
    return `${hours}hr ${minutes}m ${seconds} s`;
  };
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      width: "100%", // Ensure full width
    },
    colors: colors,
    plotOptions: {
      bar: {
        labels: true,
        distributed: distributed === "true" ? true : false,
        columnWidth: 40,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xasis,
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
          if (timebased === "true") {
            return formatTimeInHours(value);
          } else {
            return value;
          }
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex }) {
          // Show corresponding x-axis name and y value
          const xAxisName = xasis[dataPointIndex]; // Get corresponding x-axis name
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${xAxisName}</span>: ${
            timebased === "true" ? formatTooltipTime(val) : val
          }`;
        },
      },
      x: {
        show: false,
      },
    },
    legend: {
      show: legend === "false" ? false : true, // Hide legends
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        timebased={timebased}
      />
    </div>
  );
};

export default CommonBarChart;
