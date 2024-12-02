import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import CommonAvatar from "../Common/CommonAvatar";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { getAlerts, getUsers } from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import { checkMatchingwithCurrentDate } from "../Common/Validation";
import moment from "moment";

const AlertReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const [organizationId, setOrganizationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState([]);
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
        return <p>{moment(text).format("hh:mm A")}</p>;
      },
    },
  ];

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    setUserId(null);
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    try {
      const response = await getUsers(orgId);
      const allUsers = response?.data;
      setUserList(allUsers);
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
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div
        className="dailyreports_backContainer"
        onClick={() => navigation("/reports")}
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
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(
                  alertData,
                  columns,
                  `${moment(date).format("DD-MM-YYYY")} Alert Report.xlsx`
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
