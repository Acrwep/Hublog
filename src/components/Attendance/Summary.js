import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CommonDonutChart from "../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import "./styles.css";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import CommonNodatafound from "../Common/CommonNodatafound";
import AttendanceSummaryLoader from "./AttendanceSummaryLoader";

const Summary = ({ loading }) => {
  const [date, setDate] = useState(new Date());
  const summaryData = useSelector((state) => state.attendancesummary);
  const todayAttendanceData = useSelector((state) => state.todayattendance);
  const attendanceTrendsData = useSelector(
    (state) => state.summaryattendancetrends
  );
  const lateArrivalData = useSelector((state) => state.latearrival);
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

  const attendanceTrendsXasis = attendanceTrendsData.map((a) =>
    moment(a.attendanceDate).format("DD/MM/YYYY")
  );

  const lateArrivalXasis = lateArrivalData.map((l) =>
    moment(l.attendanceDate).format("DD/MM/YYYY")
  );

  const attendanceTrendsSeries = [
    {
      name: "Present",
      data: attendanceTrendsData.map((item) => {
        return item?.presentCount || 0;
      }),
    },
    {
      name: "Absent",
      data: attendanceTrendsData.map((item) => {
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

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  const datas = {
    series: [
      {
        name: "Active Time",
        data: [65, 59, 80, 81, 56, 55],
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
        categories: [
          "2024-02-01",
          "2024-02-02",
          "2024-02-03",
          "2024-02-04",
          "2024-02-05",
          "2024-02-06",
        ],
        title: {
          text: "",
        },
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        forceNiceScale: true,
      },
      colors: ["#25a17d", "#F44336"], // Blue for Active Time, Red for Idle Time
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
        moment(summaryData.totalBreakTime, "HH:mm:ss").format("HH[h]:mm[m]")
      );
    } else {
      setTotalBreakTime("00h:00m");
    }
    if (summaryData?.totalWorkingTime) {
      setTotalWorkingtime(
        moment(summaryData.totalWorkingTime, "HH:mm:ss").format("HH[h]:mm[m]")
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
              <AttendanceSummaryLoader />
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
              <AttendanceSummaryLoader />
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
              <AttendanceSummaryLoader />
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
              <AttendanceSummaryLoader />
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
              <p className="devices_chartheading">Today's Attendance</p>

              <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <p className="totalactive_timeheading">On time arrivals</p>
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
            </div>
          </Col>

          <Col xs={24} sm={24} md={17} lg={17}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Activity Level Breakdown</p>
              <CommonBarChart
                xasis={attendanceTrendsXasis}
                series={attendanceTrendsSeries}
                colors={attendanceTrendsColors}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={16} style={{ marginTop: "25px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Break Trends</p>
            <ReactApexChart
              options={datas.options}
              series={datas.series}
              type="line"
              height={300}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Late Arrival Tendency</p>
            {lateArrivalData.length >= 1 ? (
              <CommonBarChart
                xasis={lateArrivalXasis}
                series={lateArrivalSeries}
                colors={["#25a17d", "#ABB3B3"]}
              />
            ) : (
              <CommonNodatafound />
            )}
          </div>
        </Col>
      </Row>
      {/* <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Team Wise Utilization</p>
          <CommonBarChart
            xasis={xasis}
            series={series}
            colors={barchartColors}
            timebased="true"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Summary;
