import React, { useState } from "react";
import { Col, Row } from "antd";
import CommonTable from "../../components/Common/CommonTable";
import "./styles.css";
import CommonMonthlyCalendar from "../../components/Common/CommonMonthlyCalendar";
import CommonDonutChart from "../../components/Common/CommonDonutChart";

export default function UserWellness() {
  const columns = [
    {
      title: "Total Present",
      dataIndex: "totalpresent",
      key: "date",
      width: 100,
    },
    { title: "Healthy", dataIndex: "healthy", key: "in", width: 100 },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "out",
      width: 100,
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
    {
      key: "2",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
    {
      key: "3",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
  ]);

  const presentCount = 30;
  const absentCount = 20;
  const series = [presentCount, absentCount];

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="userdetail_calendarContainer">
            <p className="userattendance_heading">Attendance</p>
            <CommonDonutChart
              labels={["Present", "Absent"]}
              colors={["#25a17d", "#7A7D7C"]}
              series={series}
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
        <p style={{ fontWeight: 600, fontSize: "17px", marginBottom: "10px" }}>
          Detail
        </p>

        <CommonTable
          columns={columns}
          dataSource={dummydatas}
          scroll={{ x: 600 }}
          dataPerPage={4}
        />
      </div>
    </div>
  );
}
