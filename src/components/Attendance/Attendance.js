import React, { useState, useEffect } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { TbCirclesFilled } from "react-icons/tb";
import Summary from "./Summary";
import AttendanceDetail from "./AddendanceDetail";
import DateWiseAttendance from "./DateWiseAttendance";
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
