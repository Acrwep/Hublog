import React from "react";
import ReactApexChart from "react-apexcharts";

export default function CommonDonutChart({
  labels,
  colors,
  series,
  labelsfontSize,
  style,
}) {
  const options = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
              fontWeight: 600, // Increase font weight
              fontSize: labelsfontSize,
              fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
              fontWeight: 700, // Increase font weight
              formatter: function (val) {
                return val; // Display value in the tooltip
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val; // Display value in the tooltip
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Poppins, sans-serif",
      formatter: function (seriesName, opts) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}: ${value}`;
      },
    },
  };
  return (
    <div style={style}>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={270}
      />
    </div>
  );
}
