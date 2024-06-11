// import React from 'react';
// import ChartComponent from './ChartComponent';

import React, { useState } from 'react';
// import ChartComponent from './ChartComponent';
import ReactApexChart from 'react-apexcharts';


const LineChart = ({ data, displayFields, yOptions, y1Options }) => {

  const [state] = useState({
    options: {
      chart: {
        id: 'combo-chart',
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      // markers: {
      //   size: 6,
      // },
      xaxis: {
        labels: {
          show: true,
          rotate: -45,
        },
        categories: data.dates,
      },
      yaxis: [

        {
         
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#66AFF4'
          },
          title: {
            text: 'Number of Employees Present',
            style: {
              color: '#66AFF4',
            }
          },
          labels: {
            style: {
              colors: '#66AFF4',
            }
          },
          stepSize:13,
          min: 0, 
          // max: 50,
        },
        {
          seriesName: 'Absent',
          opposite: false,
          show:false,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#CCCCCC'
          },
          labels: {
            style: {
              colors: '#CCCCCC',
            }
          },
          title: {
            text: "Number of Employees Absent",
            style: {
              color: '#CCCCCC',
            }
          },
        },
        {
          seriesName: 'Attendance Percentage',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FFA500'
          },
          labels: {
            style: {
              colors: '#FFA500',
            }
          },
          title: {
            text: "Attendance Percentage",
            style: {
              color: '#FFA500',
            }
          },
          min: 0, 
          max: 100,
        },
        {
          seriesName: 'Average Working Hours',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#808080'
          },
          labels: {
            style: {
              colors: '#808080',
            }
          },
          title: {
            text: "Average Working Hours",
            style: {
              color: '#808080',
            }
          },
          min: 0, 
          max: 13,
        },
      ],
      colors: ['#66AFF4', '#CCCCCC', '#FFA500', '#808080'], // Bar colors: Present, Absent; Line colors: Attendance Percentage, Working Hours
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        },
        // line: {
        //   strokeWidth: 5,
        //   markers: {
        //     size: 5,
        //     fillOpacity: 2,
        //     // hover: {
        //     //   size: 7,
        //     // },
        //   },
        // },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        // y: {
        //   formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        //     if (seriesIndex === 0 || seriesIndex === 1) {
        //       return val;
        //     } else {
        //       return val.toFixed(2);
        //     }
        //   },
        // },
      },
      legend: {
        position: 'top',
      },
    },

    series: [
      {
        name: 'Present',
        type: 'column',
        data: data.present,
      },
      {
        name: 'Absent',
        type: 'column',
        data: data.absent,
      },
      {
        name: 'Attendance Percentage',
        type: 'line',
        data: data.attendancePercentage,
        // yAxisIndex: 1, // Assign to the second y-axis
      },
      {
        name: 'Average Working Hours',
        type: 'line',
        data: data.averageWorkingHours,
        // yAxisIndex: 1, // Assign to the second y-axis
      },
    ]
  })

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="line" width={705} height={306} />
    </div>
  );


};

export default LineChart;
