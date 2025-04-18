import React, { useState, useEffect } from "react";
import { PiDevicesBold } from "react-icons/pi";
import { Col, Row, Tooltip, Button, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import CommonDonutChart from "../Common/CommonDonutChart";
import "./styles.css";
import {
  getDeviceInfoCount,
  getSystemInfo,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";
import { CommonToaster } from "../Common/CommonToaster";
import CommonAvatar from "../Common/CommonAvatar";
import Loader from "../Common/Loader";
import CommonNodatafound from "../Common/CommonNodatafound";

const Devices = () => {
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
  const [statusOfDeviceSeries, setStatusOfDeviceSeries] = useState([]);
  const [platformSeries, setPlatformSeries] = useState([]);
  const [isManager, setIsManager] = useState(false);
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
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    try {
      setOrganizationId(orgId);
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
      }, 300);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const allUsers = response?.data;
      setUserList(allUsers);
      setNonChangeUserList(allUsers);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getDeviceData(orgId);
      }, 300);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      const teamMembersList = [];
      setNonChangeUserList(teamMembersList);
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
      //online and offline handling
      if (
        devicedata?.aggregateCounts?.onlineCount === 0 &&
        devicedata?.aggregateCounts?.offlineCount === 0
      ) {
        setStatusOfDeviceSeries([]);
      } else {
        setStatusOfDeviceSeries([
          parseInt(devicedata?.aggregateCounts?.onlineCount),
          parseInt(devicedata?.aggregateCounts?.offlineCount),
        ]);
      }
      //windows or mac handling
      if (
        devicedata?.aggregateCounts?.winUICount === 0 &&
        devicedata?.aggregateCounts?.macCount === 0 &&
        devicedata?.aggregateCounts?.linuxCount === 0
      ) {
        setPlatformSeries([]);
      } else {
        setPlatformSeries([
          devicedata?.aggregateCounts?.winUICount,
          devicedata?.aggregateCounts?.macCount,
          devicedata?.aggregateCounts?.linuxCount,
        ]);
      }
      //table handling
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
    getDeviceData(organizationId, managerTeamId, null, null, null);
  };

  return (
    <div className="settings_mainContainer">
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

      {/* {loading && tableLoading === false ? (
        <Loader />
      ) : ( */}
      <>
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              className="devices_chartsContainer"
              style={{
                height: tableLoading ? "40vh" : "100%",
              }}
            >
              {tableLoading ? (
                <Skeleton
                  active
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Status of devices: PC</p>
                  <p className="devices_chartsubheading">
                    Distribution between offline and online devices.
                  </p>
                  {statusOfDeviceSeries.length >= 1 ? (
                    <CommonDonutChart
                      labels={["Online Devices", "Offline Devices"]}
                      colors={["#25a17d", "#ABB3B3"]}
                      series={statusOfDeviceSeries}
                      labelsfontSize="16px"
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="devices_chartsContainer">
              {tableLoading ? (
                <Skeleton
                  active
                  title={{ width: 140 }}
                  paragraph={{
                    rows: 0,
                  }}
                />
              ) : (
                <>
                  <p className="devices_chartheading">Platform</p>
                  <p className="devices_chartsubheading">
                    Summarized view of the distribution of all the operating
                    systems.
                  </p>
                  {platformSeries.length >= 1 ? (
                    <CommonDonutChart
                      labels={["Windows", "Mac", "Linux"]}
                      colors={["#0078d7", "#ABB3B3", "rgba(255,185,0,0.70"]}
                      series={platformSeries}
                      labelsfontSize="16px"
                    />
                  ) : (
                    <CommonNodatafound />
                  )}
                </>
              )}
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
            size="small"
            checkBox="false"
            bordered="false"
          />
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Devices;
