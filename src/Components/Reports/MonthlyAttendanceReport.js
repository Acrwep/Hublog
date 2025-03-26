import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, DatePicker } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV.js";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import moment from "moment";
import CommonAvatar from "../Common/CommonAvatar";
import { dayJs } from "../Utils";
import {
  getMonthlyAttendanceReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";

const MonthlyAttendanceReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(dayJs().subtract(0, "month"));
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [data, setData] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState();
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (managerTeamId) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    try {
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 500);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setNonChangeUserList(users);
      setUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        const currentMonthName = moment().format("MMMM"); // get current month name
        const currentYear = moment().year(); // get current year
        setMonthName(currentMonthName);
        setYear(currentYear);
        getMonthlyAttendanceData(
          userId,
          teamId,
          orgId,
          currentMonthName,
          currentYear
        );
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");
    setOrganizationId(orgId);

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setUserId(null);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      setUserList([]);
      setNonChangeUserList([]);
    } finally {
      setTimeout(() => {
        const currentMonthName = moment().format("MMMM"); // get current month name
        const currentYear = moment().year(); // get current year
        setMonthName(currentMonthName);
        setYear(currentYear);
        getMonthlyAttendanceData(
          userId,
          managerTeamId,
          orgId,
          currentMonthName,
          currentYear
        );
      }, 350);
    }
  };

  const getMonthlyAttendanceData = async (user, team, orgId, month, year) => {
    setLoading(true);
    const payload = {
      ...(user && { userId: user }),
      ...(team && { teamId: team }),
      organizationId: parseInt(orgId),
      month:
        month === "January"
          ? "01"
          : month === "February"
          ? "02"
          : month === "March"
          ? "03"
          : month === "April"
          ? "04"
          : month === "May"
          ? "05"
          : month === "June"
          ? "06"
          : month === "July"
          ? "07"
          : month === "August"
          ? "08"
          : month === "September"
          ? "09"
          : month === "October"
          ? "10"
          : month === "November"
          ? "11"
          : month === "December"
          ? "12"
          : "",
      year: year,
    };
    try {
      const response = await getMonthlyAttendanceReport(payload);
      console.log("monthly attendance report response", response.data);
      const MonthlyAttendanceData = response?.data?.users;
      const preparedData = prepareTableData(MonthlyAttendanceData, month, year);

      console.log("tabledatasss", preparedData);
      setData(preparedData);
    } catch (error) {
      setData([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const generateDatesForMonth = (monthName, year) => {
    const monthIndex = moment().month(monthName).month(); // Zero-based index
    const startOfMonth = moment([year, monthIndex, 1]);
    const endOfMonth = startOfMonth.clone().endOf("month");
    const dates = [];

    let current = startOfMonth;
    while (current.isSameOrBefore(endOfMonth)) {
      dates.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "days");
    }

    return dates;
  };

  const prepareTableData = (data, monthname, year) => {
    const currentMonthDates = getCurrentMonthDates(monthname, year);
    // const datesToCheck = generateDatesForMonth(monthname, year);
    return data.map((item, index) => {
      const rowData = {
        key: index,
        full_Name: item.full_Name,
        team_Name: item.team_Name,
      };
      // Initialize each date column with null
      currentMonthDates.forEach((date) => {
        rowData[date] = null;
      });

      // Fill in the total_time if the log date matches
      item.logs.forEach((log) => {
        const logDate = moment(log.date).format("DD"); // Format log date
        if (currentMonthDates.includes(logDate)) {
          if (log.total_time === "00:00" || log.total_time === null) {
            rowData[logDate] = null;
          } else {
            const [hour, minute] = log.total_time.split(":");
            rowData[logDate] = `${hour}h:${minute}m`;
          }
        }
      });

      // Set "Weekly off" for Sundays, but show total_time if it's not "00:00"
      currentMonthDates.forEach((date) => {
        const dateString = `${year}-${
          moment().month(monthname).month() + 1
        }-${date}`;
        const isSunday = moment(dateString, "YYYY-M-D").day() === 0;

        if (isSunday) {
          // Check if the total_time for that Sunday is not "00:00"
          const sundayLog = item.logs.find(
            (log) => moment(log.date).format("DD") === date
          );
          if (
            sundayLog &&
            sundayLog.total_time !== "00:00:00" &&
            sundayLog.total_time !== null
          ) {
            const [hour, minute] = sundayLog.total_time.split(":");
            rowData[date] = `${hour}h:${minute}m`; // Show the time for Sundays if not "00:00"
          } else {
            rowData[date] = "weeklyoff"; // Show "weeklyoff" if total_time is "00:00"
          }
        }
      });
      return rowData;
    });
    // Transform rowData into DD: value format
    //   const formattedRowData = {
    //     key: rowData.first_name,
    //     first_name: rowData.first_name,
    //     last_name: rowData.last_name,
    //   };

    //   for (const date of datesToCheck) {
    //     const day = moment(date).format("DD"); // Get the day in DD format
    //     formattedRowData[day] = rowData[date]; // Assign value to the day
    //   }

    //   return formattedRowData; // Return the formatted data
    // });
  };

  const getCurrentMonthDates = (monthname, year) => {
    const monthIndex = moment().month(monthname).month();

    const startOfMonth = moment([year, monthIndex, 1]);
    const endOfMonth = startOfMonth.clone().endOf("month");

    const dates = [];
    let current = startOfMonth;

    while (current.isSameOrBefore(endOfMonth)) {
      dates.push(current.format("DD"));
      current = current.add(1, "days");
    }
    return dates;
  };

  // Generate columns
  const generateColumns = (monthName, year) => {
    const currentMonthName = moment().format("MMMM"); // get current month name
    const currentYear = moment().year(); // get current year

    const currentMonthDates = getCurrentMonthDates(
      monthName ? monthName : currentMonthName,
      year ? year : currentYear
    );

    const dateColumns = currentMonthDates.map((date) => ({
      title: date,
      dataIndex: date,
      key: date,
      width: 120,
      render: (text, record) => {
        return <p>{text}</p>;
      },

      render: (record) => {
        if (record === "weeklyoff") {
          return {
            props: {
              style: {
                background: "rgb(211 47 47 / 27%)",
                borderRight: "none",
                borderBottom: "1.7px solid white",
                position: "relative",
              },
            },
            children: (
              <div>
                <p className="monthlyattendance_monthlyweeklyofftext">
                  Weekly off
                </p>
              </div>
            ),
          };
        } else if (record === undefined || record === null) {
          return null;
        } else {
          return {
            props: {
              style: {
                background:
                  record === "weeklyoff"
                    ? "rgb(211 47 47 / 27%)"
                    : record === ""
                    ? "white"
                    : "rgb(20 184 166 / 20%)",
              },
            },
            children: (
              <div>
                <p className="monthlyInOuttime_text">{record}</p>
              </div>
            ),
          };
        }
      },
    }));

    return [
      {
        title: "Employee",
        dataIndex: "full_Name",
        key: "full_Name",
        width: 240,
        fixed: "left",
        render: (text, record) => {
          return (
            <div className="breakreport_employeenameContainer">
              <CommonAvatar avatarSize={26} itemName={record.full_Name} />
              <p className="reports_avatarname">{record.full_Name}</p>
            </div>
          );
        },
      },
      {
        title: "Team Name",
        dataIndex: "team_Name",
        key: "team_Name",
        width: "150px",
        hidden: true,
      },
      ...dateColumns,
    ];
  };

  const columns = useMemo(() => {
    return generateColumns(monthName, year);
  }, [monthName, year]);

  const handleTeam = async (value) => {
    setTeamId(value);
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }

      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
      getMonthlyAttendanceData(userIdd, value, organizationId, monthName, year);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getMonthlyAttendanceData(value, teamId, organizationId, monthName, year);
  };

  const onDateChange = (date, dateString) => {
    // Log the date and formatted date string
    setDate(date);
    // If a date is selected, format it to get the month name and log it
    if (date) {
      const selectedMonthName = date.format("MMMM");
      const selectedYear = date.format("YYYY");
      console.log("Selected Month:", selectedMonthName, selectedYear);
      setMonthName(selectedMonthName);
      setYear(selectedYear);
      generateColumns(selectedMonthName, selectedYear);

      getMonthlyAttendanceData(
        userId,
        teamId,
        organizationId,
        selectedMonthName,
        selectedYear
      );
    }
  };

  // Function to get the formatted month name from the date
  const getMonthName = (date) => {
    if (date) {
      return date.format("MMMM");
    }
    return "";
  };

  const disabledDate = (current) => {
    // Disable all future dates
    return current && current > dayJs().endOf("month");
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    const currentMonthName = moment().format("MMMM");
    const currentYear = moment().year();
    let isMonthChange = false;

    if (currentMonthName === monthName && currentYear === year) {
      isMonthChange = false;
    } else {
      isMonthChange = true;
    }
    console.log(isMonthChange);

    if (isMonthChange === false && teamId === null && userId === null) {
      return;
    }
    if (isMonthChange === false && managerTeamId && userId === null) {
      return;
    }
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setDate(dayJs());
    setUserList(nonChangeUserList);
    setMonthName(currentMonthName);
    setYear(currentYear);
    getMonthlyAttendanceData(
      null,
      managerTeamId ? parseInt(managerTeamId) : null,
      organizationId,
      currentMonthName,
      currentYear
    );
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
        className="dailyreports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Monthly Attendance Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField
                placeholder="All Teams"
                options={teamList}
                onChange={handleTeam}
                value={teamId}
                disabled={isManager}
              />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField
                placeholder="Select User"
                options={userList}
                onChange={handleUser}
                value={userId}
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
          {/* <CommonDatePicker onChange={onDateChange} value={date} month="true" /> */}
          <DatePicker
            picker="month"
            onChange={onDateChange}
            value={date}
            format={getMonthName}
            disabledDate={disabledDate}
            allowClear={false}
          />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(
                  data,
                  columns,
                  `${monthName} Monthly Attendance Report.csv`
                );
              }}
              disabled={loading ? true : false}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button
              className="dashboard_refresh_button"
              onClick={handleRefresh}
            >
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
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          loading={loading}
          size="small"
        />
      </div>
    </div>
  );
};

export default MonthlyAttendanceReport;
