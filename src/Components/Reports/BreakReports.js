import React, { useState, useEffect } from "react";
import { TbReport } from "react-icons/tb";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";

const BreakReports = () => {
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const data = [
    {
      employee: "Balaji",
      key: "1",
      breaktype: "Lunch",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "2",
      key: "2",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "3",
      key: "4",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "4",
      key: "5",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: "150px",
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

      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <CommonSelectField
            options={teamList}
            placeholder="All Teams"
            style={{ width: "170px" }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="alerts_calendarContainer"
          style={{ display: "flex", justifyContent: "flex-end" }}
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
      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
    </div>
  );
};

export default BreakReports;
