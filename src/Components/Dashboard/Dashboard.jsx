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
} from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { PiCellSignalHighFill, PiCellSignalLowFill } from "react-icons/pi";
import CommonDonutChart from "../Common/CommonDonutChart";
import { LineCharts } from "../chart/RangeChart";
import { MdDashboardCustomize } from "react-icons/md";
import "./styles.css";
import {
  getAttendanceSummary,
  getAttendanceTrends,
  getLeastProductivityTeams,
  getTeams,
  getTopProductivityTeams,
} from "../APIservice.js/action";
import Loader from "../Common/Loader";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import CommonNodatafound from "../Common/CommonNodatafound";
import DashboardChart from "./DashboardChart";
// import { Progress } from 'antd';
// import { DatePicker } from 'antd';

const Dashboard = () => {
  //usestates
  const [todatAttendanceData, setTodatAttendanceData] = useState(null);
  const [todayAttendanceSeries, setTodayAttendanceSeries] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [topProductivityTeams, setTopproductivityTeams] = useState([]);
  const [leastProductivityTeams, setLeastproductivityTeams] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  // Sample data for charts

  const lineData = {
    dates: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-06"],
    present: [40, 30, 35, 50, 40, 35, 10],
    absent: [10, 20, 15, 0, 10, 15, 40],
    attendancePercentage: [80, 65, 70, 75, 85, 70, 65],
    averageWorkingHours: [6.5, 6.7, 7.0, 9, 7.2, 8, 7.1],
  };

  const lineData1 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    // activeTime: [45, 51, 30, 30, 64, 55],
    // idealTime: [35, 41, 20, 19, 44, 45],

    datasets: [
      {
        label: "Active Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Ideal Time",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const lineData2 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    datasets: [
      {
        label: "Productive Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "UnProductive Time",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(0, 0, 0, 1)",
      },
      {
        label: "Natural Time",
        data: [40, 35, 30, 28, 54, 50],
        borderColor: "rgba(0, 0, 255, 1)",
      },
    ],
  };

  var options = {
    series: [
      {
        name: "TEAM A",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: "TEAM B",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: "TEAM C",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    colors: ["#25a17d", "#ABB3B3", "rgba(0,126,241,0.64)"], // Colors for TEAM A, TEAM B, and TEAM C respectively
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Points",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  const series = options.series;

  const productiveTeamsItems = [
    { id: 1, name: "INTERNAL HR", percentage: 90 },
    { id: 2, name: "EXTERNAL HR", percentage: 85 },
    { id: 3, name: "SEO", percentage: 75 },
  ];

  var activityTrend = {
    series: [
      {
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
      {
        name: "Total Visits",
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "Page Statistics",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
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
      const details = response?.data;
      setTodatAttendanceData(details);
      let todaySeries = [];
      todaySeries.push(
        response?.data.presentCount || 0,
        response?.data.absentCount || 0
      );
      setTodayAttendanceSeries(todaySeries);
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      const details = null;
      setTodatAttendanceData(details);
    } finally {
      setTimeout(() => {
        getTopProductivityData(
          teamid ? teamid : null,
          orgId,
          startdate != undefined || startdate != null
            ? startdate
            : PreviousandCurrentDate[0],
          enddate != undefined || enddate != null
            ? enddate
            : PreviousandCurrentDate[1]
        );
      }, 500);
    }
  };

  const getTopProductivityData = async (teamid, orgId, startdate, enddate) => {
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();

    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopProductivityTeams(payload);
      console.log("top productivity response", response);
      const topData = response?.data;
      if (
        topData?.Title ===
        "Conversion failed when converting date and/or time from character string."
      ) {
        setTopproductivityTeams([]);
      } else {
        setTopproductivityTeams(topData);
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopproductivityTeams([]);
    } finally {
      setTimeout(() => {
        getLeastProductivityData(
          teamid ? teamid : null,
          orgId,
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

  const getLeastProductivityData = async (teamid, orgId, stardate, enddate) => {
    const payload = {
      ...(teamid && { teamId: teamid }),
      organizationId: orgId,
      startDate: stardate,
      endDate: enddate,
    };
    try {
      const response = await getLeastProductivityTeams(payload);
      console.log("least productivity response", response);
      const leastData = response?.data;
      if (
        leastData?.Title ===
        "Conversion failed when converting date and/or time from character string."
      ) {
        setLeastproductivityTeams([]);
      } else {
        setLeastproductivityTeams(leastData);
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setLeastproductivityTeams([]);
    } finally {
      setTimeout(() => {
        getSummaryAttendanceTrendsData(teamid, orgId, stardate, enddate);
      }, 300);
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
      console.log("dashboard response", response);
      const details = response?.data;
      if (
        details?.Title ===
        "Conversion failed when converting date and/or time from character string."
      ) {
        setDashboardData([]);
      } else {
        setDashboardData(details);
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setDashboardData([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setFilterLoading(false);
      }, 350);
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
      {loading ? (
        <Loader />
      ) : (
        <>
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

                      <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalactive_timeheading">
                            On time arrivals
                          </p>
                          <p className="totalactive_time">
                            {todatAttendanceData?.onTimeArrivals || 0}
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p className="totalactive_timeheading">
                            Late arrivals
                          </p>
                          <p className="totalactive_time">
                            {todatAttendanceData?.lateArrivals || 0}
                          </p>
                        </Col>
                      </Row>
                      <CommonDonutChart
                        labels={["Present", "Absent"]}
                        colors={["#25a17d", "#ABB3B3"]}
                        series={todayAttendanceSeries}
                        labelsfontSize="17px"
                      />
                    </>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={24} md={17} lg={17}>
                <div className="devices_chartsContainer">
                  {/* <ReactApexChart
                    options={options}
                    series={series}
                    // type="line"
                    height={350}
                  /> */}
                  {filterLoading ? (
                    <div style={{ height: "50vh" }}>
                      <div className="screenshots_spinContainer">
                        <Spin />
                      </div>
                    </div>
                  ) : (
                    <DashboardChart data={dashboardData} />
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "25px" }}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={7} lg={7}>
                <div className="devices_chartsContainer">
                  <p className="devices_chartheading">Achieved goals</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CommonNodatafound />
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={9} lg={9}>
                <div className="devices_chartsContainer">
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
                        {topProductivityTeams.map((item) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>{item.name}</p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  percent={item.workingHourPercentage.toFixed(
                                    2
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <CommonNodatafound />
                    )}
                  </div>

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
                      Least productive Team(s)
                    </p>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {leastProductivityTeams.length >= 1 ? (
                      <>
                        {leastProductivityTeams.map((item) => (
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <p style={{ fontWeight: 500 }}>{item.name}</p>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                              <Flex gap="small" vertical>
                                <Progress
                                  percent={item.workingHourPercentage.toFixed(
                                    2
                                  )}
                                />
                              </Flex>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <CommonNodatafound />
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={9} lg={8}>
                <div className="devices_chartsContainer">
                  <p className="devices_chartheading">Activity outliers</p>
                  {/* <div
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
                    {productiveTeamsItems.map((item) => (
                      <Row>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p style={{ fontWeight: 500 }}>{item.name}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Flex gap="small" vertical>
                            <Progress percent={item.percentage} />
                          </Flex>
                        </Col>
                      </Row>
                    ))}
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CommonNodatafound />
                  </div>

                  {/* <div
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
                  </div> */}
                  {/* <div style={{ marginTop: "15px" }}>
                    {productiveTeamsItems.map((item) => (
                      <Row>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <p style={{ fontWeight: 500 }}>{item.name}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Flex gap="small" vertical>
                            <Progress percent={item.percentage} />
                          </Flex>
                        </Col>
                      </Row>
                    ))}
                  </div> */}
                </div>
              </Col>
            </Row>
          </div>
          <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
            <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:w-full max-sm:p-0">
              <h3 className="mb-3">Activity Trend</h3>
              <div className=" h-72">
                <hr />
                <LineCharts data={lineData1} />
                {/* <ReactApexChart
              options={activityTrend}
              series={series}
              height={350}
            /> */}
              </div>
            </div>
            <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:grid-cols-1 max-sm:p-0">
              <h3 className="mb-3">Productivity Trend</h3>
              <div className="">
                <hr />
                <LineCharts data={lineData2} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
