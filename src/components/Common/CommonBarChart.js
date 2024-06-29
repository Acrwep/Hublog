import React from "react";
import ReactApexChart from "react-apexcharts";

const CommonBarChart = ({ colors, xasis, series, timebased }) => {
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    colors: colors,
    plotOptions: {
      bar: {
        labels: true,
        // distributed: true,
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
        rotate: -40, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          if (timebased === "true") {
            const hours = Math.floor(value);
            return `${hours} hrs`;
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
        formatter: function (val) {
          if (timebased === "true") {
            const hours = Math.floor(val);
            const minutes = Math.round((val % 1) * 60);
            return `${hours} hrs ${minutes} min`;
          }
          return val + " %";
        },
      },
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
