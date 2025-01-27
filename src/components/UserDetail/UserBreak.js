import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, Skeleton } from "antd";
import CommonTable from "../../Components/Common/CommonTable";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";

export default function UserBreak({ loading, filterLoading }) {
  const userBreakDetails = useSelector((state) => state.userBreak);
  const userTotalBreakData = useSelector((state) => state.usertotalbreak);
  const columns = [
    {
      title: "Date",
      dataIndex: "start_Time",
      key: "start_Time",
      width: 160,
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    {
      title: "Break Type",
      dataIndex: "breakType",
      key: "breakType",
      width: 170,
    },
    {
      title: "Break Start",
      dataIndex: "start_Time",
      key: "start_Time",
      width: 170,
      render: (text, record) => {
        return <p>{moment(text).format("hh:mm A")} </p>;
      },
    },
    {
      title: "Break End",
      dataIndex: "end_Time",
      key: "end_Time",
      width: 170,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return <p>{moment(text).format("hh:mm A")} </p>;
      },
    },
    {
      title: "Duration",
      dataIndex: "breakDuration",
      key: "breakDuration",
      width: 170,
      render: (text, record) => {
        if (text === null) {
          return null;
        } else {
          const [hour, minutes, seconds] = text.split(":");
          return <p>{hour + "h:" + minutes + "m:" + seconds + "s"}</p>;
        }
      },
    },
  ];

  // Convert time format to decimal hours
  const convertTimeToDecimal = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  // Map the response data to x-axis and y-axis data
  const xaxisCategories = userTotalBreakData.map((item) =>
    moment(item.breakDate).format("DD-MM-YYYY")
  ); // Get the date only
  const yaxisData = userTotalBreakData.map((item) =>
    convertTimeToDecimal(item.totalBreakHours)
  );

  const datas = {
    series: [
      {
        name: "Break Time",
        data: yaxisData, // Converted break hours in decimal format
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Show toolbar (can be set to false to hide all)
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: xaxisCategories, // Dates from response
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
        labels: {
          show: true,
          rotateAlways: userTotalBreakData.length >= 7 ? true : false, // Ensure rotation is applied
          rotate: -45, // Rotate labels by -40 degrees
          color: ["#ffffff"],
          style: {
            fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
          },
        },
        trim: true,
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        labels: {
          formatter: function (val) {
            return `${Math.floor(val)}h`; // Display values as whole hours like 0h, 1h
          },
        },
        forceNiceScale: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            const hours = Math.floor(val);
            const minutes = Math.round((val - hours) * 60);
            return `${hours}h:${minutes}m`; // Format as "0h:1m"
          },
        },
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      colors: ["#25a17d"], // Customize color if needed
      legend: {
        position: "top",
      },
    },
  };

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
                Break Trends
              </p>
            )}
            {filterLoading ? (
              ""
            ) : (
              <>
                {userTotalBreakData.length >= 1 ? (
                  <ReactApexChart
                    options={datas.options}
                    series={datas.series}
                    type="line"
                    height={300}
                  />
                ) : (
                  <div className="userbreak_totalbreaknodata_container">
                    <CommonNodatafound />
                  </div>
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
              dataSource={userBreakDetails}
              scroll={{ x: 600 }}
              dataPerPage={10}
              checkBox="false"
              bordered="false"
              size="small"
              loading={filterLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
