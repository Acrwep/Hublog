import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import CommonTable from "../../Components/Common/CommonTable";
import CommonMonthlyCalendar from "../../Components/Common/CommonMonthlyCalendar";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import "./styles.css";
import Loader from "../Common/Loader";
import moment from "moment";

export default function UserAttendance({
  attendanceSummary,
  loading,
  filterLoading,
}) {
  const userAttendanceDetails = useSelector((state) => state.userAttendance);
  const columns = [
    {
      title: "Date",
      dataIndex: "attendanceDate",
      key: "attendanceDate",
      width: 140,
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    {
      title: "Check In",
      dataIndex: "start_Time",
      key: "start_Time",
      width: 120,
      render: (text, record) => {
        return <p>{moment(text).format("hh:mm A")} </p>;
      },
    },
    {
      title: "Check Out",
      dataIndex: "end_Time",
      key: "end_Time",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return <p>{moment(text).format("hh:mm A")} </p>;
      },
    },
    {
      title: "Duration",
      dataIndex: "total_Time",
      key: "total_Time",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return <p>{moment(text).format("H[h]:mm[m]")} </p>;
      },
    },
  ];

  const presentCount = 30;
  const absentCount = 20;
  const series = [presentCount, absentCount];

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={9}>
              <div className="userdetail_calendarContainer">
                <p className="userattendance_heading">Attendance</p>
                <CommonDonutChart
                  labels={["Present", "Absent"]}
                  colors={["#25a17d", "#ABB3B3"]}
                  series={[
                    attendanceSummary.daysPresent,
                    attendanceSummary.daysLeave,
                  ]}
                  labelsfontSize="19px"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={15}>
              <div className="userdetail_calendarsContainer">
                <p className="userattendance_heading">Monthly Attendance</p>
                <CommonMonthlyCalendar />
              </div>
            </Col>
          </Row>

          <div className="userattendancetable_Container">
            <p
              style={{
                fontWeight: 600,
                fontSize: "17px",
              }}
            >
              Detail
            </p>
            <CommonTable
              columns={columns}
              dataSource={userAttendanceDetails}
              scroll={{ x: 600 }}
              dataPerPage={10}
              checkBox="false"
              bordered="false"
              loading={filterLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
