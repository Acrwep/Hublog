import React, { useState } from "react";
import { Row, Col } from "antd";
import ReactApexChart from "react-apexcharts";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import "./styles.css";

export default function UserAppsUrls() {
  const series = [12.2, 2];

  const barchartoptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    // tooltip: {
    //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //     return `<div class="arrow_box">
    //       <span>${w.globals.labels[dataPointIndex]}</span>
    //       </div>`;
    //   },
    // },
  };

  const barchartseries = [
    {
      data: [
        {
          x: "Chrome",
          y: 20,
        },
        {
          x: "Vs code",
          y: 30,
        },
        {
          x: "Notepad",
          y: 30,
        },
        {
          x: "Files",
          y: 20,
        },
        {
          x: "Gmail",
          y: 70,
        },
        {
          x: "Email",
          y: 20,
        },
      ],
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Application</p>
            <p className="userproductivity_contents">Chrome</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userproductivity_topContainers">
            <p>Top Urls</p>
            <p className="userproductivity_contents">https://ads.google.com/</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Category</p>
            <p className="userproductivity_contents">Internet</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
      </Row>

      <div className="userproductivity_chartContainer">
        <p className="userproductivity_chartheading">Category Utilization</p>
        <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={6}>
            <p className="totalproductive_timeheading">Total productive time</p>
            <p className="totalproductive_time">17h 51m</p>
            <p className="totalproductive_timeheading">For the last 7 days</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18}>
            <p className="totalproductive_timeheading">
              Average productive time
            </p>
            <p className="totalproductive_time">2h 51m</p>
            <p className="totalproductive_timeheading">Average per day</p>
          </Col>
        </Row>
        <CommonDonutChart
          labels={["Productive time", "Unproductive time"]}
          colors={["#25a17d", "#ABB3B3"]}
          series={series}
          timebased="true"
          labelsfontSize="14px"
        />
      </div>

      <div className="userattendancetable_Container">
        <ReactApexChart
          options={barchartoptions}
          series={barchartseries}
          type="bar"
          height={320}
        />
      </div>
    </div>
  );
}
