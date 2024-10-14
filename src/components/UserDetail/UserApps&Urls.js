import React, { useState } from "react";
import { Row, Col, Spin } from "antd";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";
import Loader from "../Common/Loader";
import UserAppsandUrlsLoader from "./UserApps&UrlsLoader";
import ContentLoader from "react-content-loader";

export default function UserAppsUrls({
  loading,
  filterLoading,
  topAppName,
  topAppUsageTime,
  topUrlName,
  topUrlUsageTime,
  internetTime,
}) {
  const appsData = useSelector((state) => state.userappsusage);
  const urlsData = useSelector((state) => state.userurlsusage);

  const barchartoptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        borderRadiusApplication: "end",
        horizontal: true,
        backgroundColor: "red",
      },
    },
    grid: {
      show: false, // Disable grid lines
    },
    dataLabels: {
      enabled: false, // Disable the value labels on the bars
    },
    colors: ["#25a17d"],
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const xValue = w.globals.labels[dataPointIndex];
        const yValue = series[seriesIndex][dataPointIndex];
        const color = w.config.colors[seriesIndex]; // Get the color of the series

        // Convert yValue back to hours and minutes
        const hours = Math.floor(yValue); // Get the whole number of hours
        const minutes = Math.round((yValue - hours) * 60); // Get the remaining minutes
        return `
          <div style="padding: 5px 9px;">
            <span style="display:inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 5px;"></span>
            <strong>${xValue}</strong>: ${hours}h:${minutes}m
          </div>
        `;
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: "500", // Make the labels bold
          fontSize: "13px",
          fontFamily: "Poppins, sans-serif",
        },
        formatter: function (value) {
          return value; // Simply return the value
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        formatter: function (value) {
          const hours = Math.floor(value);
          return `${hours}h`;
        },
      },
    },
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const convertToTimeFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseFloat(hours) + parseFloat(minutes) / 60;
  };

  const barchartseries = [
    {
      data: appsData.map((item) => ({
        x: capitalizeFirstLetter(item.applicationName),
        y: convertToTimeFormat(item.totalUsage),
      })),
    },
  ];

  const urlsbarchartseries = [
    {
      data: urlsData.map((item) => ({
        x: item.url,
        y: convertToTimeFormat(item.totalUsage),
      })),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
                  <UserAppsandUrlsLoader />
                ) : (
                  <>
                    <p>Top Application</p>
                    <p className="userproductivity_contents">{topAppName}</p>
                    <p className="userproductivity_hours">{topAppUsageTime}</p>
                  </>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
                  <ContentLoader
                    speed={1}
                    width="100%"
                    // height="100%"
                    viewBox="0 0 300 70"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="5" rx="5" ry="5" width="45" height="9" />
                    <rect x="0" y="32" rx="5" ry="5" width="150" height="10" />
                    <rect x="0" y="60" rx="5" ry="5" width="45" height="9" />
                  </ContentLoader>
                ) : (
                  <>
                    <p>Top URL</p>
                    <p className="userproductivity_contents">
                      {topUrlName === "-"
                        ? topUrlName
                        : "https://" + topUrlName}
                    </p>
                    <p className="userproductivity_hours">{topUrlUsageTime}</p>
                  </>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <div className="userproductivity_topContainers">
                {filterLoading ? (
                  <UserAppsandUrlsLoader />
                ) : (
                  <>
                    <p>Top Category</p>
                    <p className="userproductivity_contents">
                      {internetTime ? "Internet" : "-"}
                    </p>
                    <p className="userproductivity_hours">
                      {internetTime ? internetTime : "-"}
                    </p>
                  </>
                )}
              </div>
            </Col>
          </Row>

          {/* <div className="userproductivity_chartContainer">
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
      </div> */}

          <div
            className="appsandurlchart_Containers"
            style={{
              height: appsData.length <= 10 ? "auto" : "50vh",
              overflowY: "auto",
              overflowX: "hidden",
              marginTop: "20px",
            }}
          >
            {filterLoading ? (
              <div className="userdetail_breakSpinContainer">
                <Spin />
              </div>
            ) : (
              <>
                <p className="devices_chartheading">Application Usage</p>
                {appsData.length >= 1 ? (
                  <ReactApexChart
                    options={barchartoptions}
                    series={barchartseries}
                    type="bar"
                    style={{ marginTop: "-7px" }}
                    height={
                      appsData.length <= 5
                        ? 170
                        : appsData.length > 5 && appsData.length <= 10
                        ? 260
                        : appsData.length * 32
                    }
                  />
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>

          <div
            className="appsandurlchart_Containers"
            style={{
              height: urlsData.length <= 5 ? "100%" : "50vh",
              overflowY: "auto",
              marginTop: "20px",
              overflowX: "hidden",
            }}
          >
            {filterLoading ? (
              <div className="userdetail_breakSpinContainer">
                <Spin />
              </div>
            ) : (
              <>
                <p className="devices_chartheading">URL Usage</p>
                {urlsData.length >= 1 ? (
                  <ReactApexChart
                    options={barchartoptions}
                    series={urlsbarchartseries}
                    type="bar"
                    style={{ marginTop: "-7px" }}
                    height={
                      urlsData.length <= 5
                        ? 175
                        : urlsData.length > 5 && urlsData.length <= 10
                        ? 260
                        : urlsData.length * 32
                    }
                  />
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
