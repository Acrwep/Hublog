import React, { useState } from "react";
import { Col, Row, Skeleton } from "antd";
import CommonTable from "../../Components/Common/CommonTable";
import moment from "moment";
import "./styles.css";
import ReactApexChart from "react-apexcharts";
import CommonAvatar from "../Common/CommonAvatar";
import CommonNodatafound from "../Common/CommonNodatafound";
import Loader from "../Common/Loader";

export default function UserWellness({
  wellnessEmployeeList,
  wellnessTrendsData,
  loading,
  filterLoading,
}) {
  const wellnessTrendXasis = wellnessTrendsData.map((item) =>
    moment(item.date).format("DD/MM/YYYY")
  );

  const wellnessTrendsSeries = [
    {
      name: "Healthy",
      data: wellnessTrendsData.map((item) => {
        return item?.healthyCount || 0;
      }),
    },
    {
      name: "Overburdened",
      data: wellnessTrendsData.map((item) => {
        return item?.overburdenedCount || 0;
      }),
    },
    {
      name: "Underutilized",
      data: wellnessTrendsData.map((item) => {
        return item?.underutilizedCount || 0;
      }),
    },
  ];

  const lineChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      width: "100%", // Ensure full width
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
    },
    plotOptions: {
      bar: {
        labels: true,
        distributed: false,
        columnWidth: 40,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: wellnessTrendXasis,
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
      labels: {
        show: true,
        rotate: -45, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      trim: true,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
          const serirsName = w.config.series[seriesIndex].name;
          // Show corresponding x-axis name and y value
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${
            val === 1 ? `You are ${serirsName}` : "-"
          }</span>`;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    colors: ["#25a17d", "rgba(37,143,161,0.90)", "#ABB3B3"], // Different colors for the three series
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "fullName",
      key: "fullName",
      width: 220,
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={30} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Total Present",
      dataIndex: "attendanceCount",
      key: "attendanceCount",
      width: 150,
    },
    {
      title: "Healthy",
      dataIndex: "healthy",
      key: "healthy",
      width: 170,
    },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "overburdened",
      width: 170,
    },
    {
      title: "Underutilized",
      dataIndex: "underutilized",
      key: "underutilized",
      width: 180,
    },
    {
      title: "Healthy%",
      dataIndex: "healthyPercentage",
      key: "healthyPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
    {
      title: "Overburdened%",
      dataIndex: "overburdenedPercentage",
      key: "overburdenedPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
    {
      title: "Underutilized%",
      dataIndex: "underutilizedPercentage",
      key: "underutilizedPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
  ];

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <div className="userbreak_linechartContainer">
            {filterLoading ? (
              <div style={{ height: "40vh" }}>
                <Skeleton
                  active
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              </div>
            ) : (
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "17px",
                }}
              >
                Wellness Trends
              </p>
            )}
            {filterLoading ? (
              ""
            ) : (
              <>
                {wellnessTrendsData.length >= 1 ? (
                  <ReactApexChart
                    options={lineChartOptions}
                    series={wellnessTrendsSeries}
                    type="bar"
                    height={350}
                  />
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>

          <div className="userbreaktable_Container">
            <p
              style={{
                fontWeight: 600,
                fontSize: "17px",
              }}
            >
              Detail
            </p>

            <CommonTable
              columns={columns}
              dataSource={wellnessEmployeeList}
              scroll={{ x: 600 }}
              dataPerPage={10}
              bordered="false"
              checkBox="false"
              size="small"
              loading={filterLoading}
            />
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}
