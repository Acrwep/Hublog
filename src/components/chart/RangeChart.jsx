
import React from 'react'
import ChartComponent from './ChartComponent';
import ReactApexChart from 'react-apexcharts';

const RangeChart = ({data}) => {
  return (
    <ChartComponent
    type="line"
    data={{
      labels: data.labels,
      datasets: [
        {
          label: 'Active Time',
          data: data.activeTime,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)', // Adjust colors as needed
          borderWidth: 2,
          // yAxisID: 'activeTime',
          tension: 0.5,
        },
        {
          label: 'Idel Time',
          data: data.idealTime,
          fill: true,
          borderColor: 'rgba(0, 0, 0, 1)', // Adjust colors as needed
          borderWidth: 2,
          // yAxisID: 'idealTime',
          tension: 0.5,
        },
        
      ],
    }}
    options={{
      responsive: true,
      maintainAspectRatio: true,
    }}
  />
  )
}

export default RangeChart


export const LineCharts = ({data}) => {

  const datas = {
    series: [
      {
        name: 'Active Time',
        data: [65, 59, 80, 81, 56, 55],
      },
      {
        name: 'Idle Time',
        data: [28, 48, 40, 19, 86, 27],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke:{
        curve:'smooth',
      },
      xaxis: {
        categories: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04','2024-02-05','2024-02-06',],
        title: {
          text: '',
        },
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: 'Time (hours)',
        },
        forceNiceScale: true,
      },
      colors: ['#2196F3', '#F44336'], // Blue for Active Time, Red for Idle Time
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={datas.options}
        series={datas.series}
        type="line"
        height={350}
      />
    </div>
  );


}

