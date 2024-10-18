import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, DatePicker } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX.js";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import moment from "moment";
import CommonAvatar from "../Common/CommonAvatar";
import { dayJs } from "../Utils";
import {
  getMonthlyInandOutReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import * as XLSX from "xlsx";

const MonthlyInandOutReport = () => {
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
  const [loading, setLoading] = useState(false);

  const DownloadTable = (data, fileName) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Prepare the worksheet data
    const worksheetData = [];

    // Add the header row
    worksheetData.push(["Employee", "Date", "In", "Out"]);

    // Prepare an array to store rows
    const rows = [];

    // Collect rows
    data.forEach((record) => {
      const employeeName = `${record.first_name} ${record.last_name}`;

      Object.keys(record).forEach((key) => {
        if (key !== "first_name" && key !== "last_name") {
          const date = key;
          const timeData = record[key];

          let inTime = "";
          let outTime = "";

          if (timeData) {
            if (
              timeData.in &&
              timeData.in !== "weeklyoff" &&
              timeData.in !== "0001-01-01T00:00:00"
            ) {
              inTime = moment(timeData.in).format("hh:mm A");
            } else if (timeData.in === "weeklyoff") {
              inTime = "Weekly Off";
            }

            if (
              timeData.out &&
              timeData.in !== "weeklyoff" &&
              timeData.out !== "0001-01-01T00:00:00"
            ) {
              outTime = moment(timeData.out).format("hh:mm A");
            } else if (timeData.out === "weeklyoff") {
              outTime = "Weekly Off";
            }
          }

          rows.push([employeeName, date, inTime, outTime]);
        }
      });
    });

    // Sort rows by date
    rows.sort((a, b) => {
      const dateA = moment(a[1], "DD").toDate(); // Assuming dates are in "DD" format
      const dateB = moment(b[1], "DD").toDate(); // Assuming dates are in "DD" format
      return dateA - dateB;
    });

    // Add sorted rows to worksheet data
    worksheetData.push(...rows);

    // Create worksheet from array of arrays
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Ensure the file name is a string
    if (typeof fileName !== "string" || fileName.trim() === "") {
      throw new Error("Invalid file name");
    }

    // Write the workbook to file
    XLSX.writeFile(workbook, fileName);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 500);
    }
  };

  const getUsersData = async () => {
    let userIdd = null;
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
        getMonthlyInandOutData(
          userId,
          teamId,
          orgId,
          currentMonthName,
          currentYear
        );
      }, 500);
    }
  };

  const getMonthlyInandOutData = async (user, team, orgId, month, year) => {
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
      const response = await getMonthlyInandOutReport(payload);
      console.log("monthly inandout report response", response.data);
      const MonthlyAttendanceData = response.data.users;
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

  const prepareTableData = (data, monthname, year) => {
    const currentMonthDates = getCurrentMonthDates(monthname, year);
    // const datesToCheck = generateDatesForMonth(monthname, year);
    return data.map((item, index) => {
      const rowData = {
        key: index,
        full_Name: item.full_Name,
      };
      // Initialize each date column with null
      currentMonthDates.forEach((date) => {
        rowData[date] = null;
      });
      // Fill in the total_time if the log date matches
      item.logs.forEach((log) => {
        const logDate = moment(log.date).format("DD"); // Format log date
        if (currentMonthDates.includes(logDate)) {
          rowData[logDate] = { in: log.in, out: log.out };
        }
      });

      // Set "Weekly off" for Sundays
      //use this if use datesToCheck
      // currentMonthDates.forEach((date) => {
      //   const isSunday = moment(date, "YYYY-MM-DD").day() === 0;
      //   if (isSunday) {
      //     rowData[date] = "weeklyoff";
      //   }
      // });
      currentMonthDates.forEach((date) => {
        const dateString = `${year}-${
          moment().month(monthname).month() + 1
        }-${date}`;
        const isSunday = moment(dateString, "YYYY-M-D").day() === 0;
        if (isSunday) {
          rowData[date] = { in: "weeklyoff", out: "weeklyoff" };
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
      border: "1px solid gray",
      className: "target-column-class",
      children: [
        {
          title: (
            <div
              style={{
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              In
            </div>
          ),
          dataIndex: [date, "in"],
          key: `${date}_in`,
          width: 100,
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
                    <p className="monthlyinout_weeklyoff_text">Weekly off</p>
                  </div>
                ),
              };
            } else if (record === undefined) {
              return;
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
                    borderRight: "1px solid #d5d1d1",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    <p className="monthlyInOuttime_text">
                      {moment(record).format("hh:mm A")}
                    </p>
                  </div>
                ),
              };
            }
          },
        },
        {
          title: (
            <div style={{ textAlign: "center", fontWeight: "400" }}>Out</div>
          ),
          // dataIndex: `${date}_out`,
          // key: `${date}_out`,
          dataIndex: [date, "out"],
          key: `${date}_out`,
          width: 100,
          render: (record) => {
            if (record === "weeklyoff") {
              return {
                props: {
                  style: {
                    background: "rgb(211 47 47 / 27%)",
                    borderRight: "none",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    {/* <p className="monthlyInOuttime_text">{record}</p> */}
                  </div>
                ),
              };
            } else if (record === undefined) {
              return;
            } else if (record === "0001-01-01T00:00:00") return null;
            else {
              return {
                props: {
                  style: {
                    background: "rgb(20 184 166 / 20%)",
                    borderRight: "1px solid #d5d1d1",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    <p className="monthlyInOuttime_text">
                      {moment(record).format("hh:mm A")}
                    </p>
                  </div>
                ),
              };
            }
          },
        },
      ],
    }));

    return [
      {
        title: "Employee",
        dataIndex: "first_name",
        key: "employee",
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
      getMonthlyInandOutData(userIdd, value, organizationId, monthName, year);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getMonthlyInandOutData(value, teamId, organizationId, monthName, year);
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

      getMonthlyInandOutData(
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
    } else {
      setTeamId(null);
      setUserId(null);
      setDate(dayJs());
      setUserList(nonChangeUserList);
      setMonthName(currentMonthName);
      setYear(currentYear);
      getMonthlyInandOutData(
        null,
        null,
        organizationId,
        currentMonthName,
        currentYear
      );
    }
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
        <p style={{ marginLeft: "12px" }}>Monthly In-Out Report</p>
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
            className="reports_monthlypicker"
          />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTable(data, `${monthName} Monthly IN-Out Report.xlsx`);
              }}
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
          loading={loading}
          bordered="true"
          checkBox="false"
          size="small"
        />
      </div>
    </div>
  );
};

export default MonthlyInandOutReport;
