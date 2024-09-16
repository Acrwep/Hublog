import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
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
} from "../APIservice.js/action";
import Loader from "../Common/Loader";
import CommonNodatafound from "../Common/CommonNodatafound";
import "./styles.css";
import { CommonToaster } from "../Common/CommonToaster";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { addAppandUrlTime } from "../Common/Validation";

const Apps$Url = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [userList, setUserList] = useState([]);
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
  const [internetTime, setInternetTime] = useState("");
  const [loading, setLoading] = useState(false);

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

        // Convert yValue back to hours and minutes
        const hours = Math.floor(yValue); // Get the whole number of hours
        const minutes = Math.round((yValue - hours) * 60); // Get the remaining minutes
        return `
          <div style="padding: 5px 9px;">
            <span style="display:inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 5px;"></span>
            <strong>${xValue}</strong>: ${hours}h:${minutes}m
          </div>
        `;
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: "500", // Make the labels bold
          fontSize: "13px",
          fontFamily: "Poppins, sans-serif",
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
          const hours = Math.floor(value);
          return `${hours}h`;
        },
      },
    },
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const convertToTimeFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseFloat(hours) + parseFloat(minutes) / 60;
  };

  const barchartseries = [
    {
      data: appsData.map((item) => ({
        x: capitalizeFirstLetter(item.applicationName),
        y: convertToTimeFormat(item.totalUsage),
      })),
    },
  ];

  const urlsbarchartseries = [
    {
      data: urlsData.map((item) => ({
        x: item.url,
        y: convertToTimeFormat(item.totalUsage),
      })),
    },
  ];

  useEffect(() => {
    getTeamData();
  }, []);

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
    setSelectedDates(dates);
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

  const getTeamData = async () => {
    setLoading(true);
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      getCurrentandPreviousweekDate();
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
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      //merge user fullname and lastname in full_name property
      const updateUserList = usersList.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });

      setUserList(updateUserList);
      setUserId(null);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getAppsData(null, null, orgId);
      }, 500);
    }
  };

  const getAppsData = async (userid, teamid, orgId, startdate, enddate) => {
    const currentDate = new Date();

    // Calculate previous week date (subtract 7 days)
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    // Format dates
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate:
        startdate === undefined ? formattedPreviousWeekDate : startdate,
      endDate: enddate === undefined ? formattedCurrentDate : enddate,
    };
    try {
      const response = await getAppsUsage(payload);
      const AppsandurlsData = response.data;
      setAppsData(AppsandurlsData);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getTopAppUsageData(userid, teamid, orgId, startdate, enddate);
      }, 500);
    }
  };

  const getTopAppUsageData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate
  ) => {
    const currentDate = new Date();
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate:
        startdate === undefined ? formattedPreviousWeekDate : startdate,
      endDate: enddate === undefined ? formattedCurrentDate : enddate,
    };
    let AppMaxTime = "";
    try {
      const response = await getTopAppsUsage(payload);
      const TopAppsUsageData = response.data;
      if (TopAppsUsageData.applicationName != null) {
        setTopAppName(
          TopAppsUsageData.applicationName[0].toUpperCase() +
            TopAppsUsageData.applicationName.slice(1)
        );

        const [hours, minutes] = TopAppsUsageData.maxUsage.split(":");
        AppMaxTime = TopAppsUsageData.maxUsage;
        setTopAppUsageTime(hours + "h:" + minutes + "m");
        return;
      } else {
        setTopAppName("-");
        setTopAppUsageTime("-");
        AppMaxTime = "";
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopAppName("-");
      setTopAppUsageTime("-");
      AppMaxTime = "";
    } finally {
      setTimeout(() => {
        getUrlsUsageData(userid, teamid, orgId, startdate, enddate, AppMaxTime);
      }, 500);
    }
  };

  const getUrlsUsageData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate,
    AppMaxTime
  ) => {
    const currentDate = new Date();

    // Calculate previous week date (subtract 7 days)
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    // Format dates
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate:
        startdate === undefined ? formattedPreviousWeekDate : startdate,
      endDate: enddate === undefined ? formattedCurrentDate : enddate,
    };
    try {
      const response = await getUrlsUsage(payload);
      const AppsandurlsData = response.data;
      setUrlsData(AppsandurlsData);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getTopUrlUsageData(
          userid,
          teamid,
          orgId,
          startdate,
          enddate,
          AppMaxTime
        );
      }, 500);
    }
  };

  const getTopUrlUsageData = async (
    userid,
    teamid,
    orgId,
    startdate,
    enddate,
    AppMaxTime
  ) => {
    const currentDate = new Date();
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate:
        startdate === undefined ? formattedPreviousWeekDate : startdate,
      endDate: enddate === undefined ? formattedCurrentDate : enddate,
    };
    try {
      const response = await getTopUrlsUsage(payload);
      const TopUrlsUsageData = response.data;
      console.log("top url usage response", TopUrlsUsageData);
      if (TopUrlsUsageData.url) {
        setTopUrlName(TopUrlsUsageData.url);

        const [hours, minutes] = TopUrlsUsageData.maxUsage.split(":");
        setTopUrlUsageTime(hours + "h:" + minutes + "m");

        const totalTime = addAppandUrlTime(
          AppMaxTime,
          TopUrlsUsageData.maxUsage
        );
        setInternetTime(totalTime);
      } else {
        setTopUrlName("-");
        setTopUrlUsageTime("-");
        setInternetTime("");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopUrlName("-");
      setTopUrlUsageTime("-");
      setInternetTime("");
    } finally {
      setTimeout(() => {
        setLoading(false);
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
      setUserId(userid);
      getAppsData(
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
      getAppsData(userId, teamId, organizationId, startDate, endDate);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getAppsData(
      value,
      teamId,
      organizationId,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const handleRefresh = () => {
    setTeamId(null);
    setUserId(null);

    const currentDate = new Date();
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    let dates = [];
    dates.push(formattedPreviousWeekDate, formattedCurrentDate);
    setSelectedDates(dates);

    getAppsData(
      null,
      null,
      organizationId,
      formattedPreviousWeekDate,
      formattedCurrentDate
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={7} lg={7}>
              <div className="userproductivity_topContainers">
                <p>Top Application</p>
                <p className="userproductivity_contents">{topAppName}</p>
                <p className="userproductivity_hours">{topAppUsageTime}</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={10} lg={10}>
              <div className="userproductivity_topContainers">
                <p>Top URL</p>
                <p className="userproductivity_contents">
                  {topUrlName === "-" ? topUrlName : "https://" + topUrlName}
                </p>
                <p className="userproductivity_hours">{topUrlUsageTime}</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7}>
              <div className="userproductivity_topContainers">
                <p>Top Category</p>
                <p className="userproductivity_contents">
                  {internetTime ? "Internet" : "-"}
                </p>
                <p className="userproductivity_hours">
                  {internetTime ? internetTime : "-"}
                </p>
              </div>
            </Col>
          </Row>

          <div style={{ marginTop: "25px" }}>
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
                          : "auto"
                      }
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "25px" }}>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div
                  className="appsandurlchart_Containers"
                  style={{
                    height: urlsData.length <= 5 ? "100%" : "50vh",
                    overflowY: "auto",
                  }}
                >
                  <p className="devices_chartheading">URL Usage</p>
                  {urlsData.length >= 1 ? (
                    <ReactApexChart
                      options={barchartoptions}
                      series={urlsbarchartseries}
                      type="bar"
                      height={
                        urlsData.length <= 5
                          ? 175
                          : urlsData.length > 5 && urlsData.length <= 10
                          ? 260
                          : "auto"
                      }
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default Apps$Url;
