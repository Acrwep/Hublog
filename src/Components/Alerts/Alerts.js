import React, { useState, useEffect } from "react";
import { BiSolidBell } from "react-icons/bi";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import { getAlerts, getTeams, getUsers } from "../APIservice.js/action";
import CommonSelectField from "../Common/CommonSelectField";
import { checkMatchingwithCurrentDate } from "../Common/Validation";
import CommonAvatar from "../Common/CommonAvatar";

const Alerts = () => {
  const [date, setDate] = useState(new Date());
  const [organizationId, setOrganizationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [alertData, setAlertData] = useState([]);
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
        return <p>{moment(text).format("hh:mm:A")}</p>;
      },
    },
  ];

  useEffect(() => {
    getUsersData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    setTeamId(null);
    setUserId(null);
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(parseInt(orgId));
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 500);
    }
  };

  const getUsersData = async () => {
    setLoading(true);
    setUserId(null);
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
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
        getAlertsData(orgId);
      }, 350);
    }
  };

  const getAlertsData = async (orgId, userid, triggertime) => {
    const payload = {
      organizationId: orgId,
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
    getAlertsData(organizationId, userId, date);
  };

  const handleUser = (value) => {
    setUserId(value);
    setLoading(true);
    getAlertsData(organizationId, value, date);
  };

  const handleRefresh = () => {
    const today = new Date();
    const isCurrentdate = checkMatchingwithCurrentDate(date);
    if (isCurrentdate && userId === null) {
      return;
    } else {
      setLoading(true);
      setDate(today);
      setUserId(null);
      getAlertsData(organizationId, null, today);
    }
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <BiSolidBell size={20} />
        </div>
        <h2 className="allpage_mainheadings">Alerts</h2>
      </div>

      <Row className="alerts_calendarContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <CommonSelectField
              options={userList}
              placeholder="All Users"
              onChange={handleUser}
              value={userId}
              style={{ width: "170px" }}
            />
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

export default Alerts;
