import React, { useState, useEffect } from "react";
import { PiDevicesBold } from "react-icons/pi";
import { Col, Row, Tooltip, Button } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../Common/CommonDonutChart";
import "./styles.css";
import {
  getDeviceInfo,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";
import { CommonToaster } from "../Common/CommonToaster";
import CommonAvatar from "../Common/CommonAvatar";
import Loader from "../Common/Loader";

const Devices = () => {
  //usestates
  const [organizationId, setOrganizationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const platformList = [
    { id: "w", name: "Windows" },
    { id: "m", name: "Mac" },
  ];
  const [platformId, setPlatformId] = useState(null);
  const systemList = [
    { id: "64", name: "x64" },
    { id: "86", name: "x86" },
  ];
  const [systemId, setSystemId] = useState(null);
  const [devicesData, setDevicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableloading] = useState(false);

  const onlineDeviceCount = 70;
  const offlineDeviceCount = 30;
  const series = [onlineDeviceCount, offlineDeviceCount];

  const platformchartDatas = [80, 20];

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar
              avatarSize={31}
              itemName={text}
              avatarfontSize="15px"
            />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
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
      width: 150,
    },
    {
      title: "IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 160,
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.ip - b.ip,
    },
  ];

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
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
      const usersList = response?.data;

      setUserList(usersList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getDeviceData(orgId);
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
      const response = await getDeviceInfo(payload);
      const devicedata = response?.data;
      console.log("devices response", devicedata);
      setDevicesData(devicedata);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
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
        getDeviceData(organizationId, value, userId, platformId, systemId);
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
    if (
      teamId === null &&
      userId === null &&
      platformId === null &&
      systemId === null
    ) {
      return;
    } else {
      setTableloading(true);
      setTeamId(null);
      setUserId(null);
      setPlatformId(null);
      setSystemId(null);
      getDeviceData(organizationId, null, null, null, null);
    }
  };

  return (
    <div
      className="settings_mainContainer"
      // style={{ opacity: tableLoading ? 0.5 : 1 }}
    >
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <PiDevicesBold size={20} />
        </div>
        <h2 className="allpage_mainheadings">Devices</h2>
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

      {loading && tableLoading === false ? (
        <Loader />
      ) : (
        <>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="devices_chartsContainer">
                <p className="devices_chartheading">Status of devices: PC</p>
                <p className="devices_chartsubheading">
                  Distribution between offline and online devices.
                </p>
                <CommonDonutChart
                  labels={["Online Devices", "Offline Devices"]}
                  colors={["#25a17d", "#ABB3B3"]}
                  series={series}
                  labelsfontSize="17px"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="devices_chartsContainer">
                <p className="devices_chartheading">Platform</p>
                <p className="devices_chartsubheading">
                  Summarized view of the distribution of all the operating
                  systems.
                </p>
                <CommonDonutChart
                  labels={["Windows", "Mac"]}
                  colors={["#646dd5", "#3889d7"]}
                  series={platformchartDatas}
                  labelsfontSize="17px"
                />
              </div>
            </Col>
          </Row>

          <div
            className="breakreport_tableContainer"
            style={{ marginTop: "20px" }}
          >
            <CommonTable
              columns={columns}
              dataSource={devicesData}
              scroll={{ x: 1600 }}
              dataPerPage={10}
              loading={tableLoading}
              checkBox="false"
              bordered="false"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Devices;
