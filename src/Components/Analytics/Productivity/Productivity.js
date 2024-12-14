import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { MdRocketLaunch } from "react-icons/md";
import "../styles.css";
import ProductivitySummary from "./ProductivitySummary";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Common/CommonDoubleDatePicker";
import {
  getCurrentandPreviousweekDate,
  parseTimeToDecimal,
} from "../../Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  getProductivityBreakdown,
  getProductivityEmployeesList,
  getProductivityOutliers,
  getProductivityTrend,
  getProductivityWorktimeTrends,
  getTeams,
  getTeamwiseProductivity,
  getTopAppsUsage,
  getTopCategoryUsage,
  getTopUrlsUsage,
  getUsers,
  getUsersByTeamId,
} from "../../APIservice.js/action";
import ProductivityDetailed from "./ProductivityDetailed";
import { useDispatch } from "react-redux";
import {
  storeLeastProductivityTeams,
  storeMostProductivityTeams,
  storeProductivityBreakdown,
  storeProductivityEmployeelist,
  storeProductivityTrend,
  storeProductivityWorktimeTrends,
  storeTeamwiseProductivity,
} from "../../Redux/slice";
import Loader from "../../Common/Loader";

const Productivity = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [breakdownTotalDuration, setBreakdownTotalDuration] = useState("");
  const [breakdownAverageTime, setBreakdownAverageTime] = useState("");
  const [isBreakdownEmpty, setIsBreakdownEmpty] = useState(false);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [totalProductivity, setTotalProductivity] = useState(null);
  const [totalProductivityTime, setTotalProductivityTime] = useState("");
  const [topAppName, setTopAppName] = useState("");
  const [topAppUsageTime, setTopAppUsageTime] = useState("");
  const [topUrlName, setTopUrlName] = useState("");
  const [topUrlUsageTime, setTopUrlUsageTime] = useState("");
  const [topCategoryName, setTopCategoryName] = useState("");
  const [topCategoryUsageTime, setTopCategoryUsageTime] = useState("");
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
    getBreakdownData(
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
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
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
      }, 100);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
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
        getBreakdownData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1],
          activePage
        );
      }, 100);
    }
  };

  const getBreakdownData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate,
    pageNumber
  ) => {
    if (pageNumber === 1) {
      setSummaryLoading(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        fromDate: startDate,
        toDate: endDate,
      };
      try {
        const response = await getProductivityBreakdown(payload);
        const breakdowndata = response?.data;
        console.log("breakdown response", breakdowndata);
        const [hours, minutes] =
          breakdowndata.totalProductiveDuration.split(":");
        setBreakdownTotalDuration(`${hours}h ${minutes}m`);
        setTotalProductivityTime(`${hours}h:${minutes}m`);
        const [avgHours, avgMinutes] =
          breakdowndata.averageDuratiopn.split(":");
        setBreakdownAverageTime(`${avgHours}h ${avgMinutes}m`);
        dispatch(
          storeProductivityBreakdown([
            parseTimeToDecimal(breakdowndata.totalProductiveDuration),
            parseTimeToDecimal(breakdowndata.totalNeutralDuration),
            parseTimeToDecimal(breakdowndata.totalUnproductiveDuration),
          ])
        );
        if (
          breakdowndata.totalProductiveDuration === "00:00:00" &&
          breakdowndata.totalNeutralDuration === "00:00:00" &&
          breakdowndata.totalUnproductiveDuration === "00:00:00"
        ) {
          setIsBreakdownEmpty(true);
        } else {
          setIsBreakdownEmpty(false);
        }
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeProductivityBreakdown([]));
        setTotalProductivityTime("-");
        setBreakdownTotalDuration("-");
        setBreakdownAverageTime("-");
        setIsBreakdownEmpty(true);
      } finally {
        setTimeout(() => {
          getTeamwiseProductivityData(orgId, teamid, startDate, endDate);
        }, 100);
      }
    } else {
      setDetailedLoading(true);
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
        console.log("worktime trends response", worktrendsdata);
        dispatch(storeProductivityWorktimeTrends(worktrendsdata));
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeProductivityWorktimeTrends([]));
      } finally {
        setTimeout(() => {
          getProductiveTrendData(orgId, teamid, userid, startDate, endDate);
        }, 100);
      }
    }
  };

  const getTeamwiseProductivityData = async (
    orgId,
    teamid,
    startDate,
    endDate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startDate,
      toDate: endDate,
    };
    try {
      const response = await getTeamwiseProductivity(payload);
      const teamwisedata = response?.data;
      console.log("teamwisedata response", teamwisedata);
      dispatch(storeTeamwiseProductivity(teamwisedata));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeTeamwiseProductivity([]));
    } finally {
      setTimeout(() => {
        getProductivityOutliersData(orgId, teamid, startDate, endDate);
      }, 100);
    }
  };

  const getProductivityOutliersData = async (
    orgId,
    teamid,
    startDate,
    endDate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startDate,
      toDate: endDate,
    };
    try {
      const response = await getProductivityOutliers(payload);
      console.log("outttt", response);
      setTotalProductivity(
        response?.data.grandTotalpercentage.toFixed(2) + "%"
      );
      const productivityOutliers = response?.data?.data;
      console.log("outliers response", productivityOutliers);
      const topTeams = productivityOutliers?.top;
      dispatch(storeMostProductivityTeams(topTeams));
      dispatch(storeLeastProductivityTeams(productivityOutliers?.bottom));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setTotalProductivity("-");
      dispatch(storeMostProductivityTeams([]));
      dispatch(storeLeastProductivityTeams([]));
    } finally {
      setTimeout(() => {
        getTopAppUsageData(orgId, teamid, startDate, endDate);
      }, 100);
    }
  };

  const getTopAppUsageData = async (orgId, teamid, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopAppsUsage(payload);
      const TopAppsUsageData = response.data;
      if (TopAppsUsageData.applicationName != null) {
        setTopAppName(
          TopAppsUsageData.applicationName[0].toUpperCase() +
            TopAppsUsageData.applicationName.slice(1)
        );

        const [hours, minutes] = TopAppsUsageData.maxUsage.split(":");
        setTopAppUsageTime(hours + "h:" + minutes + "m");
        return;
      } else {
        setTopAppName("-");
        setTopAppUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopAppName("-");
      setTopAppUsageTime("-");
    } finally {
      setTimeout(() => {
        getTopUrlUsageData(orgId, teamid, startdate, enddate);
      }, 100);
    }
  };

  const getTopUrlUsageData = async (orgId, teamid, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopUrlsUsage(payload);
      const TopUrlsUsageData = response.data;

      if (TopUrlsUsageData.url) {
        setTopUrlName(TopUrlsUsageData.url);

        const [hours, minutes] = TopUrlsUsageData.maxUsage.split(":");
        setTopUrlUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopUrlName("-");
        setTopUrlUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopUrlName("-");
      setTopUrlUsageTime("-");
    } finally {
      setTimeout(() => {
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
      }, 100);
    }
  };

  const getProductiveTrendData = async (
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
      const response = await getProductivityTrend(payload);
      const productivityTrenddata = response?.data?.data;
      console.log("trends response", productivityTrenddata);
      dispatch(storeProductivityTrend(productivityTrenddata));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeProductivityTrend([]));
    } finally {
      setTimeout(() => {
        getProductivityEmployeeData(orgId, teamid, userid, startDate, endDate);
      }, 100);
    }
  };

  const getProductivityEmployeeData = async (
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
      const response = await getProductivityEmployeesList(payload);
      const productivityEmployeedata = response?.data?.data;
      console.log("prod employee response", productivityEmployeedata);
      dispatch(storeProductivityEmployeelist(productivityEmployeedata));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      dispatch(storeProductivityEmployeelist([]));
    } finally {
      setTimeout(() => {
        setDetailedLoading(false);
      }, 100);
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
      getBreakdownData(
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
    getBreakdownData(
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
      getBreakdownData(
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
    } else {
      setTeamId(null);
      setUserId(null);
      setUserList(nonChangeUserList);
      setSelectedDates(PreviousandCurrentDate);
      getBreakdownData(
        organizationId,
        null,
        null,
        PreviousandCurrentDate[0],
        PreviousandCurrentDate[1],
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
              <MdRocketLaunch size={20} />
            </div>
            <h2 className="allpage_mainheadings">Productivity</h2>
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
              disabled={loading ? true : false}
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

      {loading ? (
        <Loader />
      ) : (
        <>
          {activePage === 1 ? (
            <div>
              <ProductivitySummary
                totalProductivityTime={totalProductivityTime}
                breakdownTotalDuration={breakdownTotalDuration}
                breakdownAverageTime={breakdownAverageTime}
                totalProductivity={totalProductivity}
                topAppName={topAppName}
                topAppUsageTime={topAppUsageTime}
                topUrlName={topUrlName}
                topUrlUsageTime={topUrlUsageTime}
                topCategoryName={topCategoryName}
                topCategoryUsageTime={topCategoryUsageTime}
                isBreakdownEmpty={isBreakdownEmpty}
                loading={summaryLoading}
              />
            </div>
          ) : (
            <div>
              <ProductivityDetailed loading={detailedLoading} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productivity;
