import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV";
import CommonAvatar from "../Common/CommonAvatar";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { CommonToaster } from "../Common/CommonToaster";
import {
  getDailyAttendanceReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { IoArrowDownOutline, IoArrowUp } from "react-icons/io5";
import moment from "moment";

const DailyAttendanceReport = () => {
  const navigation = useNavigate();

  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: 140,
      fixed: "left",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={26} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Team Name",
      dataIndex: "team_Name",
      key: "team_Name",
      width: 150,
      hidden: true,
    },
    {
      title: "In",
      dataIndex: "inTime",
      key: "inTime",
      width: 100,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoArrowDownOutline style={{ marginRight: "6px" }} size={16} />
            <p>{moment(text).format("hh:mm A")}</p>
          </div>
        );
      },
    },
    {
      title: "Out",
      dataIndex: "out",
      key: "out",
      width: 100,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoArrowUp style={{ marginRight: "6px" }} size={16} />
            <p>{moment(text).format("hh:mm A")}</p>
          </div>
        );
      },
    },
    {
      title: "Working time",
      dataIndex: "totalTime",
      key: "totalTime",
      width: 110,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        }
        return <p>{moment(text).format("HH[h]:mm[m]:ss[s]")}</p>;
      },
    },
    {
      title: "Online time",
      dataIndex: "onlineTime",
      key: "onlineTime",
      width: 110,
      render: (text, record) => {
        const [date, time] = text.split("T"); // Split date and time
        const [hours, minutes, seconds] = time.split(":"); // Split time into h, m, s
        return `${hours}h:${minutes}m:${seconds}s`;
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      width: 100,
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
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    try {
      setOrganizationId(orgId);
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
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setNonChangeUserList(users);
      setUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getDailyAttendanceData(userId, teamId, orgId, date);
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");

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
        getDailyAttendanceData(userId, managerTeamId, orgId, date);
      }, 350);
    }
  };

  const getDailyAttendanceData = async (user, team, orgId, selectedDate) => {
    setLoading(true);
    const payload = {
      ...(user && { userId: user }),
      ...(team && { teamId: team }),
      organizationId: parseInt(orgId),
      date: moment(selectedDate).format("YYYY-MM-DD"),
    };

    try {
      const response = await getDailyAttendanceReport(payload);
      console.log("daily attendance report response", response.data);

      const ReportData = response.data;
      setData(ReportData);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        return;
      }

      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
      getDailyAttendanceData(userIdd, value, organizationId, date);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const onDateChange = (value) => {
    setDate(value);
    getDailyAttendanceData(userId, teamId, organizationId, value);
  };

  const handleUser = (value) => {
    setUserId(value);
    getDailyAttendanceData(value, teamId, organizationId, date);
  };

  const handleRefresh = () => {
    const today = new Date();
    const managerTeamId = localStorage.getItem("managerTeamId");

    const givenDate = new Date(date);
    let isDateChange = false;
    if (
      today.getFullYear() === givenDate.getFullYear() &&
      today.getMonth() === givenDate.getMonth() &&
      today.getDate() === givenDate.getDate()
    ) {
      isDateChange = false;
    } else {
      isDateChange = true;
    }

    if (isDateChange === false && teamId === null && userId === null) {
      return;
    }
    if (isDateChange === false && managerTeamId && userId === null) {
      return;
    }
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setDate(today);
    setUserList(nonChangeUserList);
    getDailyAttendanceData(
      null,
      managerTeamId ? parseInt(managerTeamId) : null,
      organizationId,
      today
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
        className="dailyreports_backContainer"
        onClick={() => navigation(`/${subdomain}/reports`)}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Daily Attendance Report</p>
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
          <div style={{ width: "30%" }}>
            <CommonDatePicker onChange={onDateChange} value={date} />
          </div>
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(
                  data,
                  columns,
                  `${moment(date).format(
                    "DD-MM-YYYY"
                  )} Daily Attendance Report.csv`
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
          dataSource={data}
          scroll={{ x: 700 }}
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

export default DailyAttendanceReport;
