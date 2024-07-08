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

const BreakReports = () => {
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
      breaktype: "Lunch",
      breakstart: "01:00 PM",
      breakend: "01:45 PM",
    },
    {
      employee: "Vignesh",
      key: "2",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
      breakend: "11:20 AM",
    },
    {
      employee: "Goutham",
      key: "3",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
      breakend: "04:20 PM",
    },
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: "150px",
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
      title: "Break type",
      dataIndex: "breaktype",
      key: "breaktype",
      width: "150px",
    },
    {
      title: "Break start",
      dataIndex: "breakstart",
      key: "breakstart",
      width: "150px",
    },
    {
      title: "Break end",
      dataIndex: "breakend",
      key: "breakend",
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
        <p style={{ marginLeft: "12px" }}>Break Report</p>
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
          <CommonDatePicker onChange={onDateChange} value={date} />
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
          checkBox="false"
          bordered="true"
        />
      </div>
    </div>
  );
};

export default BreakReports;
