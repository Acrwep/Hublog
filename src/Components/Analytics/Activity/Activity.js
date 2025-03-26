import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { FiActivity } from "react-icons/fi";
import "../styles.css";
import ActivitySummary from "./ActivitySummary";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Common/CommonDoubleDatePicker";
import {
  getCurrentandPreviousweekDate,
  parseTimeToDecimal,
} from "../../Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  getActivityBreakdown,
  getActivityEmployeeslist,
  getActivityTrend,
  getProductivityWorktimeTrends,
  getTeams,
  getTopAppAndUrlsUsage,
  getTopAppsUsage,
  getTopCategoryUsage,
  getTopUrlsUsage,
  getUsers,
  getUsersByTeamId,
} from "../../APIservice.js/action";
import ActivityDetailed from "./ActivityDetailed";
import {
  storeActivityBreakdown,
  storeActivityEmployeesList,
  storeActivityTeamLevelBreakdown,
  storeActivityTrends,
  storeActivityWorktimeTrends,
  storeLeastActivityTeams,
  storeMostActivityTeams,
  storeTeamwiseActivity,
} from "../../Redux/slice";
import Loader from "../../Common/Loader";
import { useDispatch } from "react-redux";

const Activity = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [totalActivity, setTotalActivity] = useState(null);
  const [totalActivityTime, setTotalActivityTime] = useState("");
  const [totalBreakdownOnlineTime, setTotalBreakdownOnlineTime] = useState("");
  const [breakdownAverageTime, setBreakdownAverageTime] = useState("");
  const [topAppName, setTopAppName] = useState("");
  const [topAppUsageTime, setTopAppUsageTime] = useState("");
  const [topUrlName, setTopUrlName] = useState("");
  const [topUrlUsageTime, setTopUrlUsageTime] = useState("");
  const [topCategoryName, setTopCategoryName] = useState("");
  const [topCategoryUsageTime, setTopCategoryUsageTime] = useState("");
  const [isBreakdownEmpty, setIsBreakdownEmpty] = useState(false);
  const [isManager, setIsManager] = useState(false);

  //loader usestates
  const [breakdownLoader, setBreakdownLoader] = useState(true);
  const [topappsLoader, setTopappsLoader] = useState(true);
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [worktimeLoader, setWorktimeLoader] = useState(true);
  const [activityTrendLoader, setActivityTrendLoader] = useState(true);
  const [employeeLoader, setEmployeeLoader] = useState(true);

  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [detailedLoading, setDetailedLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState(null);

  const handlePageChange = (pageNumber) => {
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    }
    getActivityBreakdownData(
      organizationId,
      teamId,
      userId,
      selectedDates[0],
      selectedDates[1],
      pageNumber
    );
    setActivePage(pageNumber);
  };

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
    const managerTeamId = localStorage.getItem("managerTeamId");
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
    const orgId = localStorage.getItem("organizationId");
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
      setTimeout(() => {
        getActivityBreakdownData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1],
          activePage
        );
      }, 300);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
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
        getActivityBreakdownData(
          orgId,
          managerTeamId,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1],
          activePage
        );
      }, 350);
    }
  };

  const getActivityBreakdownData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate,
    pageNumber
  ) => {
    if (pageNumber === 1) {
      setSummaryLoading(true);
      setBreakdownLoader(true);
      setTopappsLoader(true);
      setCategoryLoader(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        ...(userid && { userId: userid }),
        fromDate: startDate,
        toDate: endDate,
      };
      try {
        const response = await getActivityBreakdown(payload);
        console.log("activity breakdown response", response);
        const activityBreakdowndata = response?.data?.data;
        const activityTeamlevelBreakdowndata = response?.data?.percentages;
        const teamwiseActivityData = response?.data?.teams;
        const mostActivityteamsData = response?.data?.top;
        const leastActivityTeamsData = response?.data?.bottom;
        setTotalActivity(activityBreakdowndata?.total_active_time_per);
        const [hours, minutes] =
          activityBreakdowndata?.total_active_time.split(":");
        setTotalActivityTime(`${hours}h:${minutes}m`);

        const [totalOnlinehrs, totalOnlinemin] =
          activityBreakdowndata?.total_Online_Duration.split(":");
        setTotalBreakdownOnlineTime(`${totalOnlinehrs}h ${totalOnlinemin}m`);

        const [avgHours, avgMinutes] =
          activityBreakdowndata?.averageDuration.split(":");
        setBreakdownAverageTime(`${avgHours}h ${avgMinutes}m`);
        dispatch(
          storeActivityBreakdown([
            parseTimeToDecimal(activityBreakdowndata.total_active_time),
            parseTimeToDecimal(activityBreakdowndata.total_idle_duration),
          ])
        );
        dispatch(
          storeActivityTeamLevelBreakdown([
            activityTeamlevelBreakdowndata.greaterThan75Active,
            activityTeamlevelBreakdowndata.between50And75Active,
            activityTeamlevelBreakdowndata.lessThan50Active,
          ])
        );
        dispatch(storeTeamwiseActivity(teamwiseActivityData));
        dispatch(storeMostActivityTeams(mostActivityteamsData));
        dispatch(storeLeastActivityTeams(leastActivityTeamsData));
        if (
          activityBreakdowndata.total_active_time === "00:00:00" &&
          activityBreakdowndata.total_idle_duration === "00:00:00"
        ) {
          setIsBreakdownEmpty(true);
        } else {
          setIsBreakdownEmpty(false);
        }
      } catch (error) {
        console.log("errr", error);
        CommonToaster(error?.response?.data, "error");
        setTotalActivity("-");
        setTotalActivityTime("-");
        setIsBreakdownEmpty(true);
        setTotalBreakdownOnlineTime("-");
        setBreakdownAverageTime("-");
        dispatch(storeActivityBreakdown([]));
        dispatch(storeActivityTeamLevelBreakdown([]));
        dispatch(storeTeamwiseActivity([]));
        dispatch(storeMostActivityTeams([]));
        dispatch(storeLeastActivityTeams([]));
      } finally {
        setTimeout(() => {
          setBreakdownLoader(false);
          getTopAppAndUrlData(orgId, teamid, startDate, endDate);
        }, 100);
      }
    } else {
      setDetailedLoading(true);
      setWorktimeLoader(true);
      setActivityTrendLoader(true);
      setEmployeeLoader(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        ...(userid && { userId: userid }),
        fromDate: startDate,
        toDate: endDate,
      };

      try {
        const response = await getProductivityWorktimeTrends(payload);
        const worktrendsdata = response?.data?.data?.data;
        console.log("activity worktimetrends response", worktrendsdata);
        dispatch(storeActivityWorktimeTrends(worktrendsdata));
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeActivityWorktimeTrends([]));
      } finally {
        setTimeout(() => {
          setWorktimeLoader(false);
          getActivityTrendData(orgId, teamid, userid, startDate, endDate);
        }, 100);
      }
    }
  };

  const getTopAppAndUrlData = async (orgId, teamid, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopAppAndUrlsUsage(payload);
      const TopAppandUrlData = response.data;
      if (TopAppandUrlData.applicationName != null) {
        setTopAppName(
          TopAppandUrlData.applicationName[0].toUpperCase() +
            TopAppandUrlData.applicationName.slice(1)
        );
        const [hours, minutes] = TopAppandUrlData.appMaxUsage.split(":");
        setTopAppUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopAppName("-");
        setTopAppUsageTime("-");
      }

      if (TopAppandUrlData.url != null) {
        setTopUrlName(TopAppandUrlData.url);
        const [hours, minutes] = TopAppandUrlData.urlMaxUsage.split(":");
        setTopUrlUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopUrlName("-");
        setTopUrlUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopAppName("-");
      setTopAppUsageTime("-");
      setTopUrlName("-");
      setTopUrlUsageTime("-");
    } finally {
      setTimeout(() => {
        setTopappsLoader(false);
        getTopCategoryUsageData(orgId, teamid, startdate, enddate);
      }, 100);
    }
  };

  const getTopCategoryUsageData = async (orgId, teamid, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startdate,
      toDate: enddate,
    };
    try {
      const response = await getTopCategoryUsage(payload);
      const TopCategoryUsageData = response.data;
      console.log("topcategory response", TopCategoryUsageData);

      if (TopCategoryUsageData.applicationName) {
        setTopCategoryName(TopCategoryUsageData.applicationName);

        const [hours, minutes] = TopCategoryUsageData.maxUsage.split(":");
        setTopCategoryUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopCategoryName("-");
        setTopCategoryUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopCategoryName("-");
      setTopCategoryUsageTime("-");
    } finally {
      setTimeout(() => {
        setSummaryLoading(false);
        setLoading(false);
        setCategoryLoader(false);
      }, 100);
    }
  };

  const getActivityTrendData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getActivityTrend(payload);
      const activityTrendData = response?.data;
      console.log("activity trend response", activityTrendData);
      dispatch(storeActivityTrends(activityTrendData));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeActivityTrends([]));
    } finally {
      setTimeout(() => {
        setActivityTrendLoader(false);
        getActivityEmployeesListData(orgId, teamid, userid, startDate, endDate);
      }, 100);
    }
  };

  const getActivityEmployeesListData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getActivityEmployeeslist(payload);
      const activityEmployeeData = response?.data?.data;
      console.log("activity employeelist response", activityEmployeeData);
      dispatch(storeActivityEmployeesList(activityEmployeeData));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeActivityEmployeesList([]));
    } finally {
      setTimeout(() => {
        setEmployeeLoader(false);
        setDetailedLoading(false);
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
      setUserId(null);
      getActivityBreakdownData(
        organizationId,
        value,
        null,
        selectedDates[0],
        selectedDates[1],
        activePage
      );
    } catch (error) {
      setUserList([]);
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getActivityBreakdownData(
      organizationId,
      teamId,
      value,
      selectedDates[0],
      selectedDates[1],
      activePage
    );
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      console.log("call function");
      getActivityBreakdownData(
        organizationId,
        teamId,
        userId,
        dateStrings[0],
        dateStrings[1],
        activePage
      );
    }
  };

  const handleRefresh = () => {
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    const managerTeamId = localStorage.getItem("managerTeamId");

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
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setUserList(nonChangeUserList);
    setSelectedDates(PreviousandCurrentDate);
    getActivityBreakdownData(
      organizationId,
      managerTeamId ? parseInt(managerTeamId) : null,
      null,
      PreviousandCurrentDate[0],
      PreviousandCurrentDate[1],
      activePage
    );
  };
  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <FiActivity size={20} />
            </div>
            <h2 className="allpage_mainheadings">Activity</h2>
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
              disabled={loading ? true : false}
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
                style={{ marginLeft: "12px" }}
                onClick={handleRefresh}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      {/* {loading ? (
        <Loader />
      ) : (
        <> */}
      {activePage === 1 ? (
        <div>
          <ActivitySummary
            totalActivity={totalActivity}
            totalActivityTime={totalActivityTime}
            totalBreakdownOnlineTime={totalBreakdownOnlineTime}
            breakdownAverageTime={breakdownAverageTime}
            topAppName={topAppName}
            topAppUsageTime={topAppUsageTime}
            topUrlName={topUrlName}
            topUrlUsageTime={topUrlUsageTime}
            topCategoryName={topCategoryName}
            topCategoryUsageTime={topCategoryUsageTime}
            isBreakdownEmpty={isBreakdownEmpty}
            loading={summaryLoading}
            breakdownLoader={breakdownLoader}
            topappsLoader={topappsLoader}
            categoryLoader={categoryLoader}
          />
        </div>
      ) : (
        <div>
          <ActivityDetailed
            loading={detailedLoading}
            worktimeLoader={worktimeLoader}
            activityTrendLoader={activityTrendLoader}
            employeeLoader={employeeLoader}
          />
        </div>
      )}
      {/* </>
      )} */}
    </div>
  );
};

export default Activity;
