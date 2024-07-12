import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";

const DeviceReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const data = [
    {
      key: 1,
      employee: "Alice",
      devicename: "ACTE",
      deviceid: "76c45031-bc0e-4a6a-8513-4ffab1aa8012",
      platform: "WINDOWS",
      osname: "Windows 10 Version 2009",
      osbuild: "10",
      systemtype: "x86_64",
      ip: "2405:201:e004:3890:-3d52:12c6:ef21:c20d",
      apptype: "standard",
      myzenversion: "2.7.4",
    },
    {
      key: 2,
      employee: "Alice",
      devicename: "ACTE",
      deviceid: "76c45031-bc0e-4a6a-8513-4ffab1aa8012",
      platform: "WINDOWS",
      osname: "Windows 10 Version 2009",
      osbuild: "10",
      systemtype: "x86_64",
      ip: "2405:201:e004:3890:-3d52:12c6:ef21:c20d",
      apptype: "standard",
      myzenversion: "2.7.4",
    },
    // More data...
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.employee - b.employee,
    },
    {
      title: "Device Name",
      dataIndex: "devicename",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.devicename - b.devicename,
    },
    {
      title: "Device ID",
      dataIndex: "deviceid",
      defaultSortOrder: "descend",
      width: 200,
      sorter: (a, b) => a.deviceid - b.deviceid,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.platform - b.platform,
    },
    {
      title: "OS Name",
      dataIndex: "osname",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.osname - b.osname,
    },
    {
      title: "OS Build",
      dataIndex: "osbuild",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.osbuild - b.osbuild,
    },
    {
      title: "System Type",
      dataIndex: "systemtype",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.systemtype - b.systemtype,
    },
    {
      title: "IP",
      dataIndex: "ip",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ip - b.ip,
      width: 150,
    },
    {
      title: "App Type",
      dataIndex: "apptype",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.apptype - b.apptype,
    },
    {
      title: "MyZen version",
      dataIndex: "myzenversion",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.myzenversion - b.myzenversion,
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
        <p style={{ marginLeft: "12px" }}>Device Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={22} lg={22}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField options={teamList} placeholder="All Teams" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField options={userList} placeholder="Select User" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField options={userList} placeholder="Platform" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField options={userList} placeholder="System Type" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField options={userList} placeholder="App Type" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField
                options={userList}
                placeholder="Hublog version"
              />
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={2}
          lg={2}
          className="breakreports_calendarContainer"
        >
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
          scroll={{ x: 1600 }}
          dataPerPage={4}
          checkBox="false"
          bordered="true"
        />
      </div>
    </div>
  );
};

export default DeviceReport;
