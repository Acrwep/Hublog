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
import {
  getAlerts,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import { checkMatchingwithCurrentDate } from "../Common/Validation";
import moment from "moment";

const AlertReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const [organizationId, setOrganizationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [alertData, setAlertData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: "150px",
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
      width: "150px",
      hidden: true,
    },
    {
      title: "Triggered for",
      dataIndex: "triggered",
      key: "triggered",
      width: "150px",
    },
    {
      title: "Triggered time",
      dataIndex: "triggeredTime",
      key: "triggeredTime",
      width: "150px",
      render: (text) => {
        return <p>{moment(text).format("hh:mm A")}</p>;
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
      CommonToaster(error?.response?.data?.message, "error");
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
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    try {
      const response = await getUsers(orgId);
      const allUsers = response?.data;
      setUserList(allUsers);
      setUserId(null);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getAlertsData(orgId);
      }, 350);
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
        getAlertsData(orgId, managerTeamId);
      }, 350);
    }
  };

  const getAlertsData = async (orgId, teamid, userid, triggertime) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      triggeredTime: moment(triggertime ? triggertime : date).format(
        "YYYY-MM-DD"
      ),
    };
    try {
      const response = await getAlerts(payload);
      const alertdata = response?.data;
      console.log("alerts response", alertdata);
      const reverseData = alertdata.reverse();
      setAlertData(reverseData);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setAlertData([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
    setLoading(true);
    getAlertsData(organizationId, teamId, userId, date);
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
      getAlertsData(userIdd, value, organizationId, date);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    setLoading(true);
    getAlertsData(organizationId, teamId, value, date);
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    const today = new Date();
    const isCurrentdate = checkMatchingwithCurrentDate(date);
    if (isCurrentdate && teamId === null && userId === null) {
      return;
    }
    if (isCurrentdate && managerTeamId && userId === null) {
      return;
    }
    setLoading(true);
    setDate(today);
    setUserId(null);
    setUserList(nonChangeUserList);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    getAlertsData(
      organizationId,
      managerTeamId ? parseInt(managerTeamId) : null,
      null,
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
        <p style={{ marginLeft: "12px" }}>Alert Report</p>
      </div>
      <Row className="alerts_calendarContainer">
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
            <div className="devicereport_selectfieldContainers">
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
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ width: "35%" }}>
            <CommonDatePicker onChange={onDateChange} value={date} />
          </div>
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(
                  alertData,
                  columns,
                  `${moment(date).format("DD-MM-YYYY")} Alert Report.csv`
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
          dataSource={alertData}
          loading={loading}
          scroll={{ x: 600 }}
          dataPerPage={10}
          checkBox="false"
          size="small"
        />
      </div>
    </div>
  );
};

export default AlertReport;
