
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';

const HorizontalBarChart = ({ data }) => {
  // Data


  // Options
  const options = {
    indexAxis: 'y', // Rotate the chart to display y-axis labels horizontally
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        }
      }
    },
    legend: {
      display: false,
    },
  };

  return (
    <div>
      <div className=' bg-white max-sm:h-56'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;



export const VerticalBarChart = () => {
  const seriesData = [
    {
      name: 'Active Time',
      data: [44, 55, 41, 37, 22, 43, 21]
    },
    {
      name: 'Ideal Time',
      data: [53, 32, 33, 52, 13, 43, 32]
    },

  ];

  const options = {
    chart: {
      type: 'bar',
      height: 200,
      stacked: true,
    },
    colors: ['#66AFF4', '#CCCCCC'],
    plotOptions: {
      bar: {
        columnWidth: 40,
        dataLabels: {
          // total: {
          //   enabled: true,
          //   offsetX: 0,
          //   style: {
          //     fontSize: '13px',
          //     fontWeight: 700
          //   }
          // }
        }
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    xaxis: {
      categories: ['SEO', 'QUALITY', 'OPERATION', 'INTERNAL HR', 'EXTERNAL HR', 'BRANCH OPERATION', 'SALES'],
      labels: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};



export const ProductiveBarChart = () => {
  const seriesData = [
    {
      name: 'Productive Time',
      data: [144, 255, 241, 137, 322, 443, 221]
    },
    {
      name: 'unproductive Time',
      data: [0, 0, 0, 1, 1, 0, 1]
    },
    {
      name: 'Natural Time',
      data: [153, 232, 133, 252, 313, 143, 232]
    },

  ];

  const options = {
    chart: {
      type: 'bar',
      height: 200,
      stacked: true,
    },
    colors: ['#66AFF4', '#FFA500', '#CCCCCC'],
    plotOptions: {
      bar: {
        columnWidth: 40,
        dataLabels: {
        }
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    xaxis: {
      categories: ['SEO', 'QUALITY', 'OPERATION', 'INTERNAL HR', 'EXTERNAL HR', 'BRANCH OPERATION', 'SALES'],
      labels: {
        // formatter: function (val) {
        //   return val + "K"
        // }
      }
    },
    yaxis: {
      // categories: ['0', '138', '277', '416', '555'],
      min: 0,
      max: 555,
      labels: {
        formatter: function (val) {
          return val + "h"
        }
      },
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "H"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};


export const WellnessBarChart = () => {
  const seriesData = [
    {
      name: 'Overburdened',
      data: [0, 0, 50, 0, 0, 20, 40]
    },
    {
      name: 'Healthy',
      data: [0, 100, 50, 60, 60, 0, 20]
    },
    {
      name: 'underutilized',
      data: [100, 0, 0, 40, 0, 20, 40]
    },

  ];

  const options = {
    chart: {
      type: 'bar',
      height: 200,
      stacked: true,
    },
    colors: ['#FFA500','#66AFF4', '#CCCCCC'],
    plotOptions: {
      bar: {
        columnWidth: 40,
        dataLabels: {
          // total: {
          //   enabled: true,
          //   offsetX: 0,
          //   style: {
          //     fontSize: '13px',
          //     fontWeight: 700
          //   }
          // }
        }
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    xaxis: {
      categories: ['SEO', 'QUALITY', 'OPERATION', 'INTERNAL HR', 'EXTERNAL HR', 'BRANCH OPERATION', 'SALES'],
      labels: {
        // formatter: function (val) {
        //   return val + "K"
        // }
      }
    },
    yaxis: {
      // categories: ['0', '138', '277', '416', '555'],
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return val + "%"
        }
      },
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};



