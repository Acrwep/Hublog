import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, DatePicker } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { GiLotus } from "react-icons/gi";
import "../styles.css";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonDatePicker from "../../Common/CommonDatePicker";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  getTeams,
  getUsers,
  getUsersByTeamId,
  getWellnessEmployeeDetails,
  getWellnessSummary,
  getWellnessWorktimeTrends,
} from "../../APIservice.js/action";
import { dayJs } from "../../Utils";
import WellnessSummary from "./WellnessSummary";
import WellnessDetailed from "./WellnessDetailed";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  storeOverallWellness,
  storeTeamwiseWellness,
  storeTopHealthyTeams,
  storeTopOverburdenedTeams,
  storeTopUnderutilizedTeams,
  storeWellnessEmployeesList,
  storeWellnessWorktimeTrends,
} from "../../Redux/slice";
import CommonDoubleDatePicker from "../../Common/CommonDoubleDatePicker";
import { getCurrentandPreviousweekDate } from "../../Common/Validation";

const Wellness = () => {
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [month, setMonth] = useState(dayJs().subtract(0, "month"));
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState();
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [healthyPercentage, setHealthyPercentage] = useState(null);
  const [previousHealthyPercentage, setPreviousHealthyPercentage] = useState();
  const [healthyComparison, setHealthyComparison] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [workingTimeComparison, setWorkingTimeComparison] = useState("");
  const [previousWorkingtimePercentage, setPreviousWorkingtimePercentage] =
    useState();
  const [healthyEmployeeName, setHealthyEmployeeName] = useState("");
  const [healthyEmployeeWorkingtime, setHealthyEmployeeWorkingtime] =
    useState("");
  const [overburdenedEmployeeName, setOverburdenedEmployeeName] = useState("");
  const [overburdenedEmployeeWorkingtime, setOverburdenedEmployeeWorkingtime] =
    useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [detailedLoading, setDetailedLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState(null);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    } else {
      getWellnessSummaryData(
        organizationId,
        null,
        null,
        date,
        selectedDates[0],
        selectedDates[1],
        pageNumber
      );
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
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
    const orgId = localStorage.getItem("organizationId");
    const currentDate = new Date();
    setDate(currentDate);
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setUserList(users);
      setNonChangeUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      const currentMonthName = moment().format("MMMM"); // get current month name
      const currentYear = moment().year(); // get current year
      setMonthName(currentMonthName);
      setYear(currentYear);
      setTimeout(() => {
        getWellnessSummaryData(
          orgId,
          null,
          null,
          currentDate,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1],
          activePage
        );
      }, 300);
    }
  };

  const getWellnessSummaryData = async (
    orgId,
    teamid,
    userid,
    date,
    startdate,
    enddate,
    pageNumber
  ) => {
    if (pageNumber === 1) {
      setSummaryLoading(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        Date: moment(date).format("YYYY-MM-DD"),
      };
      try {
        const response = await getWellnessSummary(payload);
        console.log("wellness summary response", response);
        //healthy percentage handling
        setHealthyPercentage(
          response?.data?.healthyemployees?.healthyemployeesPercentage !==
            undefined
            ? response.data.healthyemployees.healthyemployeesPercentage
            : "-"
        );

        setHealthyComparison(
          response?.data?.healthyemployees?.comparison !== undefined
            ? response.data.healthyemployees.comparison
            : "-"
        );

        setPreviousHealthyPercentage(
          response?.data?.healthyemployees
            ?.previousHealthyemployeesPercentage !== undefined
            ? parseInt(
                response.data.healthyemployees
                  .previousHealthyemployeesPercentage
              )
            : "-"
        );
        //workingtime handling
        if (response?.data?.workingtime?.totalWorkingtime !== undefined) {
          const [hours, minutes, seconds] =
            response?.data?.workingtime?.totalWorkingtime.split(":");
          setWorkingTime(hours + "h:" + minutes + "m:" + seconds + "s");
        } else {
          setWorkingTime("-");
        }

        setWorkingTimeComparison(
          response?.data?.workingtime?.comparison !== undefined
            ? response.data.workingtime.comparison
            : "-"
        );

        setPreviousWorkingtimePercentage(
          response?.data?.workingtime?.totalWorkingtimePercentage !== undefined
            ? parseInt(response.data.workingtime.totalWorkingtimePercentage)
            : "-"
        );
        //healthy employee handling
        setHealthyEmployeeName(
          response?.data?.topHealthyemployee?.fullName !== undefined
            ? response.data.topHealthyemployee?.fullName
            : "-"
        );
        if (response?.data?.topHealthyemployee?.activeTimeSec !== undefined) {
          const [hours, minutes, seconds] =
            response?.data?.topHealthyemployee?.activeTimeSec.split(":");
          setHealthyEmployeeWorkingtime(
            hours + "h:" + minutes + "m:" + seconds + "s"
          );
        } else {
          setHealthyEmployeeWorkingtime("-");
        }
        //overburdened employee handling
        setOverburdenedEmployeeName(
          response?.data?.topOverburdenedemployee?.fullName !== undefined
            ? response.data.topOverburdenedemployee?.fullName
            : "-"
        );
        if (
          response?.data?.topOverburdenedemployee?.activeTimeSec !== undefined
        ) {
          const [hours, minutes, seconds] =
            response?.data?.topOverburdenedemployee?.activeTimeSec.split(":");
          setOverburdenedEmployeeWorkingtime(
            hours + "h:" + minutes + "m:" + seconds + "s"
          );
        } else {
          setOverburdenedEmployeeWorkingtime("-");
        }

        //teamwise wellness handling
        if (response?.data?.wellnessSummaries) {
          dispatch(storeTeamwiseWellness(response?.data?.wellnessSummaries));
        } else {
          dispatch(storeTeamwiseWellness([]));
        }

        //overall wellness handling
        if (response?.data?.overallWellnessCount) {
          const overallWellness = response?.data?.overallWellnessCount;
          dispatch(
            storeOverallWellness([
              overallWellness.healthyCount,
              overallWellness.overburdenedCount,
              overallWellness.underutilizedCount,
            ])
          );
        } else {
          dispatch(storeOverallWellness([]));
        }

        //top healthy teams handling
        if (response?.data?.top3WellnessHealthy) {
          const topList = response?.data?.top3WellnessHealthy;
          const allZero = topList.every((item) => item.healthy === 0);

          if (allZero) {
            dispatch(storeTopHealthyTeams([]));
          } else {
            dispatch(storeTopHealthyTeams(topList));
          }
        } else {
          dispatch(storeTopHealthyTeams([]));
        }

        //top overburdened teams handling
        if (response?.data?.top3WellnessOverburdened) {
          const topList = response?.data?.top3WellnessOverburdened;

          const allZero = topList.every((item) => item.overburdened === 0);

          if (allZero) {
            dispatch(storeTopOverburdenedTeams([]));
          } else {
            dispatch(storeTopOverburdenedTeams(topList));
          }
        } else {
          dispatch(storeTopOverburdenedTeams([]));
        }

        //top underutilized teams handling
        if (response?.data?.top3WellnessUnderutilized) {
          const topList = response?.data?.top3WellnessUnderutilized;

          const allZero = topList.every((item) => item.underutilized === 0);

          if (allZero) {
            dispatch(storeTopUnderutilizedTeams([]));
          } else {
            dispatch(storeTopUnderutilizedTeams(topList));
          }
        } else {
          dispatch(storeTopUnderutilizedTeams([]));
        }
      } catch (error) {
        console.log("errr", error);
        CommonToaster(error?.response?.data, "error");
        setHealthyPercentage("-");
        setPreviousHealthyPercentage("-");
        setHealthyComparison("-");
        setWorkingTime("-");
        setWorkingTimeComparison("-");
        setPreviousWorkingtimePercentage("-");
        setHealthyEmployeeName("-");
        setHealthyEmployeeWorkingtime("-");
        setOverburdenedEmployeeName("-");
        setOverburdenedEmployeeWorkingtime("-");
        dispatch(storeTeamwiseWellness([]));
        dispatch(storeOverallWellness([]));
        dispatch(storeTopHealthyTeams([]));
        dispatch(storeTopOverburdenedTeams([]));
        dispatch(storeTopUnderutilizedTeams([]));
      } finally {
        setTimeout(() => {
          setSummaryLoading(false);
          // getTopAppUsageData(orgId, teamid, startDate, endDate);
        }, 100);
      }
    } else {
      setDetailedLoading(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        ...(userid && { userId: userid }),
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getWellnessWorktimeTrends(payload);
        console.log("wellness detailed response", response);
        const wellnessTrendData = response?.data?.datewiseWellnessCount;
        dispatch(storeWellnessWorktimeTrends(wellnessTrendData));
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeWellnessWorktimeTrends([]));
      } finally {
        setTimeout(() => {
          getWellnessEmployeesData(orgId, teamid, userid, startdate, enddate);
        }, 150);
      }
    }
  };

  const getWellnessEmployeesData = async (
    orgId,
    teamid,
    userid,
    startdate,
    enddate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getWellnessEmployeeDetails(payload);
      console.log("wellness employees response", response);
      const wellnessEmployeesData = response?.data?.employees;
      dispatch(storeWellnessEmployeesList(wellnessEmployeesData));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeWellnessEmployeesList([]));
    } finally {
      setTimeout(() => {
        setDetailedLoading(false);
      }, 150);
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
      setUserId(null);
    } catch (error) {
      setUserList([]);
      CommonToaster(error.response.data.message, "error");
    } finally {
      getWellnessSummaryData(
        organizationId,
        value,
        userId,
        date,
        selectedDates[0],
        selectedDates[1],
        activePage
      );
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getWellnessSummaryData(
      organizationId,
      teamId,
      value,
      date,
      selectedDates[0],
      selectedDates[1],
      activePage
    );
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
    getWellnessSummaryData(
      organizationId,
      teamId,
      userId,
      date,
      selectedDates[0],
      selectedDates[1],
      activePage
    );
  };

  const handleDoubleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      console.log("call function");
      getWellnessSummaryData(
        organizationId,
        teamId,
        userId,
        date,
        dateStrings[0],
        dateStrings[1],
        activePage
      );
    }
  };

  const handleRefresh = () => {
    const today = new Date();
    const givenDate = new Date(date);
    const currentMonthName = moment().format("MMMM");
    const currentYear = moment().year();
    let isDateChange = false;
    let isMonthChange = false;

    if (
      today.getFullYear() === givenDate.getFullYear() &&
      today.getMonth() === givenDate.getMonth() &&
      today.getDate() === givenDate.getDate()
    ) {
      isDateChange = false;
    } else {
      isDateChange = true;
    }
    if (currentMonthName === monthName && currentYear === year) {
      isMonthChange = false;
    } else {
      isMonthChange = true;
    }

    if (
      isDateChange === false &&
      isMonthChange === false &&
      teamId === null &&
      userId === null
    ) {
      return;
    } else {
      setTeamId(null);
      setUserId(null);
      const currentDate = new Date();
      setDate(currentDate);
      setMonth(dayJs());
      setMonthName(currentMonthName);
      setYear(currentYear);
      setUserList(nonChangeUserList);
      const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
      setSelectedDates(PreviousAndCurrentDate);
      getWellnessSummaryData(
        organizationId,
        null,
        null,
        currentDate,
        PreviousAndCurrentDate[0],
        PreviousAndCurrentDate[1],
        activePage
      );
    }
  };
  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <GiLotus size={20} />
            </div>
            <h2 className="allpage_mainheadings">Wellness</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="productivity_tabbuttonContainer">
            <Button
              className={
                activePage === 1
                  ? "productivity_activesummarybutton"
                  : "productivity_summarybutton"
              }
              onClick={() => handlePageChange(1)}
            >
              Summary
            </Button>
            <Button
              className={
                activePage === 2
                  ? "productivity_activedetailedbutton "
                  : "productivity_detailedbutton"
              }
              onClick={() => handlePageChange(2)}
            >
              Detailed
            </Button>
          </div>
        </Col>
      </Row>

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
              {activePage === 1 ? (
                <CommonDatePicker onChange={onDateChange} value={date} />
              ) : (
                <CommonDoubleDatePicker
                  value={selectedDates}
                  onChange={handleDoubleDateChange}
                />
              )}
            </div>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
                onClick={handleRefresh}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      {activePage === 1 ? (
        <div>
          <WellnessSummary
            healthyPercentage={healthyPercentage}
            healthyComparison={healthyComparison}
            previousHealthyPercentage={previousHealthyPercentage}
            workingTime={workingTime}
            workingTimeComparison={workingTimeComparison}
            previousWorkingtimePercentage={previousWorkingtimePercentage}
            healthyEmployeeName={healthyEmployeeName}
            healthyEmployeeWorkingtime={healthyEmployeeWorkingtime}
            overburdenedEmployeeName={overburdenedEmployeeName}
            overburdenedEmployeeWorkingtime={overburdenedEmployeeWorkingtime}
            loading={summaryLoading}
          />
        </div>
      ) : (
        <div>
          <WellnessDetailed loading={detailedLoading} />
        </div>
      )}
    </div>
  );
};

export default Wellness;
