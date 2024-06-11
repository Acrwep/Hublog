import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ type, data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        ...options,
      },
    });

    // Cleanup function
    return () => {
      chart?.destroy && chart.destroy();
    };
  }, [type, data, options]);

  return <canvas className=" max-sm:h-60" ref={chartRef} />;
};

export default ChartComponent;
