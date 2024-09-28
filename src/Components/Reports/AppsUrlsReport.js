import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonBarChart from "../Common/CommonBarChart";
import {
  getAppsandUrlsReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { CommonToaster } from "../Common/CommonToaster";
import Loader from "../Common/Loader";
import CommonNodatafound from "../Common/CommonNodatafound";

const AppsUrlsReport = () => {
  const navigation = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [topUsageXaxis, setTopUsageXasis] = useState([]);
  const [topUsageSeries, setTopUsageSeries] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (text) => {
        return <p style={{ fontWeight: "600" }}>{text}</p>;
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
        const [hours, minutes] = text.split(":");
        return <p>{hours + "h:" + minutes + "m"}</p>;
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
          PreviousandCurrentDate[1]
        );
      }, 500);
    }
  };

  const convertTimeToHours = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600; // Convert minutes and seconds to hours
  };

  const getAppsandUrlsData = async (
    teamid,
    userid,
    orgId,
    startdate,
    enddate
  ) => {
    setTableLoading(true);
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: parseInt(orgId),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getAppsandUrlsReport(payload);
      console.log("apps and urls report response", response.data);
      const ReportData = response.data;
      setData(ReportData);
      //chart handle
      const topUsageXasis = ReportData.map((a) => a?.details);
      const topUsageSeries = ReportData.map((a) =>
        convertTimeToHours(a?.totalUsage)
      );

      setTopUsageXasis(topUsageXasis);
      setTopUsageSeries([{ name: "", data: topUsageSeries }]);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
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
        selectedDates[1]
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
      selectedDates[1]
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
      isPreviousChange === false
    ) {
      return;
    }

    setTeamId(null);
    setUserId(null);
    setSelectedDates(PreviousandCurrentDate);
    getAppsandUrlsData(
      null,
      null,
      organizationId,
      selectedDates[0],
      selectedDates[1]
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="devices_chartsContainer">
            <p className="devices_chartheading">Top Usage Statistics</p>
            {data.length >= 1 ? (
              <CommonBarChart
                xasis={topUsageXaxis}
                series={topUsageSeries}
                timebased="true"
                distributed="true"
                legend="false"
              />
            ) : (
              <CommonNodatafound />
            )}
          </div>

          <div style={{ marginTop: "25px" }}>
            <div className="breakreport_tableContainer">
              <p className="appurlreport_tableheading">Detailed Usage list</p>
              <CommonTable
                columns={columns}
                dataSource={data}
                scroll={{ x: 600 }}
                dataPerPage={10}
                checkBox="false"
                loading={tableLoading}
                size="medium"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppsUrlsReport;
