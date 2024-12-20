import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Spin } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import {
  getAppsandUrlsReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { CommonToaster } from "../Common/CommonToaster";
import { IoGlobeOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import { MdOutlineDesktopWindows } from "react-icons/md";
import CommonAvatar from "../Common/CommonAvatar";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";

const AppsUrlsReport = () => {
  const navigation = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const typeOptions = [
    { id: 1, name: "Show All" },
    {
      id: 2,
      name: "App",
    },
    {
      id: 3,
      name: "Url",
    },
  ];
  const [typeId, setTypeId] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "fullName",
      key: "fullName",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (text) => {
        if (text === "URL") {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoGlobeOutline size={19} color="rgba(128, 128, 128, 0.85)" />
              <p style={{ marginLeft: "12px" }}>Url</p>
            </div>
          );
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdOutlineDesktopWindows
                size={19}
                color="rgba(128, 128, 128, 0.85)"
              />
              <p style={{ marginLeft: "12px" }}>{text}</p>
            </div>
          );
        }
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: 190,
    },
    {
      title: "Usage%",
      dataIndex: "usagePercentage",
      key: "usagePercentage",
      width: 150,
      render: (text, record) => {
        return <p>{text.toFixed(2) + "%"}</p>;
      },
    },
    {
      title: "Usage duration",
      dataIndex: "totalUsage",
      key: "totalUsage",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m" + seconds + "s"}</p>;
      },
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
      const response = await getTeams(orgId);
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
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousandCurrentDate);
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      setUserList(usersList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getAppsandUrlsData(
          teamId,
          userId,
          orgId,
          PreviousandCurrentDate[0],
          PreviousandCurrentDate[1],
          typeId
        );
      }, 500);
    }
  };

  const getAppsandUrlsData = async (
    teamid,
    userid,
    orgId,
    startdate,
    enddate,
    Type
  ) => {
    setLoading(true);
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: parseInt(orgId),
      startDate: startdate,
      endDate: enddate,
      type: Type === 2 ? "app" : Type === 3 ? "url" : "",
    };
    try {
      const response = await getAppsandUrlsReport(payload);
      console.log("apps and urls report response", response.data);
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
      getAppsandUrlsData(
        value,
        userIdd,
        organizationId,
        selectedDates[0],
        selectedDates[1],
        typeId
      );
    } catch (error) {
      console.log("errrrrr", error);
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getAppsandUrlsData(
      teamId,
      value,
      organizationId,
      selectedDates[0],
      selectedDates[1],
      typeId
    );
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      getAppsandUrlsData(teamId, userId, organizationId, startDate, endDate);
    }
  };

  const handleType = (value) => {
    setTypeId(value);
    getAppsandUrlsData(
      teamId,
      userId,
      organizationId,
      selectedDates[0],
      selectedDates[1],
      value
    );
  };
  const handleRefresh = () => {
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();
    let isCurrentDate = false;
    let isPreviousChange = false;

    if (PreviousandCurrentDate[0] === selectedDates[0]) {
      isPreviousChange = false;
    } else {
      isPreviousChange = true;
    }

    if (PreviousandCurrentDate[1] === selectedDates[1]) {
      isCurrentDate = true;
    } else {
      isCurrentDate = false;
    }

    if (
      teamId === null &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false &&
      typeId === 1
    ) {
      return;
    }

    setTeamId(null);
    setUserId(null);
    setTypeId(1);
    setSelectedDates(PreviousandCurrentDate);
    getAppsandUrlsData(
      null,
      null,
      organizationId,
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
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Apps & Urls Report</p>
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
            <div style={{ width: "120px", marginLeft: "12px" }}>
              <CommonSelectField
                options={typeOptions}
                placeholder="Select Type"
                onChange={handleType}
                value={typeId}
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
          <CommonDoubleDatePicker
            value={selectedDates}
            onChange={handleDateChange}
          />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(
                  data,
                  columns,
                  "Daily Apps&Urls Report.xlsx"
                );
              }}
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
          scroll={{ x: 900 }}
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

export default AppsUrlsReport;
