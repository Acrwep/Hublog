import React, { useState } from "react";
import CommonBarChart from "../Common/CommonBarChart";
import "./styles.css";
import CommonTable from "../Common/CommonTable";

const AddendanceDetail = () => {
  const attendanceTrendsXasis = [
    "23/06/24",
    "24/06/24",
    "25/06/24",
    "26/06/24",
  ];

  const attendanceTrendsSeries = [
    { name: "Present", data: [12, 10, 20, 30] },
    { name: "Absent", data: [5, 6, 10, 12] },
  ];
  const attendanceTrendsColors = ["#25a17d", "#ABB3B3"];

  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee", width: 140 },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: 120,
    },
    {
      title: "Working time",
      dataIndex: "workingtime",
      key: "workingtime",
      width: 140,
    },
    {
      title: "Online time",
      dataIndex: "onlinetime",
      key: "onlinetime",
      width: 140,
    },
    {
      title: "Break time",
      dataIndex: "breaktime",
      key: "breaktime",
      width: 140,
    },
  ];
  const employeeList = [
    {
      key: "1",
      employee: "John Brown",
      attendance: "4",
      workingtime: "07h:16m",
      onlinetime: "06h:12m",
      breaktime: "01h:02min",
    },
    {
      key: "w",
      employee: "Balaji",
      attendance: "6",
      workingtime: "07h:20m",
      onlinetime: "06h:20m",
      breaktime: "01h:01min",
    },
    {
      key: "3",
      employee: "Rubi",
      attendance: "6",
      workingtime: "07h:50m",
      onlinetime: "06h:40m",
      breaktime: "40min",
    },
    {
      key: "4",
      employee: "Vijay",
      attendance: "12",
      workingtime: "07h:16m",
      onlinetime: "06h:12m",
      breaktime: "01h:02min",
    },
  ];
  return (
    <div>
      <div className="devices_chartsContainer">
        <p className="devices_chartheading">Attendance Trends</p>
        <CommonBarChart
          xasis={attendanceTrendsXasis}
          series={attendanceTrendsSeries}
          colors={attendanceTrendsColors}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Employee List</p>
          <CommonTable
            columns={columns}
            dataSource={employeeList}
            scroll={{ x: 1000 }}
            dataPerPage={4}
          />
        </div>
      </div>
    </div>
  );
};

export default AddendanceDetail;
