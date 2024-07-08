import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Flex, Progress } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";

const ActivityReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const data = [
    {
      employee: "Balaji",
      key: "1",
      attendance: "0",
      onlinetime: "00h:00m:00s",
      activetime: "00h:00m:00s",
      idletime: "00h:00m:00s",
      breaktime: "00h:00m:00s",
      keypresses: 0,
      mouseclick: 0,
      activity: 0,
    },
    {
      employee: "Vignesh",
      key: "2",
      attendance: "0",
      onlinetime: "00h:00m:00s",
      activetime: "00h:00m:00s",
      idletime: "00h:00m:00s",
      breaktime: "00h:00m:00s",
      keypresses: 0,
      mouseclick: 0,
      activity: 0,
    },
    {
      employee: "Balaji",
      key: "3",
      attendance: "0",
      onlinetime: "00h:00m:00s",
      activetime: "00h:00m:00s",
      idletime: "00h:00m:00s",
      breaktime: "00h:00m:00s",
      keypresses: 0,
      mouseclick: 0,
      activity: 0,
    },
    {
      employee: "Divya",
      key: "4",
      attendance: "1",
      onlinetime: "00h:00m:00s",
      activetime: "00h:00m:00s",
      idletime: "00h:00m:00s",
      breaktime: "00h:00m:00s",
      keypresses: 0,
      mouseclick: 0,
      activity: 20,
    },
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: "150px",
      fixed: "left",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarfontSize="17px" itemName={record.employee} />
            <p className="reports_avatarname">{record.employee}</p>
          </div>
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: "120px",
    },
    {
      title: "Online time",
      dataIndex: "onlinetime",
      key: "onlinetime",
      width: "150px",
    },
    {
      title: "Active time",
      dataIndex: "activetime",
      key: "activetime",
      width: "150px",
    },
    {
      title: "Idle time",
      dataIndex: "idletime",
      key: "idletime",
      width: "150px",
    },
    {
      title: "Break time",
      dataIndex: "breaktime",
      key: "breaktime",
      width: "150px",
    },
    {
      title: "Key presses",
      dataIndex: "keypresses",
      key: "keypresses",
      width: "150px",
    },
    {
      title: "Mouse click",
      dataIndex: "mouseclick",
      key: "mouseclick",
      width: "150px",
    },
    {
      title: "Activity %",
      dataIndex: "activity",
      key: "activity",
      width: "150px",
      fixed: "right",
      render: (text, record) => {
        return (
          <Flex gap="small" vertical>
            <Progress percent={record.activity} />
          </Flex>
        );
      },
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
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div
        className="reports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Activity Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField options={teamList} placeholder="All Teams" />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField options={userList} placeholder="Select User" />
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          <CommonDoubleDatePicker onChange={onDateChange} value={date} />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(data, columns, "alerts.xlsx");
              }}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          dataPerPage={4}
          bordered="true"
          checkBox="false"
        />
      </div>
    </div>
  );
};

export default ActivityReport;
