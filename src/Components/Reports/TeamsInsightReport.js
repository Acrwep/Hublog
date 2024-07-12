import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Collapse } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import { FiAward } from "react-icons/fi";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { Progress } from "antd";

const TeamsInsightReport = () => {
  const navigation = useNavigate();
  const { Panel } = Collapse;
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div
        className="reports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Teams Insight Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField options={teamList} placeholder="All Teams" />
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          <div style={{ width: "30%" }}>
            <CommonDatePicker onChange={onDateChange} value={date} />
          </div>
          <Tooltip placement="top" title="Download">
            <Button className="dashboard_download_button">
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={12}>
          <Collapse defaultActiveKey={["1"]}>
            <Panel
              className="teamreport_accordionheading"
              header="Internal HR"
              key="1"
            >
              <div className="teamreport_accordionContainer">
                <p className="teamreport_prsnText">Present - 14</p>
                <p className="teamreport_absnText">Absent - 6</p>
                <p className="teamreport_workingHrs">
                  <span style={{ fontWeight: "400" }}>Working Hours -</span>{" "}
                  09h:58m:31s
                </p>

                <div className="teamreport_pogessbarContainer">
                  <p style={{ marginRight: "12px" }}>Acvitity</p>
                  <Progress strokeLinecap="butt" percent={50} status="active" />
                </div>
                <div className="teamreport_topuserheaderContainer">
                  <FiAward
                    size={20}
                    color="#f79e3a"
                    style={{ marginRight: "4px" }}
                  />
                  <p>Top users</p>
                </div>
                <Row gutter={16} style={{ marginTop: "10px" }}>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Users</p>
                      <p className="teamreport_topuserName">
                        RAGAVI R Operation
                      </p>
                      <p className="teamreport_topuserName">
                        Divya R Operation
                      </p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Activity %</p>
                      <p className="teamreport_topuserName">90.4</p>
                      <p className="teamreport_topuserName">90.4</p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Working time</p>
                      <p className="teamreport_topuserName">05h:43m:35s</p>
                      <p className="teamreport_topuserName">05h:43m:35s</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Col>

        <Col xs={24} sm={24} md={6} lg={12}>
          <Collapse>
            <Panel
              className="teamreport_accordionheading"
              header="Operation"
              key="1"
            >
              <div className="teamreport_accordionContainer">
                <p className="teamreport_prsnText">Present - 14</p>
                <p className="teamreport_absnText">Absent - 6</p>
                <p className="teamreport_workingHrs">
                  <span style={{ fontWeight: "400" }}>Working Hours -</span>{" "}
                  09h:58m:31s
                </p>

                <div className="teamreport_pogessbarContainer">
                  <p style={{ marginRight: "12px" }}>Acvitity</p>
                  <Progress strokeLinecap="butt" percent={50} status="active" />
                </div>

                <div className="teamreport_topuserheaderContainer">
                  <FiAward
                    size={20}
                    color="#f79e3a"
                    style={{ marginRight: "4px" }}
                  />
                  <p>Top users</p>
                </div>
                <Row gutter={16} style={{ marginTop: "10px" }}>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Users</p>
                      <p className="teamreport_topuserName">
                        RAGAVI R Operation
                      </p>
                      <p className="teamreport_topuserName">
                        Divya R Operation
                      </p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Activity %</p>
                      <p className="teamreport_topuserName">90.4</p>
                      <p className="teamreport_topuserName">90.4</p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <p className="teamreport_topusers">Working time</p>
                      <p className="teamreport_topuserName">05h:43m:35s</p>
                      <p className="teamreport_topuserName">05h:43m:35s</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default TeamsInsightReport;
