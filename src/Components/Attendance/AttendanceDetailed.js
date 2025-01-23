import React, { useState, useEffect } from "react";
import { Drawer, Calendar, Skeleton } from "antd";
import CommonTable from "../Common/CommonTable";
import CommonAvatar from "../Common/CommonAvatar";
import { useSelector } from "react-redux";
import moment from "moment";
import "./styles.css";
import { HiOutlineCalendar } from "react-icons/hi2";
import { dayJs } from "../Utils";
import { CommonToaster } from "../Common/CommonToaster";
import { getUserPunchInOutDetails } from "../APIservice.js/action";
import { FaRegUser } from "react-icons/fa6";
import Desktopicon from "../../assets/images/computer.png";
import CommonNodatafound from "../Common/CommonNodatafound";
import DashboardChart from "../Dashboard/DashboardChart";

const AttendanceDetailed = ({ loading, uList, selectUser }) => {
  const employeeAttendanceList = useSelector(
    (state) => state.attendanceandbreaksummary
  );
  const attendanceTrendsData = useSelector((state) => state.attendancetrends);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userPunchInOutData, setUserPunchInOutData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [calendarDate, setCalendarDate] = useState(dayJs());
  const [drawerTableLoading, setDrawerTableLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: 240,
      fixed: "left",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={28} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attendanceCount",
      key: "attendanceCount",
      width: 140,
      render: (text, record) => {
        if (text === null) {
          return 0;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Team Name",
      dataIndex: "team_Name",
      key: "team_Name",
      hidden: true,
    },
    {
      title: "Working time",
      dataIndex: "total_wokingtime",
      key: "total_wokingtime",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Online time",
      dataIndex: "online_duration",
      key: "online_duration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Active time",
      dataIndex: "activeTime",
      key: "activeTime",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Idle time",
      dataIndex: "idleDuration",
      key: "idleDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "breakDuration",
      key: "breakDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 90,
      fixed: "right",
      align: "center",
      render: (text, record) => {
        return (
          <button onClick={() => handleCalendar(record)}>
            <HiOutlineCalendar size={20} color="gray" />
          </button>
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

  const getUserPunchInOutData = async (userid, date) => {
    setDrawerTableLoading(true);
    const orgId = localStorage.getItem("organizationId");
    const payload = {
      userId: userid,
      organizationId: orgId,
      startDate: date,
      endDate: date,
    };
    try {
      const response = await getUserPunchInOutDetails(payload);
      const details = response?.data;
      console.log("logs response", response);
      setUserPunchInOutData(details);
    } catch (error) {
      console.log("attendance error", error);
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setDrawerTableLoading(false);
      }, 300);
    }
  };
  //onchange functions
  const handleCalendarChange = (date) => {
    const dates = new Date(date.$d);
    setCalendarDate(dayJs(dates));
    const convertDate = moment(dates).format("YYYY-MM-DD");
    getUserPunchInOutData(userId, convertDate);
  };

  const handleCalendar = (record) => {
    setIsDrawerOpen(true);
    setCalendarDate(dayJs());
    const clickedUser = uList.find((f) => f.full_Name === record.full_Name);
    setUserId(clickedUser.id);
    setUserName(clickedUser.full_Name);
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
    getUserPunchInOutData(clickedUser.id, formattedCurrentDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Ensure month and day are two digits
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  // Disable future dates
  const disableFutureDates = (current) => {
    return current && current > dayJs().endOf("day"); // Disable dates greater than today
  };

  return (
    <div>
      <div className="devices_chartsContainer">
        {loading ? (
          <Skeleton
            active
            style={{ height: "50vh" }}
            title={{ width: 140 }}
            paragraph={{
              rows: 0,
            }}
          />
        ) : (
          <>
            <p className="devices_chartheading">Attendance Trends</p>
            {attendanceTrendsData.length >= 1 ? (
              <DashboardChart data={attendanceTrendsData} />
            ) : (
              <CommonNodatafound />
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Employee List</p>
          <CommonTable
            columns={columns}
            dataSource={employeeAttendanceList}
            scroll={{ x: 1200 }}
            dataPerPage={10}
            bordered="false"
            checkBox="false"
            size="small"
            loading={loading}
          />
        </div>
      </div>

      {/* calendar drawer */}
      <Drawer
        title={userName}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width="30%"
        styles={{ body: { padding: "0px 12px" } }}
      >
        <div className="attendancedetail_employeelistCalender">
          <Calendar
            fullscreen={false}
            mode="month"
            value={calendarDate}
            onChange={handleCalendarChange}
            disabledDate={disableFutureDates}
          />

          <div style={{ marginTop: "10px" }}>
            <CommonTable
              columns={drawerColumns}
              dataSource={userPunchInOutData}
              scroll={{ x: 350 }}
              dataPerPage={1000}
              checkBox="false"
              bordered="true"
              size="small"
              paginationStatus={false}
              loading={drawerTableLoading}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AttendanceDetailed;
