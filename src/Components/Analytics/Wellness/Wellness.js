import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, DatePicker } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { GiLotus } from "react-icons/gi";
import "../styles.css";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonDatePicker from "../../Common/CommonDatePicker";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../../APIservice.js/action";
import { dayJs } from "../../Utils";
import WellnessSummary from "./WellnessSummary";
import WellnessDetailed from "./WellnessDetailed";
import moment from "moment";

const Wellness = () => {
  const [activePage, setActivePage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(dayJs().subtract(0, "month"));
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState();
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [organizationId, setOrganizationId] = useState(null);

  const handlePageChange = (pageNumber) => {
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    }
    setActivePage(pageNumber);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setDate(new Date());
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      console.log("teams error", error);
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 500);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setUserList(users);
      setNonChangeUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      const currentMonthName = moment().format("MMMM"); // get current month name
      const currentYear = moment().year(); // get current year
      setMonthName(currentMonthName);
      setYear(currentYear);
    }
  };

  //onchange functions
  const handleTeam = async (value) => {
    setTeamId(value);
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
      }

      setUserList(teamMembersList);
      setUserId(null);
    } catch (error) {
      setUserList([]);
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleUser = (value) => {
    setUserId(value);
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  const handleMonthChange = (date, dateString) => {
    // Log the date and formatted date string
    setMonth(date);
    // If a date is selected, format it to get the month name and log it
    if (date) {
      const selectedMonthName = date.format("MMMM");
      const selectedYear = date.format("YYYY");
      console.log("Selected Month:", selectedMonthName, selectedYear);
      setMonthName(selectedMonthName);
      setYear(selectedYear);
    }
  };

  const getMonthName = (date) => {
    if (date) {
      return date.format("MMMM");
    }
    return "";
  };

  const disabledDate = (current) => {
    // Disable all future dates
    return current && current > dayJs().endOf("month");
  };

  const handleRefresh = () => {
    const today = new Date();
    const givenDate = new Date(date);
    const currentMonthName = moment().format("MMMM");
    const currentYear = moment().year();
    let isDateChange = false;
    let isMonthChange = false;

    if (
      today.getFullYear() === givenDate.getFullYear() &&
      today.getMonth() === givenDate.getMonth() &&
      today.getDate() === givenDate.getDate()
    ) {
      isDateChange = false;
    } else {
      isDateChange = true;
    }
    if (currentMonthName === monthName && currentYear === year) {
      isMonthChange = false;
    } else {
      isMonthChange = true;
    }

    if (
      isDateChange === false &&
      isMonthChange === false &&
      teamId === null &&
      userId === null
    ) {
      return;
    } else {
      setTeamId(null);
      setUserId(null);
      setDate(new Date());
      setMonth(dayJs());
      setMonthName(currentMonthName);
      setYear(currentYear);
      setUserList(nonChangeUserList);
    }
  };
  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <GiLotus size={20} />
            </div>
            <h2 className="allpage_mainheadings">Wellness</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="productivity_tabbuttonContainer">
            <Button
              className={
                activePage === 1
                  ? "productivity_activesummarybutton"
                  : "productivity_summarybutton"
              }
              onClick={() => handlePageChange(1)}
            >
              Summary
            </Button>
            <Button
              className={
                activePage === 2
                  ? "productivity_activedetailedbutton "
                  : "productivity_detailedbutton"
              }
              onClick={() => handlePageChange(2)}
            >
              Detailed
            </Button>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField
                options={teamList}
                placeholder="All Teams"
                onChange={handleTeam}
                value={teamId}
              />
            </div>
            {activePage === 2 ? (
              <div style={{ width: "170px" }}>
                <CommonSelectField
                  options={userList}
                  placeholder="Select User"
                  onChange={handleUser}
                  value={userId}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              {activePage === 1 ? (
                <CommonDatePicker onChange={onDateChange} value={date} />
              ) : (
                <DatePicker
                  picker="month"
                  onChange={handleMonthChange}
                  value={month}
                  format={getMonthName}
                  disabledDate={disabledDate}
                  allowClear={false}
                />
              )}
            </div>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
                onClick={handleRefresh}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      {activePage === 1 ? (
        <div>
          <WellnessSummary />
        </div>
      ) : (
        <div>
          <WellnessDetailed />
        </div>
      )}
    </div>
  );
};

export default Wellness;
