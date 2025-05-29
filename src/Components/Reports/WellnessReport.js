import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import {
  getTeams,
  getUsers,
  getUsersByTeamId,
  getWellnessEmployeeDetails,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import { getCurrentandPreviousweekDate } from "../Common/Validation";

const WellnessReport = () => {
  const navigation = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "fullName",
      key: "fullName",
      width: 220,
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={30} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
      hidden: true,
    },
    {
      title: "Total Present",
      dataIndex: "attendanceCount",
      key: "attendanceCount",
      width: 150,
    },
    {
      title: "Healthy",
      dataIndex: "healthy",
      key: "healthy",
      width: 170,
    },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "overburdened",
      width: 170,
    },
    {
      title: "Underutilized",
      dataIndex: "underutilized",
      key: "underutilized",
      width: 180,
    },
    {
      title: "Healthy%",
      dataIndex: "healthyPercentage",
      key: "healthyPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
    {
      title: "Overburdened%",
      dataIndex: "overburdenedPercentage",
      key: "overburdenedPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
    {
      title: "Underutilized%",
      dataIndex: "underutilizedPercentage",
      key: "underutilizedPercentage",
      width: 170,
      render: (text, record) => {
        if (text === 0) {
          return "0%";
        } else {
          return <p>{text.toFixed(0) + "%"}</p>;
        }
      },
    },
  ];

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
    setLoading(true);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    setOrganizationId(orgId);
    try {
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 500);
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
        getWellnessData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 500);
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
        getWellnessData(
          orgId,
          managerTeamId,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 350);
    }
  };

  const getWellnessData = async (orgId, teamid, userid, startdate, enddate) => {
    setLoading(true);
    const payload = {
      organizationId: parseInt(orgId),
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getWellnessEmployeeDetails(payload);
      console.log("wellness employees response", response);
      const wellnessEmployeesData = response?.data?.employees;
      setTableData(wellnessEmployeesData);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        return;
      }

      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
      getWellnessData(
        organizationId,
        value,
        userIdd,
        selectedDates[0],
        selectedDates[1]
      );
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleDoubleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      console.log("call function");
      getWellnessData(
        organizationId,
        teamId,
        userId,
        dateStrings[0],
        dateStrings[1]
      );
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getWellnessData(
      organizationId,
      teamId,
      value,
      selectedDates[0],
      selectedDates[1]
    );
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
    setLoading(true);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setSelectedDates(PreviousandCurrentDate);
    setUserList(nonChangeUserList);
    getWellnessData(
      organizationId,
      managerTeamId ? parseInt(managerTeamId) : null,
      null,
      PreviousandCurrentDate[0],
      PreviousandCurrentDate[1]
    );
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
        onClick={() => navigation(`/${subdomain}/reports`)}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Wellness Report</p>
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
              value={selectedDates}
              onChange={handleDoubleDateChange}
            />{" "}
          </div>
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(
                  tableData,
                  columns,
                  `Wellness Report ${moment(selectedDates[0]).format(
                    "DD/MM/YYYY"
                  )} to ${moment(selectedDates[1]).format("DD/MM/YYYY")}.csv`
                );
              }}
              disabled={loading ? true : false}
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
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={tableData}
          scroll={{ x: 1400 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          loading={loading}
          size="small"
        />
      </div>
    </div>
  );
};

export default WellnessReport;
