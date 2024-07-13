import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function CommonDonutChart({
  labels,
  colors,
  series,
  labelsfontSize,
  style,
  timebased,
  height,
}) {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth <= 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total hours and minutes
  const totalHours = series.reduce((acc, val) => acc + val, 0);
  const totalMinutes = Math.round((totalHours % 1) * 60);

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
              color: "#2d2d2d",
              fontWeight: 600, // Increase font weight
              fontSize: mobileView ? "12px" : labelsfontSize,
              fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
              formatter: function (val) {
                if (timebased === "true") {
                  const totalHours = series.reduce((acc, val) => acc + val, 0);
                  const totalMinutes = Math.round((totalHours % 1) * 60);
                  return `${Math.floor(totalHours)} hrs ${totalMinutes} min`;
                } else {
                  let totalSum = 0;
                  series.map((item) => {
                    totalSum = totalSum + item;
                  });
                  return totalSum;
                }
              },
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              fontSize: mobileView ? "12px" : labelsfontSize,
              color: "#2d2d2d",
              fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
              fontWeight: 700, // Increase font weight
              formatter: function (val) {
                if (timebased === "true") {
                  const hours = Math.floor(val);
                  const minutes = Math.round((val % 1) * 60);
                  return `${hours} hrs ${minutes} min`;
                }
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
          if (timebased === "true") {
            const hours = Math.floor(val);
            const minutes = Math.round((val % 1) * 60);
            return `${hours} hrs ${minutes} min`;
          }
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
        if (timebased === "true") {
          const hours = Math.floor(value);
          const minutes = Math.round((value % 1) * 60);
          return `${seriesName}: ${hours} hrs ${minutes} min`;
        }
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
        height={height ? height : 270}
        timebased={timebased}
      />
    </div>
  );
}
