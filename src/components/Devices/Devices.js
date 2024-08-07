import React from "react";
import { PiDevicesBold } from "react-icons/pi";
import { Col, Row, Tooltip, Button } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../Common/CommonDonutChart";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";

const Devices = () => {
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const onlineDeviceCount = 70;
  const offlineDeviceCount = 30;
  const series = [onlineDeviceCount, offlineDeviceCount];

  const platformchartDatas = [80, 20];

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
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <PiDevicesBold size={20} />
        </div>
        <h2 className="allpage_mainheadings">Devices</h2>
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
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Status of devices: PC</p>
            <p className="devices_chartsubheading">
              Distribution between offline and online devices.
            </p>
            <CommonDonutChart
              labels={["Online Devices", "Offline Devices"]}
              colors={["#25a17d", "#ABB3B3"]}
              series={series}
              labelsfontSize="17px"
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Platform</p>
            <p className="devices_chartsubheading">
              Summarized view of the distribution of all the operating systems.
            </p>
            <CommonDonutChart
              labels={["Windows", "Mac"]}
              colors={["#646dd5", "#3889d7"]}
              series={platformchartDatas}
              labelsfontSize="17px"
            />
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1600 }}
          dataPerPage={4}
        />
      </div>
    </div>
  );
};

export default Devices;
