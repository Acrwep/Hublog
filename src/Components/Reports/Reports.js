import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { FiCoffee, FiActivity } from "react-icons/fi";
import {
  TbAppsFilled,
  TbDeviceDesktopMinus,
  TbReportSearch,
  TbReport,
} from "react-icons/tb";
import { TbClockCancel } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";
import { BiSolidBell } from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MdFreeBreakfast, MdCalendarMonth } from "react-icons/md";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { MdAccessTimeFilled, MdDynamicFeed } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import "./styles.css";

const Reports = () => {
  const navigation = useNavigate();
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    const getSubDomainfromLocal = localStorage.getItem("subDomain");
    setSubdomain(getSubDomainfromLocal);
  }, []);

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontWeight: "500", color: "gray" }}>Attendance</p>
        <Row gutter={16} className="reports_rowcontainer">
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/breakreports`)}
            >
              <div className="reports_iconContainer">
                <FiCoffee size={26} />
              </div>
              <p className="reports_cardheading">Break Report</p>
              <p className="reports_cardcontent">
                Download reports of breaks taken by your employees
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/dailyattendancereport`)}
            >
              <div className="reports_dailyiconContainer">
                <MdAccessTimeFilled size={26} />
              </div>
              <p className="reports_cardheading">Daily Attendance</p>
              <p className="reports_cardcontent">
                Download reports of daily attendance of your organisation
                including punch-in and punch-out timing
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() =>
                navigation(`/${subdomain}/monthlyattendancereport`)
              }
            >
              <div className="reports_monthlyiconContainer">
                <MdCalendarMonth size={26} />
              </div>
              <p className="reports_cardheading">Monthly Attendance</p>
              <p className="reports_cardcontent">
                Download reports of monthly attendance of your organisation
                including punch-in and punch-out timing
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/monthlyinandoutreport`)}
            >
              <div className="reports_inouticonContainer">
                <PiArrowsLeftRightBold size={26} />
              </div>
              <p className="reports_cardheading">Monthly In-Out</p>
              <p className="reports_cardcontent">
                Download reports of monthly In out attendance of your
                organisation including punch-in and punch-out timing
              </p>
            </div>
          </Col>
        </Row>

        <Row
          gutter={16}
          className="reports_rowcontainer"
          style={{ marginTop: "22px" }}
        >
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/lateattendancereport`)}
            >
              <div className="reports_lateiconContainer">
                <TbClockCancel size={26} />
              </div>
              <p className="reports_cardheading">Late Attendance Report</p>
              <p className="reports_cardcontent">
                Download reports of late attendance of your organisation
                including punch-in and lateby timing
              </p>
            </div>
          </Col>
        </Row>

        <p className="reports_headings">Analytics</p>
        <Row gutter={16} className="reports_rowcontainer">
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/appsurlsreport`)}
            >
              <div className="reports_appsiconContainer">
                <TbAppsFilled size={26} />
              </div>
              <p className="reports_cardheading">Apps/URLs report</p>
              <p className="reports_cardcontent">
                Download the detailed application/URL usage report for your
                organisation
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/activityreport`)}
            >
              <div className="reports_activityiconContainer">
                <FiActivity size={26} />
              </div>
              <p className="reports_cardheading">Activity Report</p>
              <p className="reports_cardcontent">
                Download the Activity report for your organisation
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/productivityreport`)}
            >
              <div className="reports_producticonContainer">
                <BsFillRocketTakeoffFill size={26} />
              </div>
              <p className="reports_cardheading">Productivity Report</p>
              <p className="reports_cardcontent">
                Download the Productivity report for your organisation
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/wellnessreport`)}
            >
              <div className="reports_wellnessiconContainer">
                <GiLotus size={26} />
              </div>
              <p className="reports_cardheading">Wellness Report</p>
              <p className="reports_cardcontent">
                Download the Wellness report for your organisation
              </p>
            </div>
          </Col>
          {/* <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation("/teamsinsightreport")}
            >
              <div className="reports_teamsiconContainer">
                <FaUsersLine size={26} />
              </div>
              <p className="reports_cardheading">Teams Insight</p>
              <p className="reports_cardcontent">
                View the team wise insights for your organisation including key
                indicators and outliers
              </p>
            </div>
          </Col> */}
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          {/* <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation("/logsreport")}
            >
              <div className="reports_logsiconContainer">
                <TbReportSearch size={26} />
              </div>
              <p className="reports_cardheading">Logs Report</p>
              <p className="reports_cardcontent">
                View and download the detailed logs of application usage and
                website visits for comprehensive insights into employee
                activity.
              </p>
            </div>
          </Col> */}
        </Row>
        <p className="reports_headings">Others</p>
        <Row gutter={16} className="reports_rowcontainer ">
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/alertreport`)}
            >
              <div className="reports_alerticonContainer">
                <BiSolidBell size={26} />
              </div>
              <p className="reports_cardheading">Alert Report</p>
              <p className="reports_cardcontent">
                View and download reports of all triggered alerts for your
                organisation.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/projectreport`)}
            >
              <div className="reports_projecticonContainer">
                <FaBusinessTime size={26} />
              </div>
              <p className="reports_cardheading">Project Report</p>
              <p className="reports_cardcontent">
                View and download reports of all projects for your organisation.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/devicereport`)}
            >
              <div className="reports_deviceiconContainer">
                <TbDeviceDesktopMinus size={26} />
              </div>
              <p className="reports_cardheading">Device Report</p>
              <p className="reports_cardcontent">
                Download the comprehensive devices report of your organisation
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div
              className="reports_card"
              onClick={() => navigation(`/${subdomain}/dynamicreport`)}
            >
              <div className="reports_dynamiciconContainer">
                <MdDynamicFeed size={26} />
              </div>
              <p className="reports_cardheading">Dynamic Report</p>
              <p className="reports_cardcontent">
                Customise, save and download reports of the key indicators and
                metrics of your organisation.{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
