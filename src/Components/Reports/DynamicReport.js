import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Collapse, Checkbox } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { getTeams, getUsers, getUsersByTeamId } from "../APIservice.js/action";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import "./styles.css";

export default function DynamicReport() {
  const navigation = useNavigate();
  const [organizationId, setOrganizationId] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const headerStyle = {
    fontWeight: 600,
  };

  const renderUserInformation = () => {
    return (
      <div className="dynamicreport_accordionbody_container">
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox onChange={handleCheckbox}>First Name</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox onChange={handleCheckbox}>Last Name</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox onChange={handleCheckbox}>Employee ID</Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox onChange={handleCheckbox}>Email</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox onChange={handleCheckbox}>Team Name</Checkbox>
          </Col>
        </Row>
      </div>
    );
  };

  const handleCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const items = [
    {
      key: "1",
      label: <div style={headerStyle}>User Information</div>,
      children: renderUserInformation(),
    },
    {
      key: "2",
      label: <div style={headerStyle}>Working Time</div>,
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: <div style={headerStyle}>Activity</div>,
      children: <p>{text}</p>,
    },
    {
      key: "4",
      label: <div style={headerStyle}>Productivity</div>,
      children: <p>{text}</p>,
    },
  ];

  const handleAccordion = (key) => {
    console.log(key);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
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
        getUsersData();
      }, 300);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setUserList(users);
      setNonChangeUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  //onchange functions
  const handlePageChange = (pageNumber) => {
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    }
    setActivePage(pageNumber);
  };

  const handleTeam = async (value) => {
    setTeamId(value);
    setLoading(true);
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
    setLoading(true);
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDates(dateString); // Update the state when the date changes
    if (dateString[0] != "" && dateString[1] != "") {
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
      setLoading(true);
      setTeamId(null);
      setUserId(null);
      setUserList(nonChangeUserList);
      setSelectedDates(PreviousandCurrentDate);
    }
  };

  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <TbReport size={20} />
            </div>
            <h2 className="allpage_mainheadings">Reports</h2>
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
              disabled={loading ? true : false}
            >
              Detailed
            </Button>
          </div>
        </Col>
      </Row>
      <div
        className="reports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Dynamic Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
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
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                placeholder="Select User"
                onChange={handleUser}
                value={userId}
              />
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
          <div>
            <CommonDoubleDatePicker
              onChange={onDateChange}
              value={selectedDates}
            />{" "}
          </div>
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              // onClick={() => {
              //   DownloadTableAsXLSX(
              //     data,
              //     columns,
              //     `${moment(date).format("DD-MM-YYYY")} Break Report.xlsx`
              //   );
              // }}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button
              className="dashboard_refresh_button"
              onClick={handleRefresh}
            >
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Collapse
        defaultActiveKey={["1", "2", "3", "4"]}
        onChange={handleAccordion}
        items={items}
        size="small"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      />
    </div>
  );
}
