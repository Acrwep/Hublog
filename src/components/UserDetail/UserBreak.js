import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import CommonTable from "../../Components/Common/CommonTable";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import "./styles.css";

export default function UserBreak({ loading }) {
  const userBreakDetails = useSelector((state) => state.userBreak);

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
        return <p>{moment(text).format("hh:mm A")} </p>;
      },
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      date: "2024-06-17",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Lunch Break",
      breakstart: "01:00 PM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
    {
      key: "1",
      date: "2024-06-17",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Lunch Break",
      breakstart: "01:00 PM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
    },
  ]);

  const datas = {
    series: [
      {
        name: "Active Time",
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "2024-02-01",
          "2024-02-02",
          "2024-02-03",
          "2024-02-04",
          "2024-02-05",
          "2024-02-06",
        ],
        title: {
          text: "",
        },
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        forceNiceScale: true,
      },
      colors: ["#25a17d", "#F44336"], // Blue for Active Time, Red for Idle Time
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
            <ReactApexChart
              options={datas.options}
              series={datas.series}
              type="line"
              height={300}
            />
          </div>

          <div className="userbreaktable_Container">
            <p
              style={{
                fontWeight: 600,
                fontSize: "17px",
                marginBottom: "10px",
              }}
            >
              Detail
            </p>

            <CommonTable
              columns={columns}
              dataSource={userBreakDetails}
              scroll={{ x: 600 }}
              dataPerPage={4}
            />
          </div>
        </div>
      )}
    </>
  );
}
