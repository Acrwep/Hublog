import React from "react";
import { PiDevicesBold } from "react-icons/pi";
import { Col, Row } from "antd";
import CommonDonutChart from "../components/Common/CommonDonutChart";
import "./styles.css";
import CommonTable from "../components/Common/CommonTable";

const Devices = () => {
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
    <div className="alerts_mainContainer">
      <div className="flex">
        <div className="userdetail_iconContainer">
          <PiDevicesBold size={22} />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Devices
        </h2>
      </div>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Status of devices: PC</p>
            <p className="devices_chartsubheading">
              Distribution between offline and online devices.
            </p>
            <CommonDonutChart
              labels={["Online Devices", "Offline Devices"]}
              colors={["#25a17d", "#e93b3a"]}
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
              colors={["#0174cd", "#f6c614"]}
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
