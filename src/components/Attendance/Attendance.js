import React, { useState, useEffect } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { TbCirclesFilled } from "react-icons/tb";
import { RedoOutlined } from "@ant-design/icons";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceDetailed from "./AttendanceDetailed";
import DateWiseAttendance from "./DateWiseAttendance";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { CommonToaster } from "../Common/CommonToaster";
import Loader from "../Common/Loader";
import {
  getActivityEmployeeslist,
  getAttendanceBreakTrends,
  getAttendanceSummary,
  getAttendanceTrends,
  getLateArrivals,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { useDispatch } from "react-redux";
import {
  storeAttendanceSummary,
  storeAttendanceAndBreakSummary,
  storeLateArrival,
  storeAttendanceTrends,
  storeDatewiseAttendancePresentData,
  storeDatewiseAttendanceAbsentData,
  storeDatewiseAttendanceDateValue,
  storeDatewiseAttendanceTeamValue,
  storeDatewiseAttendanceUsersData,
  storeDatewiseAttendanceUserValue,
  storeTodayAttendance,
  storeAttendanceBreakTrends,
  storeAttendanceActivityLevel,
} from "../Redux/slice";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import moment from "moment";

const Attendance = () => {
  const dispatch = useDispatch();
  // usestates
  const [selectedDates, setSelectedDates] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [selectUser, setSelectUser] = useState(false);
  const [attendancedetailLoading, setAttendancedetailLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2) ||
      (pageNumber === 3 && activePage === 3)
    ) {
      return;
    }
    console.log("selected dates", pageNumber, selectedDates);
    setActivePage(pageNumber);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    getAttendanceDashboardData(
      userId,
      teamId,
      orgId,
      selectedDates[0],
      selectedDates[1],
      pageNumber
    );
  };

  useEffect(() => {
    setActivePage(1);
    getTeamData();
  }, []);

  useEffect(() => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    getAttendanceDashboardData(null, null, orgId);
  }, []);

  const getTeamData = async () => {
    //empty the datewise attendance tab redux values
    const emptyData = [];
    dispatch(storeDatewiseAttendanceTeamValue(null));
    dispatch(storeDatewiseAttendanceUserValue(null));
    dispatch(storeDatewiseAttendanceDateValue(null));
    dispatch(storeDatewiseAttendancePresentData(emptyData));
    dispatch(storeDatewiseAttendanceAbsentData(emptyData));
    dispatch(storeDatewiseAttendanceUsersData(emptyData));

    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);

    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      console.log("teams error", error);
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

      setUserList(usersList);
      setNonChangeUserList(usersList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getTodayAttendanceData();
      }, 350);
    }
  };

  const getTodayAttendanceData = async (teamid) => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const currentDate = new Date();
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      startDate: moment(currentDate).format("YYYY-MM-DD"),
      endDate: moment(currentDate).format("YYYY-MM-DD"),
    };

    try {
      const response = await getAttendanceSummary(payload);
      console.log("today attendance response", response);
      const details = response?.data;

      dispatch(storeTodayAttendance(details));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = null;
      dispatch(storeTodayAttendance(details));
    } finally {
      setTimeout(() => {
        if (teamid) {
          return;
        }
        getAttendanceDashboardData(null, null, orgId, null, null, activePage);
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
    enddate,
    pageNumber
  ) => {
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    console.log("current and previous date", PreviousandCurrentDate);

    if (pageNumber === 1) {
      setSummaryLoading(true);
      const payload = {
        ...(userid && { userId: userid }),
        ...(teamid && { teamId: teamid }),
        organizationId: orgId,
        startDate:
          startdate === undefined || startdate === null
            ? PreviousandCurrentDate[0]
            : startdate,
        endDate:
          enddate === undefined || enddate === null
            ? PreviousandCurrentDate[1]
            : enddate,
      };

      try {
        const response = await getAttendanceSummary(payload);
        console.log("attendance summary response", response);
        const details = response?.data;

        dispatch(storeAttendanceSummary(details));
      } catch (error) {
        CommonToaster(error.response?.data?.message, "error");
        const details = null;
        dispatch(storeAttendanceSummary(details));
      } finally {
        setTimeout(() => {
          getSummaryAttendanceTrendsData(
            teamid,
            orgId,
            startdate ? startdate : PreviousandCurrentDate[0],
            enddate ? enddate : PreviousandCurrentDate[1]
          );
        }, 350);
      }
    }
    if (pageNumber === 2) {
      setAttendancedetailLoading(true);
      // dispatch(storeAttendanceTrends([]));
      if (userid) {
        setSelectUser(true);
      } else {
        setSelectUser(false);
      }
      const payload = {
        ...(userid && { userId: userid }),
        ...(teamid && { teamId: teamid }),
        organizationId: orgId,
        fromDate:
          startdate === undefined || startdate === null
            ? PreviousandCurrentDate[0]
            : startdate,
        toDate:
          enddate === undefined || enddate === null
            ? PreviousandCurrentDate[1]
            : enddate,
      };
      try {
        const response = await getActivityEmployeeslist(payload);
        const activityEmployeedata = response?.data?.data;
        console.log("activity employee response", activityEmployeedata);
        dispatch(storeAttendanceAndBreakSummary(activityEmployeedata));
      } catch (error) {
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeAttendanceAndBreakSummary(details));
      } finally {
        setTimeout(() => {
          getAttendanceTrendsData(
            userid,
            teamid,
            orgId,
            startdate ? startdate : PreviousandCurrentDate[0],
            enddate ? enddate : PreviousandCurrentDate[1]
          );
        }, 350);
      }
    }
  };

  const getSummaryAttendanceTrendsData = async (
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAttendanceTrends(payload);
      console.log("attendance activitylevel", response);
      const details = response?.data;
      dispatch(storeAttendanceActivityLevel(details));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = [];
      dispatch(storeAttendanceActivityLevel(details));
    } finally {
      setTimeout(() => {
        getLateArrivalData(teamid, orgId, startdate, enddate);
      }, 350);
    }
  };

  const getLateArrivalData = async (teamid, orgId, startdate, enddate) => {
    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getLateArrivals(payload);
      console.log("latearrival response", response);
      const details = response?.data;
      details.reverse();
      dispatch(storeLateArrival(details));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = [];
      dispatch(storeLateArrival(details));
    } finally {
      setTimeout(() => {
        getAttendanceBreakTrendaData(teamid, orgId, startdate, enddate);
      }, 350);
    }
  };

  const getAttendanceBreakTrendaData = async (
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAttendanceBreakTrends(payload);
      console.log("attendance breaktrends response", response);
      const details = response?.data?.data;
      dispatch(storeAttendanceBreakTrends(details));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = [];
      dispatch(storeAttendanceBreakTrends(details));
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSummaryLoading(false);
      }, 350);
    }
  };

  const getAttendanceTrendsData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAttendanceTrends(payload);
      console.log("attendance trends", response);
      const details = response?.data;
      dispatch(storeAttendanceTrends(details));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = [];
      dispatch(storeAttendanceTrends(details));
    } finally {
      setTimeout(() => {
        setAttendancedetailLoading(false);
      }, 350);
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
      }

      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
      getAttendanceDashboardData(
        userIdd,
        value,
        organizationId,
        selectedDates[0],
        selectedDates[1],
        activePage,
        "trigger"
      );
      setTimeout(() => {
        getTodayAttendanceData(value);
      }, 300);
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
        endDate,
        activePage
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
      selectedDates[1],
      activePage
    );
  };

  const handleRefresh = () => {
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();

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

    if (PreviousandCurrentDate[0] === selectedDates[0]) {
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
    setAttendancedetailLoading(true);
    setUserList(nonChangeUserList);
    setSelectUser(false);
    setUserId(null);
    setTeamId(null);
    setSelectedDates(PreviousandCurrentDate);
    setTimeout(() => {
      getTodayAttendanceData(null);
    }, 300);
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
              {activePage === 2 ? (
                <div style={{ width: "170px" }}>
                  <CommonSelectField
                    options={userList}
                    placeholder="Select User"
                    onChange={handleUser}
                    value={userId}
                  />
                </div>
              ) : (
                ""
              )}
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
              <Tooltip placement="top" title="Refresh">
                <Button
                  className="dashboard_refresh_button"
                  onClick={handleRefresh}
                  style={{ marginLeft: "12px" }}
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

      <>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {activePage === 1 && (
              <div>
                <AttendanceSummary loading={summaryLoading} />
                {/* Add your content for page 1 here */}
              </div>
            )}
            {activePage === 2 && (
              <div>
                <AttendanceDetailed
                  tList={teamList}
                  uList={userList}
                  selectUser={selectUser}
                  loading={attendancedetailLoading}
                />
              </div>
            )}
            {activePage === 3 && (
              <div>
                <DateWiseAttendance
                  tList={teamList}
                  uList={nonChangeUserList}
                />
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Attendance;
