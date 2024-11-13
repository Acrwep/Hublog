import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Button, Timeline } from "antd";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDatePicker from "../Common/CommonDatePicker";
import { MdOutlineTimeline } from "react-icons/md";
import { RedoOutlined } from "@ant-design/icons";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { BsCupHot } from "react-icons/bs";
import { PiBowlFood } from "react-icons/pi";
import { getUsers } from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";
import { checkMatchingwithCurrentDate } from "../Common/Validation";

export default function Timelines() {
  const [date, setDate] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [defaultUserId, setDefaultUserId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);

  const timelineData = [
    {
      label: "09:02 AM",
      children: "Punch In",
      dot: <BiDownArrowCircle size={20} color="#25a17d" />,
    },
    {
      label: "11:02 AM",
      children: "Morning Break Start",
      dot: <BsCupHot size={18} color="#b85f06" />,
    },
    {
      label: "11:19 AM",
      children: "Morning Break End",
      dot: <BsCupHot size={18} color="#b85f06" />,
    },
    {
      label: "01:04 PM",
      children: "Lunch Start",
      dot: <PiBowlFood size={20} color="gray" />,
    },
    {
      label: "01:46 PM",
      children: "Lunch End",
      dot: <PiBowlFood size={20} color="gray" />,
    },
    {
      label: "04:32 PM",
      children: "Evening Break Start",
      dot: <BsCupHot size={18} color="#b85f06" />,
    },
    {
      label: "04:47 PM",
      children: "Evening Break End",
      dot: <BsCupHot size={18} color="#b85f06" />,
    },
    {
      label: "06:32 PM",
      children: "Punch Out",
      dot: <BiUpArrowCircle size={20} color="red" />,
    },
  ];

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserList(users);
      if (users.length >= 1) {
        setUserId(users[0].id);
        setDefaultUserId(users[0].id);
      } else {
        setUserId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
  };

  const onDateChange = (value) => {
    setDate(value);
  };

  const handleRefresh = () => {
    const today = new Date();

    const isCurrentDate = checkMatchingwithCurrentDate(date);

    if (defaultUserId === userId && isCurrentDate === true) {
      return;
    } else {
      setUserId(defaultUserId);
      setDate(today);
    }
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdOutlineTimeline size={20} />
        </div>
        <h2 className="allpage_mainheadings">Timeline</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="screenshot_selectfields">
            <CommonSelectField
              options={userList}
              value={userId}
              placeholder="Select User"
              onChange={handleUser}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
                onClick={handleRefresh}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      {timelineData.length >= 1 ? (
        <Timeline mode="left" items={timelineData} />
      ) : (
        <div
          style={{
            marginTop: "60px",
          }}
        >
          <CommonNodatafound />
        </div>
      )}
    </div>
  );
}
