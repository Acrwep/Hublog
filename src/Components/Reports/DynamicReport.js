import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import {
  Row,
  Col,
  Button,
  Tooltip,
  Collapse,
  Checkbox,
  Modal,
  Spin,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import {
  getDynamicDetailedReport,
  getDynamicReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import {
  descriptionValidator,
  getCurrentandPreviousweekDate,
} from "../Common/Validation";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import "./styles.css";
import DownloadDynamicReport from "./DownloadDynamicReport";

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
  const [reportData, setReportData] = useState([]);
  const [reportName, setReportName] = useState("");
  const [reportNameError, setReportNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationTrigger, setValidationTrigger] = useState(false);
  const [isManager, setIsManager] = useState(false);
  //userinfo useStates
  const [firstNameStatus, setFirstNameStatus] = useState(true);
  const [lastNameStatus, setLastNameStatus] = useState(true);
  const [employeeIdStatus, setEmployeeIdStatus] = useState(true);
  const [emailStatus, setEmailStatus] = useState(true);
  const [teamNameStatus, setTeamNameStatus] = useState(false);
  const [attendanceDateStatus, setAttendanceDateStatus] = useState(false);
  // workingtime useStates
  const [totalWorkingtimeStatus, setTotalWorkingtimeStatus] = useState(true);
  const [totalOnlinetimeStatus, setTotalOnlinetimeStatus] = useState(true);
  const [totalBreaktimeStatus, setTotalBreaktimeStatus] = useState(true);
  const [averageBreaktimeStatus, setAverageBreaktimeStatus] = useState(false);
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
  const [initialLoading, setInitialLoading] = useState(true);
  const [subdomain, setSubdomain] = useState("");
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
              onChange={(e) => setAverageBreaktimeStatus(e.target.checked)}
              checked={averageBreaktimeStatus}
              disabled={activePage === 2 ? true : false}
            >
              Average Break time
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
    const managerTeamId = localStorage.getItem("managerTeamId");
    const getSubDomainfromLocal = localStorage.getItem("subDomain");
    setSubdomain(getSubDomainfromLocal);
    if (managerTeamId) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    setOrganizationId(orgId);
    try {
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      console.log("teams error", error);
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 300);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
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
    } finally {
      setTimeout(() => {
        getDynamicReportData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 300);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setUserId(null);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      setUserList([]);
      setNonChangeUserList([]);
    } finally {
      setTimeout(() => {
        getDynamicReportData(
          orgId,
          managerTeamId,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 350);
    }
  };

  const getDynamicReportData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate
  ) => {
    setLoading(true);
    const payload = {
      OrganizationId: orgId,
      ...(teamid && { TeamId: teamid }),
      ...(userid && { UserId: userid }),
      StartDate: startDate,
      EndDate: endDate,
      FirstName: firstNameStatus,
      LastName: lastNameStatus,
      EmployeeId: employeeIdStatus,
      Email: emailStatus,
      TeamName: teamNameStatus,
      Manager: false,
      PunchIntime: false,
      PunchOuttime: false,
      TotalWorkingtime: totalWorkingtimeStatus,
      TotalOnlinetime: totalOnlinetimeStatus,
      TotalBreaktime: totalBreaktimeStatus,
      AverageBreaktime: averageBreaktimeStatus,
      TotalActivetime: totalActivetimeStatus,
      ActivitePercent: activityPercentStatus,
      AverageActivetime: averageActivetimeStatus,
      TotalIdletime: totalIdletimeStatus,
      AverageIdletime: averageIdletimeStatus,
      TotalProductivetime: totalProductivetimeStatus,
      ProductivityPercent: productivePercentStatus,
      AverageProductivetime: averageProductivetimeStatus,
      Totalunproductivetime: totalUnproductivetimeStatus,
      Averageunproductivetime: averageUnproductivetimeStatus,
      Totalneutraltime: totalNeutraltimeStatus,
      Averageneutraltime: averageNeutraltimeStatus,
    };
    try {
      const response = await getDynamicReport(payload);
      console.log("dynamic report response", response);
      setReportData(response.data);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setInitialLoading(false);
      }, 300);
    }
  };

  const getDynamicDetailedReportData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate
  ) => {
    setLoading(true);
    const payload = {
      OrganizationId: orgId,
      ...(teamid && { TeamId: teamid }),
      ...(userid && { UserId: userid }),
      StartDate: startDate,
      EndDate: endDate,
      FirstName: firstNameStatus,
      LastName: lastNameStatus,
      EmployeeId: employeeIdStatus,
      Email: emailStatus,
      TeamName: teamNameStatus,
      Manager: false,
      PunchIntime: punchIntimeStatus,
      PunchOuttime: punchOuttimeStatus,
      TotalWorkingtime: totalWorkingtimeStatus,
      TotalOnlinetime: totalOnlinetimeStatus,
      TotalBreaktime: totalBreaktimeStatus,
      AverageBreaktime: false,
      TotalActivetime: totalActivetimeStatus,
      ActivitePercent: activityPercentStatus,
      AverageActivetime: false,
      TotalIdletime: totalIdletimeStatus,
      AverageIdletime: false,
      TotalProductivetime: totalProductivetimeStatus,
      ProductivityPercent: productivePercentStatus,
      AverageProductivetime: false,
      Totalunproductivetime: totalUnproductivetimeStatus,
      Averageunproductivetime: false,
      Totalneutraltime: totalNeutraltimeStatus,
      Averageneutraltime: false,
    };
    try {
      const response = await getDynamicDetailedReport(payload);
      console.log("dynamic detailed report response", response);
      setReportData(response.data);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const columns = [
    {
      title: "Attendance Date",
      dataIndex: "Date",
      key: "Date",
      status: attendanceDateStatus,
    },
    {
      title: "Employee Id",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      status: employeeIdStatus,
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
      status: firstNameStatus,
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
      status: lastNameStatus,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      status: emailStatus,
    },
    {
      title: "Team Name",
      dataIndex: "TeamName",
      key: "TeamName",
      status: teamNameStatus,
    },
    {
      title: "Punch In Time",
      dataIndex: "PunchIntime",
      key: "PunchIntime",
      status: punchIntimeStatus,
    },
    {
      title: "Punch Out Time",
      dataIndex: "PunchOuttime",
      key: "PunchOuttime",
      status: punchOuttimeStatus,
    },
    {
      title: "Total Working Time",
      dataIndex: "TotalWorkingtime",
      key: "TotalWorkingtime",
      status: totalWorkingtimeStatus,
    },
    {
      title: "Total Online Time",
      dataIndex: "TotalOnlinetime",
      key: "TotalOnlinetime",
      status: totalOnlinetimeStatus,
    },
    {
      title: "Total Break Time",
      dataIndex: "TotalBreaktime",
      key: "TotalBreaktime",
      status: totalBreaktimeStatus,
    },
    {
      title: "Average Break Time",
      dataIndex: "AverageBreaktime",
      key: "AverageBreaktime",
      status: averageBreaktimeStatus,
    },
    {
      title: "Total Active Time",
      dataIndex: "TotalActivetime",
      key: "TotalActivetime",
      status: totalActivetimeStatus,
    },
    {
      title: "Activity Percent",
      dataIndex: "ActivitePercent",
      key: "ActivitePercent",
      status: activityPercentStatus,
    },
    {
      title: "Average Active Time",
      dataIndex: "AverageActivetime",
      key: "AverageActivetime",
      status: averageActivetimeStatus,
    },
    {
      title: "Total Idle Time",
      dataIndex: "TotalIdletime",
      key: "TotalIdletime",
      status: totalIdletimeStatus,
    },
    {
      title: "Average Idle Time",
      dataIndex: "AverageIdletime",
      key: "AverageIdletime",
      status: averageIdletimeStatus,
    },
    {
      title: "Total Productive Time",
      dataIndex: "Total_Productivetime",
      key: "Total_Productivetime",
      status: totalProductivetimeStatus,
    },
    {
      title: "Productivity Percent",
      dataIndex: "Productivity_Percent",
      key: "Productivity_Percent",
      status: productivePercentStatus,
    },
    {
      title: "Average Productive Time",
      dataIndex: "Average_Productivetime",
      key: "Average_Productivetime",
      status: averageProductivetimeStatus,
    },
    {
      title: "Total Neutral Time",
      dataIndex: "Total_neutraltime",
      key: "Total_neutraltime",
      status: totalNeutraltimeStatus,
    },
    {
      title: "Average Neutral Time",
      dataIndex: "Average_neutraltime",
      key: "Average_neutraltime",
      status: averageNeutraltimeStatus,
    },
    {
      title: "Total Unproductive Time",
      dataIndex: "Total_unproductivetime",
      key: "Total_unproductivetime",
      status: totalUnproductivetimeStatus,
    },
    {
      title: "Average Unproductive Time",
      dataIndex: "Average_unproductivetime",
      key: "Average_unproductivetime",
      status: averageUnproductivetimeStatus,
    },
  ];
  //onchange functions
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    if (
      (pageNumber === 1 && activePage === 1) ||
      (pageNumber === 2 && activePage === 2)
    ) {
      return;
    }
    if (pageNumber === 1) {
      setPunchIntimeStatus(false);
      setPunchOuttimeStatus(false);
      setAttendanceDateStatus(false);
      getDynamicReportData(
        organizationId,
        teamId,
        userId,
        selectedDates[0],
        selectedDates[1]
      );
    }
    if (pageNumber === 2) {
      setAttendanceDateStatus(true);
      setAverageBreaktimeStatus(false);
      setAverageActivetimeStatus(false);
      setAverageIdletimeStatus(false);
      setAverageProductivetimeStatus(false);
      setAverageNeutraltimeStatus(false);
      setAverageUnproductivetimeStatus(false);
      getDynamicDetailedReportData(
        organizationId,
        teamId,
        userId,
        selectedDates[0],
        selectedDates[1]
      );
    }
  };

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
    setSelectedDates(dateString); // Update the state when the date changes
    if (dateString[0] != "" && dateString[1] != "") {
    }
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");
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
    }
    if (
      managerTeamId &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }
    setActivePage(1);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setUserList(nonChangeUserList);
    setSelectedDates(PreviousandCurrentDate);
    //checkbox handling
    setFirstNameStatus(true);
    setLastNameStatus(true);
    setEmployeeIdStatus(true);
    setEmailStatus(true);
    setTeamNameStatus(false);
    setTotalWorkingtimeStatus(true);
    setTotalOnlinetimeStatus(true);
    setTotalBreaktimeStatus(true);
    setAverageBreaktimeStatus(false);
    setPunchIntimeStatus(false);
    setPunchOuttimeStatus(false);
    setTotalActivetimeStatus(true);
    setActivityPercentStatus(true);
    setAverageActivetimeStatus(false);
    setTotalIdletimeStatus(false);
    setAverageIdletimeStatus(false);
    setTotalProductivetimeStatus(true);
    setProductivePercentStatus(true);
    setAverageProductivetimeStatus(false);
    setTotalNeutraltimeStatus(false);
    setAverageNeutraltimeStatus(false);
    setTotalUnproductivetimeStatus(false);
    setAverageUnproductivetimeStatus(false);
  };

  const handleDownload = () => {
    if (activePage === 1) {
      getDynamicReportData(
        organizationId,
        teamId,
        userId,
        selectedDates[0],
        selectedDates[1]
      );
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    } else {
      getDynamicDetailedReportData(
        organizationId,
        teamId,
        userId,
        selectedDates[0],
        selectedDates[1]
      );
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setReportName("");
    setReportNameError("");
    // setValidationTrigger(false);
  };

  const handleOk = () => {
    setValidationTrigger(true);
    const reportNameValidate = descriptionValidator(reportName);
    setReportNameError(reportNameValidate);

    if (reportNameValidate) return;

    const enableColumns = columns.filter((f) => f.status === true);
    console.log("enableColumns", enableColumns);
    DownloadDynamicReport(
      reportData,
      enableColumns,
      `${reportName} ${moment(selectedDates[0]).format(
        "DD/MM/YYYY"
      )} to ${moment(selectedDates[1]).format("DD/MM/YYYY")}.csv`
    );
    setTimeout(() => {
      setIsModalOpen(false);
      setReportName("");
      setReportNameError("");
    }, 350);
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
                  ? "productivity_activedetailedbutton"
                  : "productivity_detailedbutton"
              }
              onClick={() => handlePageChange(2)}
              disabled={initialLoading ? true : false}
            >
              Detailed
            </Button>
          </div>
        </Col>
      </Row>
      <div
        className="reports_backContainer"
        onClick={() => navigation(`/${subdomain}/reports`)}
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
                disabled={isManager}
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
      <div
        className="dynamicreport_accordionmainContainer"
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        <Collapse
          defaultActiveKey={["1", "2", "3", "4"]}
          onChange={handleAccordion}
          items={items}
          size="small"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        />
        <div
          className={
            loading
              ? "dynamicreport_loaderContainer"
              : "dynamicreport_disableloaderContainer"
          }
        >
          <Spin />
        </div>
      </div>
      <button
        className="dynamicreport_downloadbutton"
        onClick={handleDownload}
        disabled={loading ? true : false}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        Download Report
      </button>

      <Modal
        title="Download Report"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button className="designation_submitbutton" onClick={handleOk}>
            Submit
          </button>,
        ]}
      >
        <CommonInputField
          label="Report Name"
          onChange={(e) => {
            setReportName(e.target.value);
            if (validationTrigger) {
              setReportNameError(descriptionValidator(e.target.value));
            }
          }}
          value={reportName}
          error={reportNameError}
          style={{ marginTop: "22px" }}
          mandatory
        />
      </Modal>
    </div>
  );
}
