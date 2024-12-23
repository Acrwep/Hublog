import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";

const LogsReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const data = [
    {
      key: "1",
      employee: "Balaji",
      team: "Developement",
      Application: "Chrome",
      url: "https://web.whatsapp.com/",
      title: "",
      starttime: "2024-07-10 07:09 PM",
      endtime: "2024-07-10 07:10 PM",
      duration: "00h:00m:10s",
      mappingstatus: "Productive",
      activetime: "00h:00m:01s",
      idletime: "00h:00m:00s",
      keypresses: "0",
      mouseclicks: "1",
      systemstatus: "Active",
    },
    {
      Key: "2",
      employee: "Vignesh",
      team: "Developement",
      Application: "Chrome",
      url: "https://web.whatsapp.com/",
      title: "",
      starttime: "2024-07-10 07:09 PM",
      endtime: "2024-07-10 07:10 PM",
      duration: "00h:00m:10s",
      mappingstatus: "Productive",
      activetime: "00h:00m:01s",
      idletime: "00h:00m:00s",
      keypresses: "0",
      mouseclicks: "1",
      systemstatus: "Active",
    },
    {
      Key: "3",
      employee: "Naresh",
      team: "UX",
      Application: "Chrome",
      url: "https://web.whatsapp.com/",
      title: "",
      starttime: "2024-07-10 07:09 PM",
      endtime: "2024-07-10 07:10 PM",
      duration: "00h:00m:10s",
      mappingstatus: "Productive",
      activetime: "00h:00m:01s",
      idletime: "00h:00m:00s",
      keypresses: "0",
      mouseclicks: "1",
      systemstatus: "InActive",
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
      title: "Team",
      dataIndex: "team",
      key: "team",
      width: "150px",
    },
    {
      title: "Application",
      dataIndex: "application",
      key: "application",
      width: "150px",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: "240px",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "150px",
    },
    {
      title: "Start time",
      dataIndex: "starttime",
      key: "starttime",
      width: "190px",
    },
    {
      title: "End time",
      dataIndex: "endtime",
      key: "endtime",
      width: "190px",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "150px",
    },
    {
      title: "Mapping status",
      dataIndex: "mappingstatus",
      key: "mappingstatus",
      width: "150px",
      render: (record) => (
        <div className="logsreport_mappingActivetextContainer">
          <p>{record}</p>
        </div>
      ),
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
      title: "Key presses",
      dataIndex: "keypresses",
      key: "keypresses",
      width: "150px",
    },
    {
      title: "Mouse clicks",
      dataIndex: "mouseclicks",
      key: "mouseclicks",
      width: "150px",
    },
    {
      title: "System status",
      dataIndex: "systemstatus",
      key: "systemstatus",
      width: "150px",
      render: (record) => {
        if (record === "Active") {
          return (
            <div className="logsreport_mappingActivetextContainer">
              <p>{record}</p>
            </div>
          );
        } else {
          return (
            <div className="logsreport_statusInActivetextContainer">
              <p>{record}</p>
            </div>
          );
        }
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
        <p style={{ marginLeft: "12px" }}>Logs Report</p>
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
          <div style={{ width: "30%" }}>
            <CommonDatePicker onChange={onDateChange} value={date} />
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
        </Col>
      </Row>
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1600 }}
          dataPerPage={4}
          checkBox="false"
          bordered="true"
        />
      </div>
    </div>
  );
};

export default LogsReport;
