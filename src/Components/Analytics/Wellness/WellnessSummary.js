import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import CommonDonutChart from "../../../Components/Common/CommonDonutChart";
import CommonBarChart from "../../../Components/Common/CommonBarChart";
import "../styles.css";
import { useSelector } from "react-redux";
import CommonNodatafound from "../../Common/CommonNodatafound";

const WellnessSummary = ({
  healthyPercentage,
  workingTime,
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
      teams.forEach((item) => {
        labels.push(item.teamName);
        counts.push(item[key]);
      });
      return { labels, counts };
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
                <p className="userproductivity_contents">{healthyPercentage}</p>
                {/* <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "bold" }}>
                16.66%
              </span>{" "}
              Less than previous day
            </p> */}
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
                {/* <p className="userproductivity_hours">
              <span style={{ color: "#25a17d", fontWeight: "bold" }}>
                16.66%
              </span>{" "}
              Less than previous day
            </p> */}
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
                    Distribution between offline and online devices.
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
                    Distribution between offline and online devices.
                  </p>
                  {TopHealthyTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topHealthy.labels}
                      colors={["#258ea1", "#5976B3", "#25a17d"]}
                      series={chartData.topHealthy.counts}
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
                  <p className="devices_chartheading">Top Overburdened</p>
                  <p className="devices_chartsubheading">
                    Distribution between offline and online devices.
                  </p>
                  {TopOverburdenedTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topOverburdened.labels}
                      colors={["#258ea1", "#EA87C0", "#25a17d"]}
                      series={chartData.topOverburdened.counts}
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
                  <p className="devices_chartheading">Top Underutilized</p>
                  <p className="devices_chartsubheading">
                    Distribution between offline and online devices.
                  </p>
                  {TopUnderutilizedTeams.length >= 1 ? (
                    <CommonDonutChart
                      labels={chartData.topUnderutilized.labels}
                      colors={["#5976B3", "#25a17d", "#F5BD7D"]}
                      series={chartData.topUnderutilized.counts}
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
