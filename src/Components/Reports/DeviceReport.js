import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import {
  getSystemInfo,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import Loader from "../Common/Loader";
import { CommonToaster } from "../Common/CommonToaster";

const DeviceReport = () => {
  const navigation = useNavigate();
  //usestates
  const [organizationId, setOrganizationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const platformList = [
    { id: "w", name: "Windows" },
    { id: "m", name: "Mac" },
    { id: "l", name: "Linux" },
  ];
  const [platformId, setPlatformId] = useState(null);
  const systemList = [
    { id: "64", name: "x64" },
    { id: "86", name: "x86" },
  ];
  const [systemId, setSystemId] = useState(null);
  const [devicesData, setDevicesData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [tableLoading, setTableloading] = useState(true);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      fixed: "left",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={28} itemName={text} />
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
      title: "Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Device ID",
      dataIndex: "deviceId",
      key: "deviceId",
      width: 260,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      width: 160,
      render: (text, record) => {
        if (text === "WinUI") {
          return <p>Windows</p>;
        } else {
          return <p>Mac</p>;
        }
      },
    },
    {
      title: "OS Name",
      dataIndex: "osName",
      key: "osName",
    },
    {
      title: "OS Build",
      dataIndex: "osBuild",
      key: "osBuild",
    },
    {
      title: "System Type",
      dataIndex: "systemType",
      key: "systemType",
      width: 140,
    },
    {
      title: "IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 140,
    },
    {
      title: "Hublog Version",
      dataIndex: "hublogVersion",
      key: "hublogVersion",
      width: 140,
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
    setTeamId(null);
    setUserId(null);
    setPlatformId(null);
    setSystemId(null);
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
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const allUsers = response?.data;
      setUserList(allUsers);
      setUserId(null);
      setNonChangeUserList(allUsers);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getDeviceData(orgId);
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
        getDeviceData(orgId, managerTeamId);
      }, 350);
    }
  };

  const getDeviceData = async (orgId, teamid, userid, platform, system) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      ...(platform && { platformSearchQuery: platform }),
      ...(system && { systemTypeSearchQuery: system }),
    };
    try {
      const response = await getSystemInfo(payload);
      const devicedata = response?.data;
      console.log("devices response", devicedata);
      if (devicedata.systemInfoList.length >= 1) {
        setDevicesData(devicedata.systemInfoList);
      } else {
        setDevicesData([]);
      }
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setDevicesData([]);
    } finally {
      setTimeout(() => {
        setTableloading(false);
      }, 300);
    }
  };

  //handle onchange functions
  const handleTeam = async (value) => {
    setTeamId(value);
    setTableloading(true);
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
      setTimeout(() => {
        getDeviceData(organizationId, value, userIdd, platformId, systemId);
      }, 300);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setTableloading(true);
    setUserId(value);
    getDeviceData(organizationId, teamId, value, platformId, systemId);
  };

  const handlePlatform = (value) => {
    setTableloading(true);
    setPlatformId(value);
    getDeviceData(organizationId, teamId, userId, value, systemId);
  };

  const handleSystemType = (value) => {
    setTableloading(true);
    setSystemId(value);
    getDeviceData(organizationId, teamId, userId, platformId, value);
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (
      teamId === null &&
      userId === null &&
      platformId === null &&
      systemId === null
    ) {
      return;
    }
    if (
      managerTeamId &&
      userId === null &&
      platformId === null &&
      systemId === null
    ) {
      return;
    }
    setTableloading(true);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserList(nonChangeUserList);
    setUserId(null);
    setPlatformId(null);
    setSystemId(null);
    getDeviceData(
      organizationId,
      managerTeamId ? parseInt(managerTeamId) : null,
      null,
      null,
      null
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
        <p style={{ marginLeft: "12px" }}>Device Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={22} lg={22}>
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
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField
                options={platformList}
                placeholder="Platform"
                onChange={handlePlatform}
                value={platformId}
              />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField
                options={systemList}
                placeholder="System Type"
                onChange={handleSystemType}
                value={systemId}
              />
            </div>
            {/* <div className="devicereport_selectfieldContainers">
              <CommonSelectField options={userList} placeholder="App Type" />
            </div>
            <div className="devicereport_selectfieldContainers">
              <CommonSelectField
                options={userList}
                placeholder="Hublog version"
              />
            </div> */}
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={2}
          lg={2}
          className="breakreports_calendarContainer"
        >
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(devicesData, columns, `Device Report.csv`);
              }}
              disabled={tableLoading ? true : false}
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

      <div className="breakreport_tableContainer" style={{ marginTop: "20px" }}>
        <CommonTable
          columns={columns}
          dataSource={devicesData}
          scroll={{ x: 1600 }}
          dataPerPage={10}
          loading={tableLoading}
          size="small"
          checkBox="false"
          bordered="false"
        />
      </div>
    </div>
  );
};

export default DeviceReport;
