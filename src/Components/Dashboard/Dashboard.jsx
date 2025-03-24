import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Tooltip,
  Button,
  Flex,
  Progress,
  Spin,
  Skeleton,
  Divider,
} from "antd";
import ReactApexChart from "react-apexcharts";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../Common/CommonDonutChart";
import { LineCharts } from "../chart/RangeChart";
import { MdDashboardCustomize } from "react-icons/md";
import "./styles.css";
import {
  getActivityBreakdown,
  getActivityTrend,
  getAttendanceSummary,
  getAttendanceTrends,
  getGoalsDetails,
  getProductivityOutliers,
  getProductivityTrend,
  getTeams,
} from "../APIservice.js/action";
import Loader from "../Common/Loader";
import { IoIosTrophy } from "react-icons/io";
import { FaTrophy } from "react-icons/fa6";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import CommonNodatafound from "../Common/CommonNodatafound";
import DashboardChart from "./DashboardChart";
import { parseTimeToDecimal } from "../Common/Validation";
// import { Progress } from 'antd';
// import { DatePicker } from 'antd';

const Dashboard = () => {
  //usestates
  const [todayAttendanceSeries, setTodayAttendanceSeries] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [topProductivityTeams, setTopproductivityTeams] = useState([]);
  const [leastProductivityTeams, setLeastproductivityTeams] = useState([]);
  const [topActivityTeams, setTopactivityTeams] = useState([]);
  const [leastActivityTeams, setLeastactivityTeams] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [productivityTrendData, setProductivityTrendData] = useState([]);
  const [activityTrendsData, setActivityTrendsData] = useState([]);
  const [goalsAchieversData, setGoalsAchieversData] = useState([]);
  const [notGoalsAchieversData, setNotGoalsAchieversData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);
  // Sample data for charts

  const formatTimeInHours = (value) => {
    const hours = Math.floor(value); // Only display whole hours
    return `${hours}hr`;
  };

  const formatTooltipTime = (value) => {
    if (isNaN(value) || value === null || value === undefined)
      return "0hr 0m 0s";
    const hours = Math.floor(value);
    const minutes = Math.floor((value % 1) * 60);
    const seconds = Math.floor(((value % 1) * 3600) % 60);
    return `${hours}hr ${minutes}m ${seconds}s`;
  };

  const productivityTrendXasis = productivityTrendData.map((item) =>
    moment(item.date).format("DD/MM/YYYY")
  );

  const productivityTrendSeries = [
    {
      name: "Productive",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.productive_Duration);
      }),
    },
    {
      name: "Neutral",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.neutral_Duration);
      }),
    },
    {
      name: "Unproductive",
      data: productivityTrendData.map((item) => {
        return parseTimeToDecimal(item.unproductive_Duration);
      }),
    },
  ];

  const activityTrendXasis = activityTrendsData.map((item) =>
    moment(item.date, "MM/DD/YYYY HH:mm:ss").format("DD/MM/YYYY")
  );

  const activityTrendSeries = [
    {
      name: "Active time",
      data: activityTrendsData.map((item) => {
        return parseTimeToDecimal(item.active_Duration);
      }),
    },
    {
      name: "Ideal time",
      data: activityTrendsData.map((item) => {
        return parseTimeToDecimal(item.idle_Duration);
      }),
    },
  ];

  const productivityTrendLineChartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
    },
    stroke: {
      curve: "smooth", // Keeps the line straight for the line chart
    },
    xaxis: {
      categories: productivityTrendXasis,
      labels: {
        show: true,
        rotateAlways: productivityTrendData.length >= 6 ? true : false, // Ensure rotation is applied
        rotate: -45, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      trim: true,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatTimeInHours(value);
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex }) {
          // Show corresponding x-axis name and y value
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${formatTooltipTime(
            val
          )}</span>`;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    colors: ["#25a17d", "#8a8c8c", "rgba(244, 67, 54, 0.82)"], // Different colors for the three series
  };

  const activityLineChartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false, // Show toolbar (can be set to false to hide all)
      },
    },
    stroke: {
      curve: "smooth", // Keeps the line straight for the line chart
    },
    xaxis: {
      categories: activityTrendXasis,
      labels: {
        show: true,
        rotateAlways: activityTrendsData.length >= 6 ? true : false, // Ensure rotation is applied
        rotate: -45, // Rotate labels by -40 degrees
        color: ["#ffffff"],
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      trim: true,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatTimeInHours(value);
        },
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
      title: {
        text: "Value",
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex }) {
          // Show corresponding x-axis name and y value
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${formatTooltipTime(
            val
          )}</span>`;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    colors: ["#25a17d", "#8a8c8c"], // Different colors for the three series
  };

  useEffect(() => {
    getTeamsData();
  }, []);

  const getTeamsData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    setOrganizationId(orgId);
    setTeamId(null);
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);

    try {
      const response = await getTeams(orgId);
      setTeamList(response?.data || []);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getTodayAttendanceData(null, orgId);
      }, 300);
    }
  };
  const getTodayAttendanceData = async (teamid, orgId, startdate, enddate) => {
    setFilterLoading(true);
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();

    const currentDate = new Date();
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      startDate: moment(currentDate).format("YYYY-MM-DD"),
      endDate: moment(currentDate).format("YYYY-MM-DD"),
    };

    try {
      const response = await getAttendanceSummary(payload);
      console.log("today dashboard response", response);
      const details = response?.data?.attendanceSummaries[0];
      let todaySeries = [];
      todaySeries.push(details?.presentCount || 0, details?.absentCount || 0);
      setTodayAttendanceSeries(todaySeries);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTodayAttendanceSeries([]);
    } finally {
      setTimeout(() => {
        getProductivityOutliersData(
          orgId,
          teamid ? teamid : null,
          startdate != undefined || startdate != null
            ? startdate
            : PreviousandCurrentDate[0],
          enddate != undefined || enddate != null
            ? enddate
            : PreviousandCurrentDate[1]
        );
      }, 300);
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
      const productivityOutliers = response?.data?.data;
      console.log("outliers response", productivityOutliers);
      if (productivityOutliers === undefined) {
        setTopproductivityTeams([]);
        setLeastproductivityTeams([]);
        return;
      }
      const topTeams = productivityOutliers?.top;
      setTopproductivityTeams(topTeams);
      setLeastproductivityTeams(productivityOutliers?.bottom);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setTopproductivityTeams([]);
      setLeastproductivityTeams([]);
    } finally {
      setTimeout(() => {
        getActivityOutlisersData(orgId, teamid, startDate, endDate);
      }, 300);
    }
  };

  const getActivityOutlisersData = async (
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
      const response = await getActivityBreakdown(payload);
      console.log("activity breakdown response", response);
      const mostActivityteamsData = response?.data?.top;
      const leastActivityTeamsData = response?.data?.bottom;
      setTopactivityTeams(mostActivityteamsData);
      setLeastactivityTeams(leastActivityTeamsData);
    } catch (error) {
      setTopactivityTeams([]);
      setLeastactivityTeams([]);
    } finally {
      setTimeout(() => {
        getSummaryAttendanceTrendsData(orgId, teamid, startDate, endDate);
      }, 100);
    }
  };

  const getSummaryAttendanceTrendsData = async (
    orgId,
    teamid,
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
      console.log("dashboard response", response);
      const details = response?.data;
      if (
        details?.Title ===
        "Conversion failed when converting date and/or time from character string."
      ) {
        setDashboardData([]);
      } else {
        //dashboard chart handling
        setDashboardData(details?.attendanceSummaries || []);
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setDashboardData([]);
    } finally {
      setTimeout(() => {
        getProductiveTrendData(orgId, teamid, startdate, enddate);
      }, 300);
    }
  };

  const getProductiveTrendData = async (orgId, teamid, startDate, endDate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getProductivityTrend(payload);
      const productivityTrenddata = response?.data?.data;
      console.log("trends response", productivityTrenddata);
      setProductivityTrendData(productivityTrenddata);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setProductivityTrendData([]);
    } finally {
      setTimeout(() => {
        getActivityTrendData(orgId, teamid, startDate, endDate);
      }, 300);
    }
  };

  const getActivityTrendData = async (orgId, teamid, startDate, endDate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getActivityTrend(payload);
      const activityTrendData = response?.data;
      console.log("activity trend response", activityTrendData);
      setActivityTrendsData(activityTrendData);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setActivityTrendsData([]);
    } finally {
      setTimeout(() => {
        getGoalsData(orgId, teamid, startDate, endDate);
      }, 300);
    }
  };

  const getGoalsData = async (orgId, teamid, startDate, endDate) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getGoalsDetails(payload);
      const golasData = response?.data;
      console.log("goals response", golasData);
      setGoalsAchieversData(golasData?.top);
      setNotGoalsAchieversData(golasData?.least);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setGoalsAchieversData([]);
      setNotGoalsAchieversData([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setFilterLoading(false);
      }, 300);
    }
  };

  //team onchange
  const handleTeam = (value) => {
    setTeamId(value);
    setFilterLoading(true);
    getTodayAttendanceData(
      value,
      organizationId,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      getTodayAttendanceData(teamId, organizationId, startDate, endDate);
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
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }
    setFilterLoading(true);
    setTeamId(null);
    setSelectedDates(PreviousandCurrentDate);
    setTimeout(() => {
      getTodayAttendanceData(
        null,
        organizationId,
        PreviousandCurrentDate[0],
        PreviousandCurrentDate[1]
      );
    }, 300);
  };

  return (
    <div className="max-sm:p-0" style={{ padding: "19px 26px" }}>
      <div className="flex justify-start items-center">
        <div className="dashboard_iconContainer">
          <MdDashboardCustomize size={20} className="attendance_icon" />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Dashboard
        </h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "32%" }}>
            <CommonSelectField
              options={teamList}
              placeholder="All Teams"
              onChange={handleTeam}
              value={teamId}
            />
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
      {/* {loading ? (
        <Loader />
      ) : (
        <> */}
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              {filterLoading ? (
                <Skeleton
                  active
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Today's Attendance</p>

                  {/* <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p className="totalactive_timeheading">
                        On time arrivals
                      </p>
                      <p className="totalactive_time">
                        {todatAttendanceData?.onTimeArrivals || 0}
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p className="totalactive_timeheading">Late arrivals</p>
                      <p className="totalactive_time">
                        {todatAttendanceData?.lateArrivals || 0}
                      </p>
                    </Col>
                  </Row> */}
                  <div className="attendance_todayattendance_chartcontainer">
                    {todayAttendanceSeries.length >= 1 ? (
                      <CommonDonutChart
                        labels={["Present", "Absent"]}
                        colors={["#25a17d", "#ABB3B3"]}
                        series={todayAttendanceSeries}
                        labelsfontSize="16px"
                        height={300}
                      />
                    ) : (
                      <CommonNodatafound />
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={17} lg={17}>
            <div className="devices_chartsContainer">
              {filterLoading ? (
                // <div style={{ height: "50vh" }}>
                //   <div className="screenshots_spinContainer">
                //     <Spin />
                //   </div>
                // </div>
                <Skeleton
                  active
                  style={{ height: "50vh" }}
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  {dashboardData.length >= 1 ? (
                    <DashboardChart data={dashboardData} />
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={7}>
            <div className="devices_chartsContainer">
              {filterLoading ? (
                <Skeleton
                  active
                  style={{ height: "45vh" }}
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Goals outliers</p>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <FaTrophy
                      color="#25a17d"
                      size={22}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">Goal Acheiver(s)</p>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    {goalsAchieversData.length >= 1 ? (
                      <>
                        {goalsAchieversData.map((item, index) => (
                          <Row>
                            <Col span={24}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: 500,
                                    marginBottom: "5px",
                                  }}
                                >
                                  {index + 1 + ")" + " " + item.fullName}
                                </p>

                                {index === 0 && (
                                  <div className="dashboard_trophydiv">
                                    <IoIosTrophy size={16} />
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>

                  <Divider style={{ margin: "14px 0" }} />
                  <div
                    style={{
                      display: "flex",
                      marginTop: "4px",
                    }}
                  >
                    <FaTrophy
                      color="#e93b3a"
                      size={23}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Goal not Acheiver(s)
                    </p>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {notGoalsAchieversData.length >= 1 ? (
                      <>
                        {notGoalsAchieversData.map((item, index) => (
                          <Row>
                            <Col span={24}>
                              <p
                                style={{ fontWeight: 500, marginBottom: "4px" }}
                              >
                                {index + 1 + ")" + " " + item.fullName}
                              </p>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={9}>
            <div className="devices_chartsContainer">
              {filterLoading ? (
                <Skeleton
                  active
                  style={{ height: "45vh" }}
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Productivity outliers</p>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <PiCellSignalHighFill
                      color="#25a17d"
                      size={22}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Most productive Team(s)
                    </p>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    {topProductivityTeams.length >= 1 ? (
                      <>
                        {topProductivityTeams.map((item, index) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>
                                {index + 1 + ")" + " " + item.team_name}
                              </p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  strokeColor="#25a17d"
                                  percent={Math.floor(item.productive_percent)}
                                  format={(percent) => (
                                    <span style={{ color: "#1f1f1f" }}>
                                      {percent}%
                                    </span>
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>

                  <Divider className="productivity_outliersDivider" />
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <PiCellSignalLowFill
                      color="#e93b3a"
                      size={23}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Least productive Team(s)
                    </p>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {leastProductivityTeams.length >= 1 ? (
                      <>
                        {leastProductivityTeams.map((item, index) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>
                                {index + 1 + ")" + " " + item.team_name}
                              </p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  strokeColor="rgba(244, 67, 54, 0.62)"
                                  percent={Math.floor(item.productive_percent)}
                                  format={(percent) => (
                                    <span style={{ color: "#1f1f1f" }}>
                                      {percent}%
                                    </span>
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <div className="devices_chartsContainer">
              {filterLoading ? (
                <Skeleton
                  active
                  style={{ height: "45vh" }}
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Activity outliers</p>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <PiCellSignalHighFill
                      color="#25a17d"
                      size={22}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Most active Team(s)
                    </p>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    {topActivityTeams.length >= 1 ? (
                      <>
                        {topActivityTeams.map((item, index) => (
                          <React.Fragment key={index}>
                            <Row>
                              <Col xs={24} sm={24} md={12} lg={12}>
                                <p style={{ fontWeight: 500 }}>
                                  {index + 1 + ")" + " " + item.team_name}
                                </p>
                              </Col>
                              <Col xs={24} sm={24} md={12} lg={12}>
                                <Flex gap="small" vertical>
                                  <Progress
                                    strokeColor="#25a17d"
                                    percent={Math.floor(item.activeTimePercent)}
                                    format={(percent) => (
                                      <span style={{ color: "#1f1f1f" }}>
                                        {percent}%
                                      </span>
                                    )}
                                  />
                                </Flex>
                              </Col>
                            </Row>
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>

                  <Divider className="productivity_outliersDivider" />

                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <PiCellSignalLowFill
                      color="#e93b3a"
                      size={22}
                      style={{ marginRight: "12px" }}
                    />
                    <p className="mostproductive_heading">
                      Least active Team(s)
                    </p>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {leastActivityTeams.length >= 1 ? (
                      <>
                        {leastActivityTeams.map((item, index) => (
                          <React.Fragment key={index}>
                            <Row>
                              <Col xs={24} sm={24} md={12} lg={12}>
                                <p style={{ fontWeight: 500 }}>
                                  {index + 1 + ")" + " " + item.team_name}
                                </p>
                              </Col>
                              <Col xs={24} sm={24} md={12} lg={12}>
                                <Flex gap="small" vertical>
                                  <Progress
                                    strokeColor="rgba(244, 67, 54, 0.62)"
                                    percent={Math.floor(item.activeTimePercent)}
                                    format={(percent) => (
                                      <span style={{ color: "#1f1f1f" }}>
                                        {percent}%
                                      </span>
                                    )}
                                  />
                                </Flex>
                              </Col>
                            </Row>
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <div style={{ height: "100px" }}>
                        <CommonNodatafound />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={16} style={{ marginBottom: "30px" }}>
        <Col xs={24} sm={24} lg={12} xl={12}>
          <div
            className="devices_chartsContainer"
            style={{ marginTop: "25px" }}
          >
            {filterLoading ? (
              <Skeleton
                active
                title={{ width: 140 }}
                style={{ height: "45vh" }}
                paragraph={{
                  rows: 0,
                }}
              />
            ) : (
              <>
                <p className="devices_chartheading">Productivity Trend</p>
                {productivityTrendData.length >= 1 ? (
                  <ReactApexChart
                    options={productivityTrendLineChartOptions}
                    series={productivityTrendSeries}
                    type="line"
                    height={350}
                  />
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={12}>
          <div
            className="devices_chartsContainer"
            style={{ marginTop: "25px" }}
          >
            {filterLoading ? (
              <Skeleton
                active
                title={{ width: 140 }}
                style={{ height: "45vh" }}
                paragraph={{
                  rows: 0,
                }}
              />
            ) : (
              <>
                <p className="devices_chartheading">Activity Trend</p>
                {activityTrendsData.length >= 1 ? (
                  <ReactApexChart
                    options={activityLineChartOptions}
                    series={activityTrendSeries}
                    type="line"
                    height={350}
                  />
                ) : (
                  <CommonNodatafound />
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
      {/* </>
      )} */}
    </div>
  );
};

export default Dashboard;
