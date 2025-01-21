import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import "./styles.css";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";
import CommonNodatafound from "../Common/CommonNodatafound";

const AttendanceSummary = ({ loading }) => {
  const [date, setDate] = useState(new Date());
  const summaryData = useSelector((state) => state.attendancesummary);
  const todayAttendanceData = useSelector((state) => state.todayattendance);
  const attendanceActivityLevelData = useSelector(
    (state) => state.attendanceactivitylevel
  );
  const lateArrivalData = useSelector((state) => state.latearrival);
  const attendanceBreakTrendsData = useSelector(
    (state) => state.attendancebreaktrends
  );

  //usestates
  const [attendancePercentage, setAttendancePercentage] = useState("");
  const [lateArrivalPercentage, setLateArrivalPercentage] = useState("");
  const [totalBreaktime, setTotalBreakTime] = useState("");
  const [totalWorkingtime, setTotalWorkingtime] = useState("");
  const [todayOntimeArrival, setTodayOntimeArrival] = useState(null);
  const [todayLateArrival, setTodayLateArrival] = useState(null);

  const todayAttendanceSeries = [
    parseInt(todayAttendanceData?.presentCount || 0),
    parseInt(todayAttendanceData?.absentCount || 0),
  ];

  const attendanceActivityLevelXasis = attendanceActivityLevelData.map((a) =>
    moment(a.attendanceDate).format("DD/MM/YYYY")
  );

  const lateArrivalXasis = lateArrivalData.map((l) =>
    moment(l.attendanceDate).format("DD/MM/YYYY")
  );

  const attendanceActivityLevelSeries = [
    {
      name: "Present",
      data: attendanceActivityLevelData.map((item) => {
        return item?.presentCount || 0;
      }),
    },
    {
      name: "Absent",
      data: attendanceActivityLevelData.map((item) => {
        return item?.absentCount || 0;
      }),
    },
  ];
  const attendanceTrendsColors = ["#25a17d", "#ABB3B3"];

  const lateArrivalSeries = [
    {
      name: "On time arrivals",
      data: lateArrivalData.map((item) => {
        return item?.onTimeArrival || 0;
      }),
    },
    {
      name: "Late arrivals",
      data: lateArrivalData.map((item) => {
        return item?.lateArrival || 0;
      }),
    },
  ];

  const convertTimeToDecimal = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  // Map the response data to x-axis and y-axis data
  const breakTrendsXais = attendanceBreakTrendsData.map((item) =>
    moment(item.breakDate).format("DD-MM-YYYY")
  ); // Get the date only
  const breakTrendsYaxis = attendanceBreakTrendsData.map((item) =>
    convertTimeToDecimal(item.breakDuration)
  );

  const breakTrendsChart = {
    series: [
      {
        name: "Break Time",
        data: breakTrendsYaxis, // Converted break hours in decimal format
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: breakTrendsXais, // Dates from response
        title: {
          text: "Break Date",
        },
        labels: {
          show: true,
          rotateAlways: attendanceBreakTrendsData.length >= 6 ? true : false, // Ensure rotation is applied
          rotate: -45, // Rotate labels by -40 degrees
          color: ["#ffffff"],
          style: {
            fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
          },
        },
        trim: true,
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        labels: {
          formatter: function (val) {
            return `${Math.floor(val)}h`; // Display values as whole hours like 0h, 1h
          },
        },
        forceNiceScale: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            const hours = Math.floor(val);
            const minutes = Math.round((val - hours) * 60);
            return `${hours}h:${minutes}m`; // Format as "0h:1m"
          },
        },
        style: {
          fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
        },
      },
      colors: ["#25a17d"], // Customize color if needed
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    setTodayOntimeArrival(todayAttendanceData?.onTimeArrivals);
    setTodayLateArrival(todayAttendanceData?.lateArrivals);
    setAttendancePercentage(summaryData?.attendancePercentage);
    setLateArrivalPercentage(summaryData?.lateArrivals);
    if (summaryData?.totalBreakTime) {
      setTotalBreakTime(
        moment(summaryData.totalBreakTime, "HH:mm:ss").format(
          "HH[h]:mm[m]:ss[s]"
        )
      );
    } else {
      setTotalBreakTime("00h:00m");
    }
    if (summaryData?.totalWorkingTime) {
      setTotalWorkingtime(
        moment(summaryData.totalWorkingTime, "HH:mm:ss").format(
          "HH[h]:mm[m]:ss[s]"
        )
      );
    } else {
      setTotalWorkingtime("-");
    }
  }, [loading]);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <div style={{ padding: "6px 0px" }}>
                <Skeleton
                  active
                  paragraph={{
                    rows: 1,
                  }}
                  className="attendancesummary_cardskeleton"
                />
              </div>
            ) : (
              <>
                <p style={{ color: "#25a17d", fontWeight: "500" }}>
                  Attendance %
                </p>
                <p className="attendancesummary_percentage">
                  {attendancePercentage}%
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <div style={{ padding: "6px 0px" }}>
                <Skeleton
                  active
                  paragraph={{
                    rows: 1,
                  }}
                  className="attendancesummary_cardskeleton"
                />
              </div>
            ) : (
              <>
                <p style={{ color: "#e93b3a", fontWeight: "500" }}>
                  Late Arrivals
                </p>
                <p className="attendancesummary_percentage">
                  {lateArrivalPercentage}%
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <div style={{ padding: "6px 0px" }}>
                <Skeleton
                  active
                  paragraph={{
                    rows: 1,
                  }}
                  className="attendancesummary_cardskeleton"
                />
              </div>
            ) : (
              <>
                <p style={{ fontWeight: "500" }}>Break time</p>
                <p className="attendancesummary_percentage">{totalBreaktime}</p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
              <div style={{ padding: "6px 0px" }}>
                <Skeleton
                  active
                  paragraph={{
                    rows: 1,
                  }}
                  className="attendancesummary_cardskeleton"
                />
              </div>
            ) : (
              <>
                <p style={{ fontWeight: "500" }}>Working time</p>
                <p className="attendancesummary_percentage">
                  {totalWorkingtime}
                </p>
              </>
            )}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={7} lg={7}>
            <div className="devices_chartsContainer">
              {loading ? (
                <div style={{ height: "50vh" }}>
                  <Skeleton
                    active
                    title={{ width: 170 }}
                    paragraph={{
                      rows: 0,
                    }}
                  />
                </div>
              ) : (
                <>
                  <p className="devices_chartheading">Today's Attendance</p>

                  <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p className="totalactive_timeheading">
                        On time arrivals
                      </p>
                      <p className="totalactive_time">{todayOntimeArrival}</p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p className="totalactive_timeheading">Late arrivals</p>
                      <p className="totalactive_time">{todayLateArrival}</p>
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
              {loading ? (
                <Skeleton
                  active
                  title={{ width: 190 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">
                    Activity Level Breakdown
                  </p>
                  <CommonBarChart
                    xasis={attendanceActivityLevelXasis}
                    series={attendanceActivityLevelSeries}
                    colors={attendanceTrendsColors}
                    chartArray={attendanceActivityLevelData}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={16} style={{ marginTop: "25px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            {loading ? (
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
                <p className="devices_chartheading">Break Trends</p>
                {attendanceBreakTrendsData.length >= 1 ? (
                  <ReactApexChart
                    options={breakTrendsChart.options}
                    series={breakTrendsChart.series}
                    type="line"
                    height={300}
                  />
                ) : (
                  <div style={{ height: "100%" }}>
                    <CommonNodatafound />
                  </div>
                )}
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            {loading ? (
              <Skeleton
                active
                title={{ width: 190 }}
                paragraph={{
                  rows: 0,
                }}
              />
            ) : (
              <>
                <p className="devices_chartheading">Late Arrival Tendency</p>
                {lateArrivalData.length >= 1 ? (
                  <CommonBarChart
                    xasis={lateArrivalXasis}
                    series={lateArrivalSeries}
                    colors={["#25a17d", "#ABB3B3"]}
                  />
                ) : (
                  <div style={{ height: "100%" }}>
                    <CommonNodatafound />
                  </div>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AttendanceSummary;
