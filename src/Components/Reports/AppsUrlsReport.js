import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Collapse } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { Progress } from "antd";
import CommonBarChart from "../Common/CommonBarChart";

const AppsUrlsReport = () => {
  const navigation = useNavigate();
  const { Panel } = Collapse;
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  const xasis = [
    "docs.google.com",
    "https://web.whatsapp.com",
    "https://acte.we360.ai/reports",
  ];

  const series = [
    { data: [3.0, 2.72, 2.17] }, // Replace with your actual hours data
  ];

  const data = [
    {
      key: "1",
      type: "URL",
      details: "docs.google.com",
      usage: "3.53%",
      usageduration: "119h:08m:06s",
    },
    {
      key: "2",
      type: "URL",
      details: "https://web.whatsapp.com",
      usage: "3.53%",
      usageduration: "119h:08m:06s",
    },
    {
      key: "3",
      type: "URL",
      details: "https://acte.we360.ai/reports",
      usage: "3.53%",
      usageduration: "119h:08m:06s",
    },
  ];

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "100px",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: "170px",
    },
    {
      title: "Usage%",
      dataIndex: "usage",
      key: "usage",
      width: "150px",
    },
    {
      title: "Usage duration",
      dataIndex: "usageduration",
      key: "usageduration",
      width: "160px",
    },
  ];
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
        <p style={{ marginLeft: "12px" }}>Teams Insight Report</p>
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

      <div className="devices_chartsContainer">
        <p className="devices_chartheading">Top Usage Statistics</p>
        <CommonBarChart
          xasis={xasis}
          series={series}
          timebased="true"
          distributed="true"
          legend="false"
        />
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="breakreport_tableContainer">
          <p className="appurlreport_tableheading">Detailed Usage list</p>
          <CommonTable
            columns={columns}
            dataSource={data}
            scroll={{ x: 600 }}
            dataPerPage={4}
            checkBox="false"
            bordered="true"
          />
        </div>
      </div>
    </div>
  );
};

export default AppsUrlsReport;
