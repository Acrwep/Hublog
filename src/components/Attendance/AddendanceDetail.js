import React, { useState } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import CommonBarChart from "../Common/CommonBarChart";
import CommonTable from "../Common/CommonTable";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import "./styles.css";

const AddendanceDetail = () => {
  const teamList = [{ id: 1, name: "Operation" }];

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
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDoubleDatePicker />
            </div>
            <Tooltip placement="top" title="Download">
              <Button className="dashboard_download_button">
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
