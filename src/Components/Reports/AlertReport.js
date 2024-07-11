import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import CommonAvatar from "../Common/CommonAvatar";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";

const AlertReport = () => {
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
      date: "02/07/24",
      alertdescription: "On the nearby hills are numerous.",
      alerttype: "",
      triggeredfor: "",
      triggeredtime: "02:12 PM",
    },
    {
      key: "2",
      date: "04/07/24",
      alertdescription: "On the nearby hills are numerous.",
      alerttype: "",
      triggeredfor: "",
      triggeredtime: "02:12 PM",
    },
    {
      key: "3",
      date: "06/07/24",
      alertdescription: "On the nearby hills are numerous.",
      alerttype: "",
      triggeredfor: "",
      triggeredtime: "02:16 PM",
    },
    {
      key: "4",
      date: "07/07/24",
      alertdescription: "On the nearby hills are numerous.",
      alerttype: "",
      triggeredfor: "",
      triggeredtime: "02:19 PM",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "120px",
    },
    {
      title: "Alert Description",
      dataIndex: "alertdescription",
      key: "alertdescription",
      width: "120px",
    },
    {
      title: "Alert Type",
      dataIndex: "alerttype",
      key: "alerttype",
      width: "100px",
    },
    {
      title: "Triggered for",
      dataIndex: "triggeredfor",
      key: "triggeredfor",
      width: "100px",
    },
    {
      title: "Triggered time",
      dataIndex: "triggeredtime",
      key: "triggeredtime",
      width: "100px",
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
        className="dailyreports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Alert Report</p>
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
          scroll={{ x: 600 }}
          dataPerPage={4}
          bordered="true"
          checkBox="false"
        />
      </div>
    </div>
  );
};

export default AlertReport;
