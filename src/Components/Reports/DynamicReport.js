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
  //userinfo useStates
  const [firstNameStatus, setFirstNameStatus] = useState(true);
  const [lastNameStatus, setLastNameStatus] = useState(true);
  const [employeeIdStatus, setEmployeeIdStatus] = useState(true);
  const [emailStatus, setEmailStatus] = useState(true);
  const [teamNameStatus, setTeamNameStatus] = useState(false);
  // workingtime useStates
  const [totalWorkingtimeStatus, setTotalWorkingtimeStatus] = useState(true);
  const [totalOnlinetimeStatus, setTotalOnlinetimeStatus] = useState(true);
  const [totalBreaktimeStatus, setTotalBreaktimeStatus] = useState(true);
  const [averageWorkingtimeStatus, setAverageWorkingtimeStatus] =
    useState(false);
  const [punchIntimeStatus, setPunchIntimeStatus] = useState(false);
  const [punchOuttimeStatus, setPunchOuttimeStatus] = useState(false);
  //activity useStates
  const [totalActivetimeStatus, setTotalActivetimeStatus] = useState(true);
  const [activityPercentStatus, setActivityPercentStatus] = useState(true);
  const [averageActivetimeStatus, setAverageActivetimeStatus] = useState(false);
  const [totalIdletimeStatus, setTotalIdletimeStatus] = useState(false);
  const [averageIdletimeStatus, setAverageIdletimeStatus] = useState(false);
  //productivity useStates
  const [totalProductivetimeStatus, setTotalProductivetimeStatus] =
    useState(true);
  const [productivePercentStatus, setProductivePercentStatus] = useState(true);
  const [averageProductivetimeStatus, setAverageProductivetimeStatus] =
    useState(false);
  const [totalNeutraltimeStatus, setTotalNeutraltimeStatus] = useState(false);
  const [averageNeutraltimeStatus, setAverageNeutraltimeStatus] =
    useState(false);
  const [totalUnproductivetimeStatus, setTotalUnproductivetimeStatus] =
    useState(false);
  const [averageUnproductivetimeStatus, setAverageUnproductivetimeStatus] =
    useState(false);
  const [loading, setLoading] = useState(false);

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
            <Checkbox
              onChange={(e) => setFirstNameStatus(e.target.checked)}
              checked={firstNameStatus}
            >
              First Name
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setLastNameStatus(e.target.checked)}
              checked={lastNameStatus}
            >
              Last Name
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setEmployeeIdStatus(e.target.checked)}
              checked={employeeIdStatus}
            >
              Employee ID
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setEmailStatus(e.target.checked)}
              checked={emailStatus}
            >
              Email
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTeamNameStatus(e.target.checked)}
              checked={teamNameStatus}
            >
              Team Name
            </Checkbox>
          </Col>
        </Row>
      </div>
    );
  };

  const renderWorkingTime = () => {
    return (
      <div className="dynamicreport_accordionbody_container">
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalWorkingtimeStatus(e.target.checked)}
              checked={totalWorkingtimeStatus}
            >
              Total Working time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalOnlinetimeStatus(e.target.checked)}
              checked={totalOnlinetimeStatus}
            >
              Total Online time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalBreaktimeStatus(e.target.checked)}
              checked={totalBreaktimeStatus}
            >
              Total Break time
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setAverageWorkingtimeStatus(e.target.checked)}
              checked={averageWorkingtimeStatus}
            >
              Average Working time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setPunchIntimeStatus(e.target.checked)}
              checked={punchIntimeStatus}
              disabled={activePage === 1 ? true : false}
            >
              Punch In time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setPunchOuttimeStatus(e.target.checked)}
              checked={punchOuttimeStatus}
              disabled={activePage === 1 ? true : false}
            >
              Punch Out time
            </Checkbox>
          </Col>
        </Row>
      </div>
    );
  };

  const renderActivity = () => {
    return (
      <div className="dynamicreport_accordionbody_container">
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalActivetimeStatus(e.target.checked)}
              checked={totalActivetimeStatus}
            >
              Total Active time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setActivityPercentStatus(e.target.checked)}
              checked={activityPercentStatus}
            >
              Activity Percent
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setAverageActivetimeStatus(e.target.checked)}
              checked={averageActivetimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Active time
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalIdletimeStatus(e.target.checked)}
              checked={totalIdletimeStatus}
            >
              Total Idle time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setAverageIdletimeStatus(e.target.checked)}
              checked={averageIdletimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Idle time
            </Checkbox>
          </Col>
        </Row>
      </div>
    );
  };

  const renderProductivity = () => {
    return (
      <div className="dynamicreport_accordionbody_container">
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalProductivetimeStatus(e.target.checked)}
              checked={totalProductivetimeStatus}
            >
              Total Productive time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setProductivePercentStatus(e.target.checked)}
              checked={productivePercentStatus}
            >
              Productivity Percent
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setAverageProductivetimeStatus(e.target.checked)}
              checked={averageProductivetimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Productive time
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalNeutraltimeStatus(e.target.checked)}
              checked={totalNeutraltimeStatus}
            >
              Total Neutral time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setAverageNeutraltimeStatus(e.target.checked)}
              checked={averageNeutraltimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Neutral time
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) => setTotalUnproductivetimeStatus(e.target.checked)}
              checked={totalUnproductivetimeStatus}
            >
              Total Unproductive time
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Checkbox
              onChange={(e) =>
                setAverageUnproductivetimeStatus(e.target.checked)
              }
              checked={averageUnproductivetimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Unproductive time
            </Checkbox>
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
      children: renderWorkingTime(),
    },
    {
      key: "3",
      label: <div style={headerStyle}>Activity</div>,
      children: renderActivity(),
    },
    {
      key: "4",
      label: <div style={headerStyle}>Productivity</div>,
      children: renderProductivity(),
    },
  ];

  const handleAccordion = (key) => {
    console.log(key);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
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
          {/* <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(
                  data,
                  columns,
                  `${moment(date).format("DD-MM-YYYY")} Break Report.csv`
                );
              }}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip> */}
          <Tooltip placement="top" title="Refresh">
            <Button
              className="dashboard_refresh_button"
              onClick={handleRefresh}
              style={{ marginLeft: "12px" }}
            >
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      {/* <div className="dynamicreport_headingContainer">
        <p>Filter</p>
      </div> */}
      <div className="dynamicreport_accordionmainContainer">
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
      <button className="dynamicreport_downloadbutton">Download Report</button>
    </div>
  );
}
