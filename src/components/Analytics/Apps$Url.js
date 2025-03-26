import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { PiMonitorFill } from "react-icons/pi";
import ReactApexChart from "react-apexcharts";
import {
  getAppsUsage,
  getTopAppsUsage,
  getTeams,
  getUsers,
  getUsersByTeamId,
  getUrlsUsage,
  getTopUrlsUsage,
  getTopCategoryUsage,
  getTopAppAndUrlsUsage,
} from "../APIservice.js/action";
import Loader from "../Common/Loader";
import CommonNodatafound from "../Common/CommonNodatafound";
import "./styles.css";
import { CommonToaster } from "../Common/CommonToaster";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import {
  addAppandUrlTime,
  getCurrentandPreviousweekDate,
  parseTimeToDecimal,
} from "../Common/Validation";

const Apps$Url = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [appsData, setAppsData] = useState([]);
  const [urlsData, setUrlsData] = useState([]);
  const [topAppName, setTopAppName] = useState("");
  const [topAppUsageTime, setTopAppUsageTime] = useState("");
  const [topUrlName, setTopUrlName] = useState("");
  const [topUrlUsageTime, setTopUrlUsageTime] = useState("");
  const [topCategoryName, setTopCategoryName] = useState("");
  const [topCategoryUsageTime, setTopCategoryUsageTime] = useState("");
  const [isManager, setIsManager] = useState(false);
  //loader usestates
  const [topappsLoader, setTopappsLoader] = useState(true);
  const [topCategoryLoader, setTopCategoryLoader] = useState(true);
  const [appUsageLoader, setAppUsageLoader] = useState(true);
  const [urlUsageLoader, setUrlUsageLoader] = useState(true);

  // Function to convert "HH:MM:SS" to total seconds
  function convertToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds; // Convert to seconds
  }

  // Function to format time for tooltip
  function formatTooltipTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  }

  const barchartoptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    grid: {
      show: false, // Disable grid lines
    },
    dataLabels: {
      enabled: false, // Disable the value labels on the bars
    },
    colors: ["#25a17d"],
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const xValue = w.globals.labels[dataPointIndex];
        const yValue = series[seriesIndex][dataPointIndex];
        const color = w.config.colors[seriesIndex]; // Get the color of the series

        return `
          <div style="padding: 5px 9px;">
            <span style="display:inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 5px;"></span>
            <strong>${xValue}</strong>: ${formatTooltipTime(yValue)}
          </div>
        `;
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: "500", // Make the labels bold
          fontSize: "13px",
          fontFamily: "Poppins, sans-serif",
          userSelect: "text",
        },
        formatter: function (value) {
          return value; // Simply return the value
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        formatter: function (value) {
          const hours = Math.floor(value / 3600);
          return `${hours}h`;
        },
      },
    },
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const barchartseries = [
    {
      data: appsData.map((item) => ({
        x: capitalizeFirstLetter(item.applicationName),
        y: convertToSeconds(item.totalUsage),
      })),
    },
  ];

  const urlsbarchartseries = [
    {
      data: urlsData.map((item) => ({
        x: capitalizeFirstLetter(item.url),
        y: convertToSeconds(item.totalUsage),
      })),
    },
  ];

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
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    try {
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamsList = response.data;
      setTeamList(teamsList);
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
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      setUserList(usersList);
      setNonChangeUserList(usersList);
      setUserId(null);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getTopAppAndUrlData(
          null,
          null,
          orgId,
          PreviousandCurrentDate[0],
          PreviousandCurrentDate[1]
        );
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    const managerTeamId = localStorage.getItem("managerTeamId");

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setUserId(null);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      const teamMembersList = [];
      setNonChangeUserList(teamMembersList);
    } finally {
      setTimeout(() => {
        getTopAppAndUrlData(
          null,
          managerTeamId,
          orgId,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 350);
    }
  };

  const getTopAppAndUrlData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    setTopappsLoader(true);
    setTopCategoryLoader(true);
    setAppUsageLoader(true);
    setUrlUsageLoader(true);
    const payload = {
      organizationId: orgId,
      ...(userid && { userId: userid }),
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
        getTopCategoryUsageData(userid, teamid, orgId, startdate, enddate);
      }, 100);
    }
  };

  const getTopCategoryUsageData = async (
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
        setTopCategoryLoader(false);
        getAppsData(userid, teamid, orgId, startdate, enddate);
      }, 500);
    }
  };

  const getAppsData = async (userid, teamid, orgId, startdate, enddate) => {
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAppsUsage(payload);
      const AppsandurlsData = response.data;
      console.log("apps and urls response", AppsandurlsData);
      setAppsData(AppsandurlsData);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setAppUsageLoader(false);
        getUrlsUsageData(userid, teamid, orgId, startdate, enddate);
      }, 500);
    }
  };

  const getUrlsUsageData = async (
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
      const response = await getUrlsUsage(payload);
      const AppsandurlsData = response.data;
      setUrlsData(AppsandurlsData);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setUrlUsageLoader(false);
      }, 500);
    }
  };

  //onchange functions
  const handleTeam = async (value) => {
    setTeamId(value);
    const userid = null;
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        return;
      }

      setUserList(teamMembersList);
      setUserId(userid);
      getTopAppAndUrlData(
        userid,
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
      getTopAppAndUrlData(userId, teamId, organizationId, startDate, endDate);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getTopAppAndUrlData(
      value,
      teamId,
      organizationId,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const handleRefresh = () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");
    const CurrentandPreviousDate = getCurrentandPreviousweekDate();

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

    if (
      managerTeamId &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }
    setTopappsLoader(true);
    setTopCategoryLoader(true);
    setAppUsageLoader(true);
    setUrlUsageLoader(true);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);
    getTopAppAndUrlData(
      null,
      managerTeamId ? parseInt(managerTeamId) : null,
      orgId,
      PreviousandCurrentDate[0],
      PreviousandCurrentDate[1]
    );
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <PiMonitorFill size={20} />
        </div>
        <h2 className="allpage_mainheadings">Apps & URLs</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="screenshot_selectfieldsContainer">
            <div className="screenshot_selectfields">
              <CommonSelectField
                options={teamList}
                value={teamId}
                placeholder="Select Team"
                onChange={handleTeam}
                disabled={isManager}
              />
            </div>
            <div className="screenshot_selectfields">
              <CommonSelectField
                options={userList}
                value={userId}
                placeholder="Select User"
                onChange={handleUser}
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

      <Row gutter={16}>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="userproductivity_topContainers">
            {topappsLoader ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top Application</p>

                <p className="userproductivity_contents">{topAppName}</p>
                <p className="userproductivity_hours">{topAppUsageTime}</p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <div className="userproductivity_topContainers">
            {topappsLoader ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top URL</p>
                <p className="userproductivity_contents">
                  {topUrlName === "-" ? topUrlName : "https://" + topUrlName}
                </p>
                <p className="userproductivity_hours">{topUrlUsageTime}</p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="userproductivity_topContainers">
            {topCategoryLoader ? (
              <Skeleton
                active
                title={{ height: "13px", borderRadius: "12px" }}
                paragraph={{
                  rows: 2,
                }}
                className="appsandurlcard_skeleton"
              />
            ) : (
              <>
                <p>Top Category</p>
                <p className="userproductivity_contents">{topCategoryName}</p>
                <p className="userproductivity_hours">{topCategoryUsageTime}</p>
              </>
            )}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <Row gutter={16}>
          <Col span={24}>
            <div
              className="appsandurlchart_Containers"
              style={{
                height: appsData.length <= 10 ? "auto" : "50vh",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
              }}
            >
              {appUsageLoader ? (
                <div style={{ height: "40vh" }}>
                  <Skeleton
                    active
                    title={{ width: 140 }}
                    paragraph={{
                      rows: 0,
                    }}
                  />
                </div>
              ) : (
                <>
                  <p className="devices_chartheading">Application Usage</p>
                  {appsData.length >= 1 ? (
                    <ReactApexChart
                      options={barchartoptions}
                      series={barchartseries}
                      type="bar"
                      height={
                        appsData.length <= 5
                          ? 170
                          : appsData.length > 5 && appsData.length <= 10
                          ? 260
                          : appsData.length * 32
                      }
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              className="appsandurlchart_Containers"
              style={{
                height: urlsData.length <= 5 ? "auto" : "50vh",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {urlUsageLoader ? (
                <div style={{ height: "40vh" }}>
                  <Skeleton
                    active
                    title={{ width: 140 }}
                    paragraph={{
                      rows: 0,
                    }}
                  />
                </div>
              ) : (
                <>
                  <p className="devices_chartheading">URL Usage</p>
                  {urlsData.length >= 1 ? (
                    <ReactApexChart
                      options={barchartoptions}
                      series={urlsbarchartseries}
                      type="bar"
                      height={
                        urlsData.length <= 5
                          ? 170
                          : urlsData.length > 5 && urlsData.length <= 10
                          ? 260
                          : urlsData.length * 32
                      }
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Apps$Url;
