import React, { useState, useEffect } from "react";
import { BiSolidBell } from "react-icons/bi";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";

const Alerts = () => {
  const [date, setDate] = useState(new Date());
  const data = [
    {
      data: "1",
      key: "1",
      alertdescription: "lyuhj",
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
    { title: "Data", dataIndex: "data", key: "data", width: "150px" },
    {
      title: "Alert Description",
      dataIndex: "alertdescription",
      key: "data",
      width: "150px",
    },
    {
      title: "Alert Type",
      dataIndex: "alerttype",
      key: "data",
      width: "150px",
    },
    {
      title: "Triggered for",
      dataIndex: "triggeredfor",
      key: "data",
      width: "150px",
    },
    {
      title: "Triggered time",
      dataIndex: "triggeredtime",
      key: "data",
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
          <BiSolidBell size={20} />
        </div>
        <h2 className="allpage_mainheadings">Alerts</h2>
      </div>

      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          className="alerts_calendarContainer"
        >
          <div style={{ width: "35%" }}>
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
      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
    </div>
  );
};

export default Alerts;
