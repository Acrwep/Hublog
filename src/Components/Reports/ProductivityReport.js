import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Flex, Progress } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import { getCurrentandPreviousweekDate } from "../Common/Validation";
import {
  getProductivityEmployeesList,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";

const ProductivityReport = () => {
  const navigation = useNavigate();
  const [organizationId, setOrganizationId] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: 240,
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
      title: "Attendance",
      dataIndex: "AttendanceCount",
      key: "AttendanceCount",
      width: 140,
      render: (text, record) => {
        if (text === null) {
          return 0;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Team Name",
      dataIndex: "Team_Name",
      key: "Team_Name",
      hidden: true,
    },
    {
      title: "Working time",
      dataIndex: "total_wokingtime",
      key: "total_wokingtime",
      width: "170px",
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Online time",
      dataIndex: "OnlineDuration",
      key: "OnlineDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Break time",
      dataIndex: "BreakDuration",
      key: "BreakDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity time",
      dataIndex: "TotalProductiveDuration",
      key: "TotalProductiveDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Neutral time",
      dataIndex: "TotalNeutralDuration",
      key: "TotalNeutralDuration",
      width: 160,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Unproductivity time",
      dataIndex: "TotalUnproductiveDuration",
      key: "TotalUnproductiveDuration",
      width: 170,
      render: (text, record) => {
        const [hours, minutes, seconds] = text.split(":");
        return <p>{hours + "h:" + minutes + "m:" + seconds + "s"}</p>;
      },
    },
    {
      title: "Productivity",
      dataIndex: "PercentageProductiveDuration",
      key: "PercentageProductiveDuration",
      width: 150,
      fixed: "right",
      render: (text) => {
        if (text === null) {
          return (
            <Flex gap="small" vertical>
              <Progress percent={0} strokeColor="#25a17d" />
            </Flex>
          );
        } else {
          return (
            <Flex gap="small" vertical>
              <Progress
                percent={Math.floor(text)}
                strokeColor="#25a17d"
                format={(percent) => (
                  <span style={{ color: "#1f1f1f" }}>{percent}%</span>
                )}
              />
            </Flex>
          );
        }
      },
    },
  ];

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
    } finally {
      setTimeout(() => {
        getProductivityEmployeeData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 300);
    }
  };

  const getProductivityEmployeeData = async (
    orgId,
    teamid,
    userid,
    startDate,
    endDate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      fromDate: startDate,
      toDate: endDate,
    };

    try {
      const response = await getProductivityEmployeesList(payload);
      const productivityEmployeedata = response?.data?.data;
      console.log("prod employee response", productivityEmployeedata);
      setTableData(productivityEmployeedata);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  //onchange functions
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
      getProductivityEmployeeData(
        organizationId,
        value,
        null,
        selectedDates[0],
        selectedDates[1]
      );
    } catch (error) {
      setUserList([]);
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    setLoading(true);
    getProductivityEmployeeData(
      organizationId,
      teamId,
      value,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDates(dateString); // Update the state when the date changes
    if (dateString[0] != "" && dateString[1] != "") {
      setLoading(true);
      getProductivityEmployeeData(
        organizationId,
        teamId,
        userId,
        dateString[0],
        dateString[1]
      );
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
      getProductivityEmployeeData(
        organizationId,
        null,
        null,
        PreviousandCurrentDate[0],
        PreviousandCurrentDate[1]
      );
    }
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
        <p style={{ marginLeft: "12px" }}>Productivity Report</p>
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
              />{" "}
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                placeholder="Select User"
                onChange={handleUser}
                value={userId}
              />{" "}
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
            onChange={onDateChange}
            value={selectedDates}
          />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(
                  tableData,
                  columns,
                  `Productivity Report ${moment(selectedDates[0]).format(
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
          loading={loading}
          size="small"
          bordered="true"
          checkBox="false"
        />
      </div>
    </div>
  );
};

export default ProductivityReport;
