import React, { useEffect, useState } from "react";
import { Col, Row, Skeleton, Drawer, Avatar } from "antd";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import CommonTable from "../../Components/Common/CommonTable";
import CommonMonthlyCalendar from "../../Components/Common/CommonMonthlyCalendar";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import Desktopicon from "../../assets/images/computer.png";
import "./styles.css";
import Loader from "../Common/Loader";
import moment from "moment";
import { CommonToaster } from "../Common/CommonToaster";
import {
  getUserAttendance,
  getUserPunchInOutDetails,
} from "../APIservice.js/action";

export default function UserAttendance({
  attendanceSummary,
  selectedUserId,
  userFullName,
  userEmail,
  loading,
  filterLoading,
}) {
  const userAttendanceDetails = useSelector((state) => state.userAttendance);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateAttendanceData, setSelectedDateAttendanceData] = useState(
    []
  );
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
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
      title: "Punch In",
      dataIndex: "start_Time",
      key: "start_Time",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaRegUser
                color="#666767"
                size={14}
                style={{ marginRight: "4.5px" }}
              />
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "Punch Out",
      dataIndex: "end_Time",
      key: "end_Time",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {record.punchout_type === "system" ? (
                <img
                  src={Desktopicon}
                  style={{
                    width: "18px",
                    height: "19px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <FaRegUser
                  color="#666767"
                  size={14}
                  style={{ marginRight: "4.5px" }}
                />
              )}
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "Duration",
      dataIndex: "total_Time",
      key: "total_Time",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00" || text === null) {
          return null;
        } else {
          const [hours, minutes] = text.split(":");
          const formattedDuration = `${parseInt(hours)}h:${parseInt(minutes)}m`;
          return <p>{formattedDuration} </p>;
        }
      },
    },
    {
      title: "Logs",
      dataIndex: "logs",
      key: "logs",
      width: 90,
      render: (text, record) => {
        return (
          <SlEye
            color="#666767"
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => handleMothlyCalendar(record.attendanceDate)}
          />
        );
      },
    },
  ];

  const drawerColumns = [
    {
      title: "In",
      dataIndex: "start_Time",
      key: "start_Time",
      width: 90,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaRegUser
                color="#666767"
                size={14}
                style={{ marginRight: "4.5px" }}
              />
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "Out",
      dataIndex: "end_Time",
      key: "end_Time",
      width: 90,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00" || text === null) {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {record.punchout_type === "system" ? (
                <img
                  src={Desktopicon}
                  style={{
                    width: "18px",
                    height: "19px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <FaRegUser
                  color="#666767"
                  size={14}
                  style={{ marginRight: "4.5px" }}
                />
              )}
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "Duration",
      dataIndex: "total_Time",
      key: "total_Time",
      width: 90,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00" || text === null) {
          return null;
        } else {
          const [hours, minutes, seconds] = text.split(":");
          const formattedDuration = `${parseInt(hours)}h:${parseInt(
            minutes
          )}m:${parseInt(seconds)}s`;
          return <p>{formattedDuration} </p>;
        }
      },
    },
  ];

  const handleMothlyCalendar = async (value) => {
    setSelectedDate(value);
    setDrawerLoading(true);
    setIsDrawerOpen(true);
    const orgId = localStorage.getItem("organizationId");
    const payload = {
      userId: selectedUserId,
      organizationId: orgId,
      startDate: value,
      endDate: value,
    };
    try {
      const response = await getUserPunchInOutDetails(payload);
      const details = response?.data;
      console.log("logs response", response);
      setSelectedDateAttendanceData(details);
      const name = userFullName.split(" ");
      setFisrtName(name[0]);
      setLastName(name[1]);
    } catch (error) {
      console.log("attendance error", error);
      CommonToaster(error.response?.data?.message, "error");
      setSelectedDateAttendanceData([]);
      setFisrtName("");
      setLastName("");
    } finally {
      setTimeout(() => {
        setDrawerLoading(false);
      }, 350);
    }
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={9}>
              <div className="userdetail_calendarContainer">
                {filterLoading ? (
                  <Skeleton
                    active
                    paragraph={{
                      rows: 0,
                    }}
                  />
                ) : (
                  <p className="userattendance_heading">Attendance</p>
                )}
                {filterLoading ? (
                  ""
                ) : (
                  <CommonDonutChart
                    labels={["Present", "Absent"]}
                    colors={["#25a17d", "#ABB3B3"]}
                    series={[
                      attendanceSummary.daysPresent,
                      attendanceSummary.daysLeave,
                    ]}
                    labelsfontSize="19px"
                  />
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={15}>
              <div className="userdetail_calendarsContainer">
                {filterLoading ? (
                  <div style={{ height: "45vh" }}>
                    <Skeleton
                      active
                      paragraph={{
                        rows: 0,
                      }}
                    />
                  </div>
                ) : (
                  <p className="userattendance_heading">Monthly Attendance</p>
                )}
                {filterLoading ? (
                  ""
                ) : (
                  <CommonMonthlyCalendar
                    monthlyCalendarSelectedDate={handleMothlyCalendar}
                  />
                )}
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
              size="small"
              loading={filterLoading}
            />
          </div>

          <Drawer
            title={moment(selectedDate).format("DD/MM/YYYY")}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            width="36%"
            styles={{ body: { padding: "0px 12px" } }}
          >
            <div className="userattendance_drawerContainer">
              <div className="userattendance_avatarContainer">
                <Avatar
                  size={42}
                  style={{
                    backgroundColor: "#25a17d",
                    fontWeight: "600",
                    marginRight: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: "18px",
                  }}
                >
                  {firstName[0] + lastName[0]}
                </Avatar>
                <div>
                  <p className="userattendance_drawername">{userFullName}</p>
                  <p className="userattendance_drawermail">{userEmail}</p>
                </div>
              </div>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <CommonTable
                  columns={drawerColumns}
                  dataSource={selectedDateAttendanceData}
                  scroll={{ x: 400 }}
                  dataPerPage={1000}
                  checkBox="false"
                  bordered="true"
                  size="small"
                  paginationStatus={false}
                  loading={drawerLoading}
                />
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
}
