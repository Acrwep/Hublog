import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import {
  getBreakReport,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";

const BreakReports = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "first_Name",
      key: "first_Name",
      width: "150px",
      render: (text, record) => {
        const fullName = record.first_Name + " " + record.last_Name;
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarfontSize="17px" itemName={fullName} />
            <p className="reports_avatarname">{fullName}</p>
          </div>
        );
      },
    },
    {
      title: "Break type",
      dataIndex: "breakName",
      key: "breakName",
      width: "150px",
    },
    {
      title: "Break start",
      dataIndex: "start_Time",
      key: "start_Time",
      width: "150px",
      render: (text, record) => {
        return <p>{moment(text).format("hh:mm A")}</p>;
      },
    },
    {
      title: "Break end",
      dataIndex: "end_Time",
      key: "end_Time",
      width: "150px",
      render: (text, record) => {
        return <p>{moment(text).format("hh:mm A")}</p>;
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
      console.log("teamsssssss response", response.data);
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
    let userIdd = null;
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      console.log("users response", response.data);
      const usersList = response?.data;

      //merge user fullname and lastname in full_name property
      const updateUserList = usersList.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });
      console.log("update user list", updateUserList);

      setUserList(updateUserList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getBreakReportData(userId, teamId, orgId, date);
      }, 500);
    }
  };

  const getBreakReportData = async (user, team, orgId, selectedDate) => {
    setLoading(true);
    const payload = {
      ...(user && { userId: user }),
      ...(team && { teamId: team }),
      organizationId: parseInt(orgId),
      date: moment(selectedDate).format("YYYY-MM-DD"),
    };
    console.log("payloadddd", payload);
    try {
      const response = await getBreakReport(payload);
      console.log("daily attendance report response", response.data);
      const ScreenShotsData = response.data;
      const reveseData = ScreenShotsData.reverse();

      setData(reveseData);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleTeam = async (value) => {
    console.log("clicked team", value);
    setTeamId(value);
    try {
      const response = await getUsersByTeamId(value);
      console.log("user by teamId response", response?.data);
      const teamMembersList = response?.data?.team?.users;
      console.log("team members", teamMembersList);
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }
      const updatedArr = teamMembersList.map(
        ({ firstName, lastName, userId, ...rest }) => ({
          first_Name: firstName,
          last_Name: lastName,
          id: userId,
          ...rest,
        })
      );

      //merge user fullname and lastname in full_name property
      const adddFullName = updatedArr.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });

      setUserList(adddFullName);
      const userIdd = null;
      setUserId(userIdd);
      getBreakReportData(userIdd, value, organizationId, date);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const onDateChange = (value) => {
    setDate(value);
    getBreakReportData(userId, teamId, organizationId, value);
  };

  const handleUser = (value) => {
    console.log("userIdddd", value);
    setUserId(value);
    getBreakReportData(value, teamId, organizationId, date);
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
        <p style={{ marginLeft: "12px" }}>Break Report</p>
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
          <div style={{ width: "30%" }}>
            <CommonDatePicker onChange={onDateChange} value={date} />
          </div>
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(data, columns, "alerts.xlsx");
              }}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 600 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BreakReports;
