import React, { useState, useEffect } from "react";
import { Row, Col, Drawer, Calendar, Divider, Empty } from "antd";
import CommonBarChart from "../Common/CommonBarChart";
import CommonTable from "../Common/CommonTable";
import CommonAvatar from "../Common/CommonAvatar";
import { useSelector } from "react-redux";
import moment from "moment";
import "./styles.css";
import Loader from "../Common/Loader";
import AttendanceTrendsChart from "./AttendanceTrendsChart";
import { HiOutlineCalendar } from "react-icons/hi2";
import { dayJs } from "../Utils";
import { CommonToaster } from "../Common/CommonToaster";
import { getAttendanceAndBreakSummary } from "../APIservice.js/action";
import ReactApexChart from "react-apexcharts";
import CommonNodatafound from "../Common/CommonNodatafound";

const AddendanceDetail = ({ loading, uList, selectUser }) => {
  const employeeAttendanceList = useSelector(
    (state) => state.attendanceandbreaksummary
  );
  const attendanceTrendsData = useSelector((state) => state.attendancetrends);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userAttendanceData, setUserAttendanceData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [calendarDate, setCalendarDate] = useState(dayJs());
  const userAttendanceTableHeading = ["In", "Out", "Duration"];

  const attendanceTrendsXaxis = attendanceTrendsData.map((a) =>
    moment(a.attendanceDate).format("DD/MM/YYYY")
  );
  const attendanceTrendsSeries = [
    {
      name: "Present",
      data: attendanceTrendsData.map((item) => {
        return item?.presentCount || 0;
      }),
    },
    {
      name: "Absent",
      data: attendanceTrendsData.map((item) => {
        if (selectUser === true && item.presentCount >= 1) {
          return 0;
        } else {
          return item?.absentCount || 0;
        }
      }),
    },
    // {
    //   name: "Attendance Percentage",
    //   type: "line",
    //   data: attendanceTrendsData.map((item, index) => {
    //     // Add check for attendancePercentage
    //     if (
    //       item?.attendancePercentage !== undefined &&
    //       item.attendancePercentage !== null
    //     ) {
    //       const convertString = item.attendancePercentage.toString();
    //       const round = convertString.split(".")[0];
    //       console.log(`Attendance Percentage for index ${index}:`, round);
    //       return round;
    //     } else {
    //       console.warn(`Missing attendancePercentage at index ${index}`);
    //       return 0; // Fallback to 0 if undefined
    //     }
    //   }),
    // },
    // {
    //   name: "Average Working Time",
    //   type: "line",
    //   data: attendanceTrendsData.map((item, index) => {
    //     // Safeguard for averageWorkingTime
    //     if (item?.averageWorkingTime && item.averageWorkingTime !== "null") {
    //       const [hours, minutes] = item.averageWorkingTime
    //         .split(":")
    //         .map(Number);
    //       const totalMinutes = hours * 60 + minutes; // Convert to total minutes
    //       console.log(
    //         `Average Working Time (minutes) for index ${index}:`,
    //         totalMinutes
    //       );
    //       return totalMinutes;
    //     } else {
    //       console.warn(`Invalid averageWorkingTime at index ${index}`);
    //       return 0; // Fallback to 0 if undefined
    //     }
    //   }),
    // },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        labels: true,
        distributed: false,
        columnWidth: "40%", // Corrected column width to a percentage
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: attendanceTrendsXaxis,
      labels: {
        show: true,
        rotate: -40, // Rotate labels by -40 degrees
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of x-axis labels
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = attendanceTrendsData[dataPointIndex]; // Get the relevant data for the hovered point
        const category = w.globals.labels[dataPointIndex];
        const presentCount = data.presentCount || 0;
        let absentCount = 0;
        let attendancePercentage = 0;
        if (selectUser === true && data.presentCount >= 1) {
          absentCount = 0;
        } else {
          absentCount = data?.absentCount || 0;
        }
        // const absentCount = data.absentCount || 0;
        if (selectUser === true && data.presentCount >= 1) {
          attendancePercentage = 100;
        } else {
          attendancePercentage = data?.attendancePercentage || 0;
        }
        // const attendancePercentage = data.attendancePercentage || 0;
        const averageWorkingTime = data.averageWorkingTime || "00:00:00";

        return `
       <div class="apexcharts-tooltip-custom">
        <div style="display: flex; align-items: center;">
          <div style="width: 12px; height: 12px; background-color: #25a17d; border-radius: 50%; margin-right: 8px;"></div>
          <strong style="margin-right:4px">Present Count:</strong> ${presentCount}
        </div>
        <div style="display: flex; align-items: center; margin-top: 4px;">
          <div style="width: 12px; height: 12px; background-color: #ABB3B3; border-radius: 50%; margin-right: 8px;"></div>
          <strong style="margin-right:4px">Absent Count:</strong> ${absentCount}
        </div>
          <div style="display: flex; align-items: center; margin-top: 4px;">
          <div style="width: 12px; height: 12px; background-color: rgba(0,126,241,0.64); border-radius: 50%; margin-right: 8px;"></div>
          <strong style="margin-right:4px">Attendance Percentage:</strong>${attendancePercentage.toFixed(
            2
          )}%
        </div>
        <div style="display: flex; align-items: center; margin-top: 4px;">
          <div style="width: 12px; height: 12px; background-color: rgba(255,193,7,0.74); border-radius: 50%; margin-right: 8px;"></div>
          <strong style="margin-right:4px">Average Working Time:</strong>${moment(
            averageWorkingTime,
            "HH:mm:ss"
          ).format("H[h]:mm[m]")}
        </div>
        </div>
        `;
      },
    },
    legend: {
      show: true, // Fixed legend display logic
    },
    colors: ["#25a17d", "#ABB3B3"], // Added colors here instead of passing directly as a prop
  };

  const attendanceTrendsColors = ["#25a17d", "#ABB3B3"];

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: "150px",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={30} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: "150px",
    },
    {
      title: "Working time",
      dataIndex: "workingTime",
      key: "workingTime",
      width: "150px",
      render: (text, record) => {
        if (text === null) return "00h:00m";
        return <p>{moment(text, "HH:mm:ss").format("H[h]:mm[m]")}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "breakTime",
      key: "breakTime",
      width: "150px",
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00" || text === null) {
          return "00h:00m";
        }
        return <p>{moment(text, "HH:mm:ss").format("HH[h]:mm[m]")}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
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

  const getUserAttendanceData = async (userid, orgId, startdate, enddate) => {
    const payload = {
      ...(userid || userId, { userId: userid ? userid : userId }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAttendanceAndBreakSummary(payload);
      console.log("user attendance response", response);
      const details = response?.data;

      const addFullNameProperty = details.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });

      if (addFullNameProperty[0].startTime === "0001-01-01T00:00:00") {
        setUserAttendanceData([]);
      } else {
        setUserAttendanceData(addFullNameProperty);
      }
    } catch (error) {
      console.log("attendance error", error);
      CommonToaster(error.response?.data?.message, "error");
      setUserAttendanceData([]);
    }
  };

  const handleCalendarChange = (date) => {
    const dates = new Date(date.$d);
    setCalendarDate(dayJs(dates));
    const convertDate = moment(dates).format("YYYY-MM-DD");
    getUserAttendanceData(userId, organizationId, convertDate, convertDate);
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
    getUserAttendanceData(
      clickedUser.id,
      orgId,
      formattedCurrentDate,
      formattedCurrentDate
    );
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Attendance Trends</p>
            {attendanceTrendsData.length >= 1 ? (
              // <AttendanceTrendsChart
              //   // xasis={attendanceTrendsXaxis}
              //   series={attendanceTrendsSeries}
              //   // colors={attendanceTrendsColors}
              // />

              <ReactApexChart
                series={attendanceTrendsSeries}
                colors={attendanceTrendsColors}
                options={options}
                type="bar"
                height={350}
              />
            ) : (
              <CommonNodatafound />
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Employee List</p>
              <CommonTable
                columns={columns}
                dataSource={employeeAttendanceList}
                scroll={{ x: 1000 }}
                dataPerPage={10}
                bordered="false"
                checkBox="false"
              />
            </div>
          </div>

          {/* calendar drawer */}
          <Drawer
            title={userName}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            width="25%"
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
              <Divider className="attendancedetail_userattendanceDivider" />
              <div className="attendance_employeelistContainer">
                <Row>
                  {userAttendanceTableHeading.map((item) => (
                    <Col
                      span={8}
                      className="attendancedetail_userattendancetableColumnContainer"
                    >
                      <p className="attendancedetail_userattendancetableheading">
                        {item}
                      </p>
                    </Col>
                  ))}
                </Row>

                <Divider
                  style={{
                    margin: 0,
                    background: "#abb3b36e",
                    marginBottom: "12px",
                  }}
                />
                {userAttendanceData.length >= 1 ? (
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {userAttendanceData.map((item) => (
                      <Col span={8}>
                        <p className="attendancedetail_userattendancetableColumnContainer">
                          {item.startTime === "0001-01-01T00:00:00"
                            ? ""
                            : moment(item.startTime).format("hh:mm A")}
                        </p>
                      </Col>
                    ))}
                    {userAttendanceData.map((item) => (
                      <Col span={8}>
                        <p className="attendancedetail_userattendancetableColumnContainer">
                          {item.endTime === "0001-01-01T00:00:00"
                            ? ""
                            : moment(item.endTime).format("hh:mm A")}
                        </p>
                      </Col>
                    ))}
                    {userAttendanceData.map((item) => (
                      <Col span={8}>
                        <p className="attendancedetail_userattendancetableColumnContainer">
                          {item.workingTime === null
                            ? ""
                            : moment(item.workingTime, "HH:mm:ss").format(
                                "H[h]:mm[m]"
                              )}
                        </p>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <CommonNodatafound />
                )}
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default AddendanceDetail;
