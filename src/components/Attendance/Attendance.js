import React, { useState, useEffect } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { TbCirclesFilled } from "react-icons/tb";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import Summary from "./Summary";
import AttendanceDetail from "./AddendanceDetail";
import DateWiseAttendance from "./DateWiseAttendance";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { CommonToaster } from "../Common/CommonToaster";
import Loader from "../Common/Loader";
import {
  getAttendanceAndBreakSummary,
  getAttendanceTrends,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { useDispatch } from "react-redux";
import {
  storeAttendanceAndBreakSummary,
  storeAttendanceTrends,
  storeDatewiseAttendance,
  storeDatewiseAttendanceAbsentData,
  storeDatewiseAttendanceDateValue,
  storeDatewiseAttendanceTeamValue,
  storeDatewiseAttendanceUsersData,
  storeDatewiseAttendanceUserValue,
} from "../Redux/slice";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";

const Attendance = () => {
  const dispatch = useDispatch();
  // usestates
  const [selectedDates, setSelectedDates] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendancedetailLoading, setAttendancedetailLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    // if (pageNumber === 2) {
    //   return;
    // }
    setActivePage(pageNumber);
  };

  useEffect(() => {
    // setLoading(true);
    setActivePage(1);
    getTeamData();
  }, []);

  useEffect(() => {
    getAttendanceDashboardData(null, null, organizationId);
  }, [activePage]);

  const getTeamData = async () => {
    //empty the datewise attendance tab redux values
    const emptyData = [];
    dispatch(storeDatewiseAttendanceTeamValue(null));
    dispatch(storeDatewiseAttendanceUserValue(null));
    dispatch(storeDatewiseAttendanceDateValue(null));
    dispatch(storeDatewiseAttendance(emptyData));
    dispatch(storeDatewiseAttendanceAbsentData(emptyData));
    dispatch(storeDatewiseAttendanceUsersData(emptyData));

    const CurrentandPreviousDate = getCurrentandPreviousweekDate();
    console.log("current and previous date", CurrentandPreviousDate);
    setSelectedDates(CurrentandPreviousDate);

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
      const usersList = response?.data;

      //merge user fullname and lastname in full_name property
      const updateUserList = usersList.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });
      setUserList(updateUserList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
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

  const getCurrentandPreviousweekDate = () => {
    const currentDate = new Date();

    // Calculate previous week date (subtract 7 days)
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    // Format dates
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    let dates = [];
    dates.push(formattedPreviousWeekDate, formattedCurrentDate);
    return dates;
  };

  const getAttendanceDashboardData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    const CurrentandPreviousDate = getCurrentandPreviousweekDate();
    console.log("current and previous date", CurrentandPreviousDate);

    if (activePage === 2) {
      setAttendancedetailLoading(true);
      const payload = {
        ...(userid || userId, { userId: userid ? userid : userId }),
        ...(teamid || teamId, { teamId: teamid ? teamid : teamId }),
        organizationId: orgId,
        startDate:
          startdate === undefined || startdate === null
            ? CurrentandPreviousDate[0]
            : startdate,
        endDate:
          enddate === undefined || enddate === null
            ? CurrentandPreviousDate[1]
            : enddate,
      };
      try {
        const response = await getAttendanceAndBreakSummary(payload);
        console.log("attendance response", response);
        const details = response?.data;

        const addFullNameProperty = details.map((item) => {
          return { ...item, full_Name: item.first_Name + " " + item.last_Name };
        });
        const reverseData = addFullNameProperty.reverse();
        dispatch(storeAttendanceAndBreakSummary(reverseData));
      } catch (error) {
        console.log("attendance error", error);
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeAttendanceAndBreakSummary(details));
      } finally {
        setTimeout(() => {
          getAttendanceTrendsData(
            userid,
            teamid,
            orgId,
            startdate ? startdate : CurrentandPreviousDate[0],
            enddate ? enddate : CurrentandPreviousDate[1]
          );
        }, 350);
      }
    }
  };

  const getAttendanceTrendsData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    if (activePage === 2) {
      setAttendancedetailLoading(true);
      const payload = {
        ...(userid || userId, { userId: userid ? userid : userId }),
        ...(teamid || teamId, { teamId: teamid ? teamid : teamId }),
        organizationId: orgId,
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getAttendanceTrends(payload);
        console.log("attendance trends", response);
        const details = response?.data;

        const addFullNameProperty = details.map((item) => {
          return { ...item, full_Name: item.first_Name + " " + item.last_Name };
        });
        const reverseData = addFullNameProperty.reverse();

        const removeNullDate = reverseData.filter(
          (f) => f.attendanceDate != "0001-01-01T00:00:00"
        );
        dispatch(storeAttendanceTrends(removeNullDate));
      } catch (error) {
        console.log("attendance error", error);
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeAttendanceTrends(details));
      } finally {
        setTimeout(() => {
          setAttendancedetailLoading(false);
        }, 350);
      }
    }
  };

  //onchange functions
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
      const updatedArr = teamMembersList.map(
        ({ firstName, lastName, userId, ...rest }) => ({
          first_Name: firstName,
          last_Name: lastName,
          id: userId,
          ...rest,
        })
      );

      //merge user fullname and lastname in full_name property
      const adddFullName = updatedArr.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });

      setUserList(adddFullName);
      const userIdd = null;
      setUserId(userIdd);
      getAttendanceDashboardData(
        userIdd,
        value,
        organizationId,
        selectedDates[0],
        selectedDates[1]
      );
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      getAttendanceDashboardData(
        userId,
        teamId,
        organizationId,
        startDate,
        endDate
      );
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getAttendanceDashboardData(
      value,
      teamId,
      organizationId,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const handleRefresh = () => {
    const CurrentandPreviousDate = getCurrentandPreviousweekDate();

    console.log(CurrentandPreviousDate[0], selectedDates[0]);
    const today = new Date();
    const givenDate = new Date(selectedDates[1]);
    let isCurrentDate = false;
    let isPreviousChange = false;

    if (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    ) {
      isCurrentDate = true;
    } else {
      isCurrentDate = false;
    }

    if (CurrentandPreviousDate[0] === selectedDates[0]) {
      isPreviousChange = false;
    } else {
      isPreviousChange = true;
    }

    if (
      teamId === null &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }

    setUserId(null);
    setTeamId(null);
    setSelectedDates(CurrentandPreviousDate);
    getAttendanceDashboardData(
      null,
      null,
      organizationId,
      CurrentandPreviousDate[0],
      CurrentandPreviousDate[1]
    );
  };
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

      {activePage === 1 || activePage === 2 ? (
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              className="field_selectfielsContainer"
              style={{ display: "flex" }}
            >
              <div className="field_teamselectfieldContainer">
                <CommonSelectField
                  options={teamList}
                  placeholder="All Teams"
                  onChange={handleTeam}
                  value={teamId}
                />
              </div>
              <div style={{ width: "170px" }}>
                <CommonSelectField
                  options={userList}
                  placeholder="Select User"
                  onChange={handleUser}
                  value={userId}
                />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="wellness_calendarContainer">
              <div>
                <CommonDoubleDatePicker
                  value={selectedDates}
                  onChange={handleDateChange}
                />
              </div>
              <Tooltip placement="top" title="Download">
                <Button className="dashboard_download_button">
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
            </div>
          </Col>
        </Row>
      ) : (
        ""
      )}

      {loading ? (
        <Loader />
      ) : (
        <div>
          {activePage === 1 && (
            <div>
              <Summary />
              {/* Add your content for page 1 here */}
            </div>
          )}
          {activePage === 2 && (
            <div>
              <AttendanceDetail
                tList={teamList}
                uList={userList}
                loading={attendancedetailLoading}
              />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <DateWiseAttendance tList={teamList} uList={userList} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
