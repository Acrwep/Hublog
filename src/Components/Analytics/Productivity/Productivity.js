import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { MdRocketLaunch } from "react-icons/md";
import "../styles.css";
import ProductivitySummary from "./ProductivitySummary";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Common/CommonDoubleDatePicker";
import { getCurrentandPreviousweekDate } from "../../Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  getProductivityBreakdown,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../../APIservice.js/action";
import ProductivityDetailed from "./ProductivityDetailed";
import { useDispatch } from "react-redux";
import { storeProductivityBreakdown } from "../../Redux/slice";

const Productivity = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [breakdownTotalDuration, setBreakdownTotalDuration] = useState("");
  const [breakdownAverageTime, setBreakdownAverageTime] = useState("");
  const [isBreakdownEmpty, setIsBreakdownEmpty] = useState(false);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState(null);

  const handlePageChange = (pageNumber) => {
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    }
    getBreakdownData(
      organizationId,
      teamId,
      selectedDates[0],
      selectedDates[1],
      pageNumber
    );
    setActivePage(pageNumber);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    setOrganizationId(orgId);

    try {
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      console.log("teams error", error);
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getBreakdownData(
          orgId,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1],
          activePage
        );
      }, 500);
    }
  };

  const parseTimeToDecimal = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

  const getBreakdownData = async (
    orgId,
    teamid,
    startDate,
    endDate,
    pageNumber
  ) => {
    if (pageNumber === 1) {
      setSummaryLoading(true);
      const payload = {
        organizationId: orgId,
        ...(teamid && { teamId: teamid }),
        fromDate: startDate,
        toDate: endDate,
      };
      try {
        const response = await getProductivityBreakdown(payload);
        const breakdowndata = response?.data;
        console.log("breakdown response", breakdowndata);
        const [hours, minutes] =
          breakdowndata.totalProductiveDuration.split(":");
        setBreakdownTotalDuration(`${hours}h ${minutes}m`);
        const [avgHours, avgMinutes] =
          breakdowndata.averageDuratiopn.split(":");
        setBreakdownAverageTime(`${avgHours}h ${avgMinutes}m`);
        dispatch(
          storeProductivityBreakdown([
            parseTimeToDecimal(breakdowndata.totalProductiveDuration),
            parseTimeToDecimal(breakdowndata.totalNeutralDuration),
            parseTimeToDecimal(breakdowndata.totalUnproductiveDuration),
          ])
        );
        if (
          breakdowndata.totalProductiveDuration === "00:00:00" &&
          breakdowndata.totalNeutralDuration === "00:00:00" &&
          breakdowndata.totalUnproductiveDuration === "00:00:00"
        ) {
          setIsBreakdownEmpty(true);
        } else {
          setIsBreakdownEmpty(false);
        }
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeProductivityBreakdown([]));
        setIsBreakdownEmpty(true);
      } finally {
        setTimeout(() => {
          setSummaryLoading(false);
        }, 300);
      }
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
      getBreakdownData(
        organizationId,
        value,
        selectedDates[0],
        selectedDates[1],
        activePage
      );
    } catch (error) {
      setUserList([]);
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleUser = (value) => {
    setUserId(value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      getBreakdownData(
        organizationId,
        teamId,
        dateStrings[0],
        dateStrings[1],
        activePage
      );
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
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    } else {
      setTeamId(null);
      setUserId(null);
      setUserList(nonChangeUserList);
      setSelectedDates(PreviousandCurrentDate);
      getBreakdownData(
        organizationId,
        null,
        PreviousandCurrentDate[0],
        PreviousandCurrentDate[1],
        activePage
      );
    }
  };
  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <MdRocketLaunch size={20} />
            </div>
            <h2 className="allpage_mainheadings">Productivity</h2>
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
              <CommonDoubleDatePicker
                value={selectedDates}
                onChange={handleDateChange}
              />
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
          <ProductivitySummary
            breakdownTotalDuration={breakdownTotalDuration}
            breakdownAverageTime={breakdownAverageTime}
            isBreakdownEmpty={isBreakdownEmpty}
            loading={summaryLoading}
          />
        </div>
      ) : (
        <div>
          <ProductivityDetailed />
        </div>
      )}
    </div>
  );
};

export default Productivity;
