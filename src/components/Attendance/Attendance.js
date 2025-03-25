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
import { useDispatch, useSelector } from "react-redux";
import {
  storeAttendanceAndBreakSummary,
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
  storeAttendanceLateTendency,
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
  const [attendancePercentage, setAttendancePercentage] = useState();
  const [latePercentage, setLatePercentage] = useState();
  const [totalBreakDuration, setTotalBreakDuration] = useState("");
  const [totalWorkingtime, setTotalWorkingtime] = useState();
  const [attendancedetailLoading, setAttendancedetailLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);

  //loader usestates
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [todayAttendanceLoader, setTodayAttendanceLoader] = useState(true);
  const [breakdownLoader, setBreakdownLoader] = useState(true);
  const [breakTrendLoader, setBreakTrendLoader] = useState(true);
  const [lateArrivalLoader, setLateArrivalLoader] = useState(true);

  const [trendsLoader, setTrendsLoader] = useState(false);
  const [employeeListLoader, setEmployeeListLoader] = useState(false);
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
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (managerTeamId) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    getTeamData();
  }, []);

  // useEffect(() => {
  //   const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
  //   getAttendanceDashboardData(null, null, orgId);
  // }, []);

  const getTeamData = async () => {
    //empty the datewise attendance tab redux values
    const emptyData = [];
    dispatch(storeDatewiseAttendanceTeamValue(null));
    dispatch(storeDatewiseAttendanceUserValue(null));
    dispatch(storeDatewiseAttendanceDateValue(null));
    dispatch(storeDatewiseAttendancePresentData(emptyData));
    dispatch(storeDatewiseAttendanceAbsentData(emptyData));
    dispatch(storeDatewiseAttendanceUsersData(emptyData));

    const managerTeamId = localStorage.getItem("managerTeamId");

    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);

    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      console.log("teams error", error);
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 300);
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
        getAttendanceDashboardData(null, null, orgId, null, null, activePage);
      }, 350);
    }
  };

  //get team members by team id api function
  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      const teamMembersList = [];
      setNonChangeUserList(teamMembersList);
    } finally {
      setTimeout(() => {
        getAttendanceDashboardData(
          null,
          managerTeamId,
          orgId,
          null,
          null,
          activePage
        );
      }, 350);
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
      setTodayAttendanceLoader(true);
      setBreakdownLoader(true);
      setBreakTrendLoader(true);
      setLateArrivalLoader(true);
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

        //top cards handling
        setAttendancePercentage(
          details.overallAttendancePercentage !== undefined
            ? parseInt(details.overallAttendancePercentage)
            : "-"
        );
        if (details.overallTotalTime) {
          const [hours, minutes, seonds] = details.overallTotalTime.split(":");
          setTotalWorkingtime(`${hours}h:${minutes}m:${seonds}s`);
        } else {
          setTotalWorkingtime("-");
        }

        //activity level chart handling
        if (details.attendanceSummaries) {
          dispatch(storeAttendanceActivityLevel(details.attendanceSummaries));
        } else {
          dispatch(storeAttendanceActivityLevel([]));
        }
      } catch (error) {
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeAttendanceActivityLevel(details));
      } finally {
        setTimeout(() => {
          setBreakdownLoader(false);
          getTodayAttendanceData(
            teamid,
            orgId,
            startdate === undefined || startdate === null
              ? PreviousandCurrentDate[0]
              : startdate,
            enddate === undefined || enddate === null
              ? PreviousandCurrentDate[1]
              : enddate
          );
        }, 300);
      }
    }
    if (pageNumber === 2) {
      setAttendancedetailLoading(true);
      setTrendsLoader(true);
      setEmployeeListLoader(true);
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
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getAttendanceTrends(payload);
        console.log("attendance trends", response);
        const details = response?.data?.attendanceSummaries;
        if (details) {
          dispatch(storeAttendanceTrends(details));
        } else {
          dispatch(storeAttendanceTrends([]));
        }
      } catch (error) {
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeAttendanceTrends(details));
      } finally {
        setTimeout(() => {
          setTrendsLoader(false);
          getEmployeeListData(
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

  const getTodayAttendanceData = async (teamid, orgId, startdate, enddate) => {
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
        setTodayAttendanceLoader(false);
        getAttendanceBreakTrendaData(teamid, orgId, startdate, enddate);
      }, 300);
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
      if (response?.data?.totalBreakDuration !== undefined) {
        const [hours, minutes, seconds] =
          response?.data?.totalBreakDuration.split(":");
        setTotalBreakDuration(hours + "h:" + minutes + "m:" + seconds + "s");
      } else {
        setTotalBreakDuration("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = [];
      dispatch(storeAttendanceBreakTrends(details));
    } finally {
      setTimeout(() => {
        setBreakTrendLoader(false);
        getLateArrivalsData(teamid, orgId, startdate, enddate);
      }, 350);
    }
  };

  const getLateArrivalsData = async (teamid, orgId, startdate, enddate) => {
    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getLateArrivals(payload);
      console.log("latearrivals response", response);
      const details = response?.data?.data;
      dispatch(storeAttendanceLateTendency(details));
      setLatePercentage(response?.data?.overallLatePercentage);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      dispatch(storeAttendanceLateTendency([]));
      setLatePercentage(null);
    } finally {
      setTimeout(() => {
        setLateArrivalLoader(false);
        setLoading(false);
        setSummaryLoading(false);
      }, 350);
    }
  };

  const getEmployeeListData = async (
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
      fromDate: startdate,
      toDate: enddate,
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
        setEmployeeListLoader(false);
      }, 300);
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
      setTodayAttendanceLoader(true);
      setBreakdownLoader(true);
      setBreakTrendLoader(true);
      setLateArrivalLoader(true);
      getAttendanceDashboardData(
        userIdd,
        value,
        organizationId,
        selectedDates[0],
        selectedDates[1],
        activePage
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
    const managerTeamId = localStorage.getItem("managerTeamId");

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

    if (
      managerTeamId &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }

    if (activePage === 1) {
      setSummaryLoading(true);
      setTodayAttendanceLoader(true);
      setBreakdownLoader(true);
      setBreakTrendLoader(true);
      setLateArrivalLoader(true);
    } else {
      setTrendsLoader(true);
      setEmployeeListLoader(true);
    }
    setAttendancedetailLoading(true);
    setUserList(nonChangeUserList);
    setSelectUser(false);
    setUserId(null);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setSelectedDates(PreviousandCurrentDate);
    setTimeout(() => {
      getAttendanceDashboardData(
        null,
        managerTeamId ? managerTeamId : null,
        organizationId,
        PreviousandCurrentDate[0],
        PreviousandCurrentDate[1],
        activePage
      );
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
                  disabled={isManager}
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

      {/* <>
        {loading ? (
          <Loader />
        ) : ( */}
      <div>
        {activePage === 1 && (
          <div>
            <AttendanceSummary
              attendancePercentage={attendancePercentage}
              latePercentage={latePercentage}
              totalWorkingtime={totalWorkingtime}
              totalBreakDuration={totalBreakDuration}
              loading={summaryLoading}
              todayAttendanceLoader={todayAttendanceLoader}
              breakdownLoader={breakdownLoader}
              breakTrendLoader={breakTrendLoader}
              lateArrivalLoader={lateArrivalLoader}
            />
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
              trendsLoader={trendsLoader}
              employeeListLoader={employeeListLoader}
            />
          </div>
        )}
        {activePage === 3 && (
          <div>
            <DateWiseAttendance tList={teamList} uList={nonChangeUserList} />
          </div>
        )}
      </div>
      {/* )}
      </> */}
    </div>
  );
};

export default Attendance;
