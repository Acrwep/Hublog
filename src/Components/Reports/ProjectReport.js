import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import {
  DownloadOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import CommonInputField from "../Common/CommonInputField";

const ProjectReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const assigneeList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Rubi" },
  ];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const data = [
    {
      key: "1",
      project: "Hublog",
      summary: "hello",
      description: "aijinin",
      owner: "",
      assignee: "balaji",
      reporter: "",
      createddate: "07/06/2024",
      startdate: "14/06/2024",
      duedate: "25/10/2024",
      timelogged: "",
      status: "In progress",
    },
    {
      key: "2",
      project: "E-commerce",
      summary: "hello",
      description: "aijinin",
      owner: "",
      assignee: "balaji",
      reporter: "",
      createddate: "07/06/2024",
      startdate: "14/06/2024",
      duedate: "25/10/2024",
      timelogged: "",
      status: "In progress",
    },
    {
      key: "3",
      project: "AWS",
      summary: "hello",
      description: "aijinin",
      owner: "",
      assignee: "balaji",
      reporter: "",
      createddate: "07/06/2024",
      startdate: "14/06/2024",
      duedate: "25/10/2024",
      timelogged: "",
      status: "In progress",
    },
    {
      key: "4",
      project: "Help center",
      summary: "hello",
      description: "aijinin",
      owner: "",
      assignee: "balaji",
      reporter: "",
      createddate: "07/06/2024",
      startdate: "14/06/2024",
      duedate: "25/10/2024",
      timelogged: "",
      status: "In progress",
    },
  ];

  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: "170px",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: "120px",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "150px",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      width: "150px",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: "150px",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      width: "150px",
    },
    {
      title: "Created Date",
      dataIndex: "createddate",
      key: "createddate",
      width: "150px",
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "startdate",
      width: "150px",
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
      width: "150px",
    },
    {
      title: "Time Logged",
      dataIndex: "timelogged",
      key: "timelogged",
      width: "150px",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "150px",
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
        <p style={{ marginLeft: "12px" }}>Project Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonInputField prefix={<SearchOutlined />} />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={assigneeList}
                placeholder="Search Assignee..."
              />
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
          scroll={{ x: 1200 }}
          dataPerPage={4}
          bordered="true"
          checkBox="false"
        />
      </div>
    </div>
  );
};

export default ProjectReport;
