import React, { useState, useEffect } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { TbCirclesFilled } from "react-icons/tb";
import Summary from "./Summary";
import AttendanceDetail from "./AddendanceDetail";
import DateWiseAttendance from "./DateWiseAttendance";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import "./styles.css";

const Attendance = () => {
  // Sample data for charts
  const [activePage, setActivePage] = useState(1);
  const teamList = [{ id: 1, name: "Operation" }];

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <TbCirclesFilled size={20} />
            </div>
            <h2 className="allpage_mainheadings">Attendance</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="summary_container">
            <Button
              className={
                activePage === 1
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(1)}
            >
              Summary
            </Button>
            <Button
              className={
                activePage === 2
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(2)}
            >
              Detailed
            </Button>
            <Button
              className={
                activePage === 3
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(3)}
            >
              Datewise Attendance
            </Button>
          </div>
        </Col>
      </Row>

      {/* <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <div className="attendance_iconContainer">
            <TbCirclesFilled size={20} />
          </div>
          <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
            Attendance
          </h2>
        </div>
       
      </div> */}
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              {/* <CommonDatePicker onChange={onDateChange} value={date} /> */}
              <CommonDoubleDatePicker />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <div>
        {activePage === 1 && (
          <div>
            <Summary />
            {/* Add your content for page 1 here */}
          </div>
        )}
        {activePage === 2 && (
          <div>
            <AttendanceDetail />
          </div>
        )}
        {activePage === 3 && (
          <div>
            <DateWiseAttendance />
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
