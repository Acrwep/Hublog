import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../../components/Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../../components/Common/CommonDonutChart";
import CommonBarChart from "../../components/Common/CommonBarChart";
import { MdRocketLaunch } from "react-icons/md";
import DownloadTableAsXLSX from "../../components/Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../../components/Common/CommonSelectField";
import CommonDoubleDatePicker from "../../components/Common/CommonDoubleDatePicker";

const Productivity = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [{ id: 1, name: "Operation" }];

  const OverallWellness = [15, 6];
  const TopHealthy = [10, 20, 40];
  const TopOverburdened = [20, 40, 30];
  const TopUnderutilized = [80, 20, 40];

  const xasis = [
    "SEO",
    "External HR",
    "Internal HR",
    "Branch Operation",
    "Quality",
    "Operation",
    "Sales",
  ];

  const series = [
    {
      name: "Productive time",
      data: [2.72, 4.42, 5.5, 6.58, 7.5, 5.0, 3.5], // Representing hours and minutes in decimal format
    },
    {
      name: "Unproductive time",
      data: [3.0, 3.5, 2.5, 3.75, 3.0, 2.5, 4.25],
    },
    {
      name: "Neutral",
      data: [2.17, 1.83, 1.83, 2.75, 2.67, 1.67, 2.08],
    },
  ];

  const barchartColors = ["#25a17d", "#e93b3a", "#94acb7"];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  return (
    <div className="alerts_mainContainer">
      <div className="flex">
        <div className="userdetail_iconContainer">
          <MdRocketLaunch size={22} />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Productivity
        </h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              {/* <CommonDatePicker onChange={onDateChange} value={date} /> */}
              <CommonDoubleDatePicker />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Productivity</p>
            <p className="userproductivity_contents">41.69%</p>
            <p className="userproductivity_hours">388h:49m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Application</p>
            <p className="userproductivity_contents">Chrome</p>
            <p className="userproductivity_hours">346h:32m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top URL</p>
            <p className="userproductivity_contents">
              https://web.whatsapppppp
            </p>
            <p className="userproductivity_hours">174h:42m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Category</p>
            <p className="userproductivity_contents">Internet</p>
            <p className="userproductivity_hours">661h:44m</p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "25px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Productivity Breakdown</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["Healthy", "Overburdened"]}
                colors={["#25a17d", "#e93b3a"]}
                series={OverallWellness}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Healthy</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["External HR", "SEO", "Quality"]}
                colors={["#8c499c", "#f6c614", "#009ddb"]}
                series={TopHealthy}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Overburdened</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["External HR", "Sales", "Quality"]}
                colors={["#8c499c", "#d1b052", "#009ddb"]}
                series={TopOverburdened}
                labelsfontSize="17px"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="devices_chartsContainer">
              <p className="devices_chartheading">Top Underutilized</p>
              <p className="devices_chartsubheading">
                Distribution between offline and online devices.
              </p>
              <CommonDonutChart
                labels={["SEO", "Quality", "Branch Operation"]}
                colors={["#f6c614", "#009ddb", "#d470f7"]}
                series={TopUnderutilized}
                labelsfontSize="17px"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="devices_chartsContainer">
          <p className="devices_chartheading">Team Wise Utilization</p>
          <CommonBarChart
            xasis={xasis}
            series={series}
            colors={barchartColors}
            timebased={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Productivity;
