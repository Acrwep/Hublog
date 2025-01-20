import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import CommonDonutChart from "../../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../../Components/Common/CommonBarChart";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import "../styles.css";
import { useSelector } from "react-redux";
import CommonNodatafound from "../../Common/CommonNodatafound";

const WellnessSummary = ({
  healthyPercentage,
  healthyComparison,
  previousHealthyPercentage,
  workingTime,
  workingTimeComparison,
  previousWorkingtimePercentage,
  healthyEmployeeName,
  healthyEmployeeWorkingtime,
  overburdenedEmployeeName,
  overburdenedEmployeeWorkingtime,
  loading,
}) => {
  const [chartData, setChartData] = useState({
    topHealthy: { labels: [], counts: [] },
    topOverburdened: { labels: [], counts: [] },
    topUnderutilized: { labels: [], counts: [] },
  });
  const OverallWellness = useSelector((state) => state.overallwellness);
  const TopHealthyTeams = useSelector((state) => state.tophealthyteams || []);
  const TopOverburdenedTeams = useSelector(
    (state) => state.topoverburdenedteams || []
  );
  const TopUnderutilizedTeams = useSelector(
    (state) => state.topunderutilizedteams || []
  );

  const teamwiseWellnessData = useSelector((state) => state.teamwisewellness);

  const xasis = teamwiseWellnessData.map((item) => item.teamName);

  const series = [
    {
      name: "Healthy",
      data: teamwiseWellnessData.map((item) => {
        return item.healthy;
      }),
    },
    {
      name: "Overburdened",
      data: teamwiseWellnessData.map((item) => {
        return item.overburdened;
      }),
    },
    {
      name: "Underutilized",
      data: teamwiseWellnessData.map((item) => {
        return item.underutilized;
      }),
    },
  ];

  const barchartColors = ["#25a17d", "rgba(37,143,161,0.90)", "#ABB3B3"];

  useEffect(() => {
    const processData = (teams, key) => {
      const labels = [];
      const counts = [];
      const labelStyles = []; // To store styles for each label

      teams.forEach((item) => {
        labels.push(item.teamName);
        counts.push(item[key]);

        // Add dynamic font size based on label length
        labelStyles.push(item.teamName.length > 10 ? "14px" : "16px");
      });
      return { labels, counts, labelStyles };
    };

    setChartData({
      topHealthy: processData(TopHealthyTeams, "healthy"),
      topOverburdened: processData(TopOverburdenedTeams, "overburdened"),
      topUnderutilized: processData(TopUnderutilizedTeams, "underutilized"),
    });
  }, [TopHealthyTeams, TopOverburdenedTeams, TopUnderutilizedTeams]);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
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
                <p>Healthy employees</p>
                <p className="userproductivity_contents">
                  {healthyPercentage === "-"
                    ? "-"
                    : healthyPercentage === 0
                    ? "0%"
                    : healthyPercentage.toFixed(2) + "%"}
                </p>
                <p className="userproductivity_hours">
                  <span
                    style={{
                      color: healthyComparison.includes("Less Than")
                        ? "rgba(244, 67, 54, 0.82)"
                        : "#25a17d",
                      fontWeight: "bold",
                    }}
                  >
                    {healthyComparison === "No Variation"
                      ? ""
                      : previousHealthyPercentage === "-"
                      ? ""
                      : Math.abs(previousHealthyPercentage).toFixed(0) + "%"}
                  </span>{" "}
                  {healthyComparison.includes("Less Than")
                    ? "Less than previous day"
                    : healthyComparison.includes("Greater Than")
                    ? "Greater than previous day"
                    : "Same as previous day"}
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
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
                <p>Working time</p>
                <p className="userproductivity_contents">{workingTime}</p>
                <p className="userproductivity_hours">
                  <span
                    style={{
                      color: workingTimeComparison.includes("Less Than")
                        ? "rgba(244, 67, 54, 0.82)"
                        : "#25a17d",
                      fontWeight: "bold",
                    }}
                  >
                    {workingTimeComparison === "No Variation"
                      ? ""
                      : previousWorkingtimePercentage === "-"
                      ? ""
                      : Math.abs(previousWorkingtimePercentage).toFixed(0) +
                        "%"}
                  </span>{" "}
                  {workingTimeComparison.includes("Less Than")
                    ? "Less than previous day"
                    : workingTimeComparison.includes("Greater Than")
                    ? "Greater than previous day"
                    : "Same as previous day"}
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
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
                <p>Healthy employee</p>
                <p className="wellness_employeename">
                  {healthyEmployeeName === "" ? "-" : healthyEmployeeName}
                </p>
                <p className="wellness_employeeactivetime">
                  {healthyEmployeeWorkingtime}
                </p>
              </>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            {loading ? (
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
                <p>Overburdened employee</p>
                <p className="wellness_employeename">
                  {overburdenedEmployeeName === ""
                    ? "-"
                    : overburdenedEmployeeName}
                </p>
                <p className="wellness_employeeactivetime">
                  {overburdenedEmployeeWorkingtime}
                </p>
              </>
            )}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              {loading ? (
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
                  <p className="devices_chartheading">Overall Wellness</p>
                  <p className="devices_chartsubheading">
                    Overall Employee count based on their working hours
                  </p>
                  {OverallWellness.length >= 1 ? (
                    <CommonDonutChart
                      labels={["Healthy", "Overburdened", "Underutilized"]}
                      colors={["#25a17d", "rgba(37,143,161,0.90)", "#ABB3B3"]}
                      series={OverallWellness}
                      labelsfontSize="16px"
                      height={300}
                    />
                  ) : (
                    <div>
                      <CommonNodatafound />
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              {loading ? (
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
                  <p className="devices_chartheading">Top Healthy</p>
                  <p className="devices_chartsubheading">
                    Employee count for teams based on their working hours
                  </p>
                  {TopHealthyTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topHealthy.labels}
                      colors={["#25a17d", "#1abc9c", "#20c997"]}
                      series={chartData.topHealthy.counts}
                      labelsfontSize={chartData.topHealthy.labelStyles} // Pass dynamic font sizes
                      height={300}
                    />
                  ) : (
                    <div>
                      <CommonNodatafound />
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              {loading ? (
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
                  <p className="devices_chartheading">Top Overburdened</p>
                  <p className="devices_chartsubheading">
                    Employee count for teams based on their working hours
                  </p>
                  {TopOverburdenedTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topOverburdened.labels}
                      colors={[
                        "rgba(37,143,161,0.90)",
                        " rgba(64,224,208,0.90)",
                        "#7986cb",
                      ]}
                      series={chartData.topOverburdened.counts}
                      labelsfontSize={chartData.topOverburdened.labelStyles} // Pass dynamic font sizes
                      height={300}
                    />
                  ) : (
                    <div>
                      <CommonNodatafound />
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="devices_chartsContainer">
              {loading ? (
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
                  <p className="devices_chartheading">Top Underutilized</p>
                  <p className="devices_chartsubheading">
                    Employee count for teams based on their working hours
                  </p>
                  {TopUnderutilizedTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topUnderutilized.labels}
                      // labels={["Branch Operation", "SEO", "jkgjk"]}
                      colors={["#ABB3B3", "#F5BD7D", "#90a4ae"]}
                      // series={[1, 3, 4]}
                      series={chartData.topUnderutilized.counts}
                      labelsfontSize={chartData.topUnderutilized.labelStyles} // Pass dynamic font sizes
                      height={300}
                    />
                  ) : (
                    <div>
                      <CommonNodatafound />
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          {loading ? (
            <div style={{ height: "45vh" }}>
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
              <p className="devices_chartheading">Team Wise Utilization</p>
              <CommonBarChart
                xasis={xasis}
                series={series}
                colors={barchartColors}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessSummary;
