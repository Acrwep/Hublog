// import { Tiny, Pie } from '@ant-design/plots';
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

const DoughnutChart = () => {
  
  const options = {
    chart: {
      type: 'donut',
    },
    labels: ['Present', 'Absent'],
    colors: ['#66AFF4', '#CCCCCC'], // Blue and Gray colors
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true
            },
            name: {
              show: true,
            },
            value: {
              show: true,
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
      position: 'bottom',
    },
  };
  const presentCount = 30;
  const absentCount =20;
  const series = [presentCount, absentCount];

  return (
    <div >
      <ReactApexChart options={options} series={series} type="donut" height={300} />
    </div>
  );
};

export default DoughnutChart