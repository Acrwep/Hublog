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
import { getTeams } from "../../APIservice.js/action";
import ProductivityDetailed from "./ProductivityDetailed";

const Productivity = () => {
  const [activePage, setActivePage] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
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
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);

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
    }
  };

  //onchange functions
  const handleTeam = async (value) => {
    setTeamId(value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      console.log("call function");
    }
  };

  const handleRefresh = () => {
    setTeamId(null);
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
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
          <div style={{ width: "170px" }}>
            <CommonSelectField
              options={teamList}
              placeholder="All Teams"
              onChange={handleTeam}
              value={teamId}
            />
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
          <ProductivitySummary />
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
