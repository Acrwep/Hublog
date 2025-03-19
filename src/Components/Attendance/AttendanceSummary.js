import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import "./styles.css";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";
import CommonNodatafound from "../Common/CommonNodatafound";

const AttendanceSummary = ({
  latePercentage,
  attendancePercentage,
  totalWorkingtime,
  totalBreakDuration,
  loading,
}) => {
  const attendanceActivityLevelData = useSelector(
    (state) => state.attendanceactivitylevel
  );
  const todayAttendanceData = useSelector((state) => state.todayattendance);
  const lateArrivalData = useSelector((state) => state.attendancelatetendency);
  const attendanceBreakTrendsData = useSelector(
    (state) => state.attendancebreaktrends
  );

  const todayAttendanceSeries = [
    parseInt(todayAttendanceData?.attendanceSummaries[0].presentCount || 0),
    parseInt(todayAttendanceData?.attendanceSummaries[0].absentCount || 0),
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
        toolbar: {
          show: false, // Show toolbar (can be set to false to hide all)
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

  const lateTendencyChartOptions = {
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
      categories: lateArrivalXasis,
      labels: {
        show: true,
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
          return `<span style="margin-left: -6px; font-family:Poppins, sans-serif;">${val}</span>`;
        },
      },
      style: {
        fontFamily: "Poppins, sans-serif", // Change font family of y-axis labels
      },
    },
    colors: ["#25a17d", "#8a8c8c"], // Different colors for the three series
  };

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
                  {!attendancePercentage
                    ? "-"
                    : attendancePercentage === "-"
                    ? "-"
                    : attendancePercentage === 0
                    ? "0%"
                    : attendancePercentage.toFixed(0) + "%"}
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
                  {latePercentage ? latePercentage.toFixed(0) + "%" : "-"}
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
                <p className="attendancesummary_percentage">
                  {totalBreakDuration ? totalBreakDuration : "-"}
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
                <p style={{ fontWeight: "500" }}>Working time</p>
                <p className="attendancesummary_percentage">
                  {totalWorkingtime ? totalWorkingtime : "-"}
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

                  {/* <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
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
                  </Row> */}
                  <div className="attendance_todayattendance_chartcontainer">
                    <CommonDonutChart
                      labels={["Present", "Absent"]}
                      colors={["#25a17d", "#ABB3B3"]}
                      series={todayAttendanceSeries}
                      labelsfontSize="16px"
                      height={300}
                    />
                  </div>
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
                  <ReactApexChart
                    options={lateTendencyChartOptions}
                    series={lateArrivalSeries}
                    type="line"
                    height={350}
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
