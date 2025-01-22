import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Button, Timeline, Spin } from "antd";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDatePicker from "../Common/CommonDatePicker";
import { MdOutlineTimeline } from "react-icons/md";
import { RedoOutlined } from "@ant-design/icons";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { BsCupHot } from "react-icons/bs";
import { PiBowlFood } from "react-icons/pi";
import { LuClock4 } from "react-icons/lu";
import { getEmployeeTimeline, getUsers } from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import "./styles.css";
import CommonNodatafound from "../Common/CommonNodatafound";
import { checkMatchingwithCurrentDate } from "../Common/Validation";
import moment from "moment";

export default function Timelines() {
  const [date, setDate] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [defaultUserId, setDefaultUserId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const dummyTimelineData = [
  //   {
  //     label: "09:02 AM",
  //     children: "Punch In",
  //     dot: <BiDownArrowCircle size={20} color="#25a17d" />,
  //   },
  //   {
  //     label: "11:02 AM",
  //     children: "Morning Break Start",
  //     dot: <BsCupHot size={18} color="#b85f06" />,
  //   },
  //   {
  //     label: "11:19 AM",
  //     children: "Morning Break End",
  //     dot: <BsCupHot size={18} color="#b85f06" />,
  //   },
  //   {
  //     label: "01:04 PM",
  //     children: "Lunch Start",
  //     dot: <PiBowlFood size={20} color="gray" />,
  //   },
  //   {
  //     label: "01:46 PM",
  //     children: "Lunch End",
  //     dot: <PiBowlFood size={20} color="gray" />,
  //   },
  //   {
  //     label: "04:32 PM",
  //     children: "Evening Break Start",
  //     dot: <BsCupHot size={18} color="#b85f06" />,
  //   },
  //   {
  //     label: "04:47 PM",
  //     children: "Evening Break End",
  //     dot: <BsCupHot size={18} color="#b85f06" />,
  //   },
  //   {
  //     label: "06:32 PM",
  //     children: "Punch Out",
  //     dot: <BiUpArrowCircle size={20} color="red" />,
  //   },
  // ];

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    let defalutUserId = null;
    const currentDate = new Date();
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserList(users);
      if (users.length >= 1) {
        setUserId(users[0].id);
        defalutUserId = users[0].id;
        setDefaultUserId(defalutUserId);
      } else {
        setUserId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getTimelineData(orgId, defalutUserId, currentDate);
      }, 350);
    }
  };

  const getTimelineData = async (orgId, userid, date) => {
    const payload = {
      organizationId: orgId,
      userId: userid,
      Date: moment(date).format("YYYY-MM-DD"),
    };
    try {
      const response = await getEmployeeTimeline(payload);
      console.log("timeline response", response);
      const details = response?.data?.data?.data;

      const removeNull = details.filter((f) => f.EventTime != null);
      if (removeNull.length >= 1) {
        const result = removeNull.map((item) => {
          return {
            ...item,
            label: moment(item.EventTime).format("hh:mm A"),
            children: item.EventType,
            dot: item.EventType?.toLowerCase().trim().includes("punch in") ? (
              <BiDownArrowCircle size={20} color="#25a17d" />
            ) : item.EventType?.toLowerCase().trim().includes("punch out") ? (
              <BiUpArrowCircle size={20} color="rgba(244, 67, 54, 0.94)" />
            ) : item.EventType?.toLowerCase().trim().includes("lunch") ? (
              <PiBowlFood size={20} color="rgba(255,111,0,0.90)" />
            ) : item.EventType?.toLowerCase().trim().includes("break") ? (
              <BsCupHot size={18} color="#b85f06" />
            ) : (
              <LuClock4 size={19} color="#919494" />
            ),
          };
        });
        console.log("result", result);
        setTimelineData(result);
      } else {
        setTimelineData([]);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleUser = (value) => {
    setLoading(true);
    setUserId(value);
    getTimelineData(organizationId, value, date);
  };

  const onDateChange = (value) => {
    setLoading(true);
    setDate(value);
    getTimelineData(organizationId, userId, value);
  };

  const handleRefresh = () => {
    const today = new Date();

    const isCurrentDate = checkMatchingwithCurrentDate(date);

    if (defaultUserId === userId && isCurrentDate === true) {
      return;
    } else {
      setLoading(true);
      setUserId(defaultUserId);
      setDate(today);
      getTimelineData(organizationId, defaultUserId, today);
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
              loading={loading}
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

      {loading ? (
        <div className="timeline_loadercontainer">
          <Spin />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
