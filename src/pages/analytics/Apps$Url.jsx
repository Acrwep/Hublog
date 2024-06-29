import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../../components/Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { FaAppStore } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import DownloadTableAsXLSX from "../../components/Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../../components/Common/CommonSelectField";
import CommonDonutChart from "../../components/Common/CommonDonutChart";

const Apps$Url = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [{ id: 1, name: "Operation" }];

  const OverallWellness = [15, 6];

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
    colors: ["#00952e"],
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

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <FaAppStore size={20} />
        </div>
        <h2 className="allpage_mainheadings">Apps & URLs</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="userproductivity_topContainers">
            <p>Top Application</p>
            <p className="userproductivity_contents">Chrome</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <div className="userproductivity_topContainers">
            <p>Top Urls</p>
            <p className="userproductivity_contents">https://ads.google.com/</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="userproductivity_topContainers">
            <p>Top Category</p>
            <p className="userproductivity_contents">Internet</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="devices_chartsContainer">
              <p
                className="devices_chartheading"
                style={{ marginBottom: "20px" }}
              >
                Category Utilization
              </p>
              <CommonDonutChart
                labels={["Healthy", "Overburdened"]}
                colors={["#25a17d", "#e93b3a"]}
                series={OverallWellness}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="userproductivity_topContainers">
              <p
                className="devices_chartheading"
                style={{ marginBottom: "20px" }}
              >
                Application Usage
              </p>
              <ReactApexChart
                options={barchartoptions}
                series={barchartseries}
                type="bar"
                height={320}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="userproductivity_topContainers">
              <p
                className="devices_chartheading"
                style={{ marginBottom: "20px" }}
              >
                URL Usage
              </p>
              <ReactApexChart
                options={barchartoptions}
                series={barchartseries}
                type="bar"
                height={320}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Apps$Url;
