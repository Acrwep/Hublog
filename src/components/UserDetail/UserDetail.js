import React, { useState, useEffect } from "react";
import { FiCoffee } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { Row, Col, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserAttendance from "./UserAttendance";
import "./styles.css";
import UserBreak from "./UserBreak";
import UserWellness from "./UserWellness";
import UserProductivity from "./UserProductivity";
import UserActivity from "./UserActivity";
import UserAppsUrls from "./UserApps&Urls";
import { CommonToaster } from "../Common/CommonToaster";
import {
  getUserAttendance,
  getUserBreak,
  getUsers,
} from "../APIservice.js/action";
import CommonSelectField from "../../Components/Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Components/Common/CommonDoubleDatePicker";
import { storeuserAttendance, storeuserBreak } from "../Redux/slice";
import { useDispatch } from "react-redux";

const UserDetail = () => {
  const dispatch = useDispatch();
  const usermenuList = [
    {
      id: 1,
      name: "Attendance",
      icon: <MdCalendarMonth size={21} />,
    },
    { id: 2, name: "Breaks", icon: <FiCoffee size={21} /> },
    { id: 3, name: "Wellness", icon: <MdAccessTime size={21} /> },
    { id: 4, name: "Productivity", icon: <MdAccessTime size={21} /> },
    { id: 5, name: "Activity", icon: <FiActivity size={21} /> },
    { id: 6, name: "Apps & URLs", icon: <IoRocketOutline size={21} /> },
  ];
  const [activePage, setActivePage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  //loadings
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);

  const handlePageChange = (id) => {
    setActivePage(id === activePage ? activePage : id);
  };

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsersData();
  }, [activePage]);

  //get current date and previous week date from current date
  const getCurrentandPreviousweekDate = () => {
    const currentDate = new Date();

    // Calculate previous week date (subtract 7 days)
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    // Format dates
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    console.log("Current Date:", formattedCurrentDate);
    let dates = [];
    dates.push(formattedCurrentDate, formattedPreviousWeekDate);
    setSelectedDates(dates);
    console.log("Previous Week Date:", formattedPreviousWeekDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Ensure month and day are two digits
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      const userDetail = response?.data;
      console.log("users response", userDetail);
      setUserList(userDetail);
      setUser(userDetail[0].id);
      setName(userDetail[0].usersName);
      setEmail(userDetail[0].email);
      getuserDetailsData(response.data[0].id);
      getCurrentandPreviousweekDate();
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const getuserDetailsData = async (userId, startDate, endDate) => {
    console.log(startDate, endDate);
    if (activePage === 1) {
      setAttendanceLoading(true);
      try {
        const response = await getUserAttendance(
          userId,
          startDate != undefined ? startDate : selectedDates[0],
          endDate != undefined ? endDate : selectedDates[1]
        );
        console.log("user attendance response", response.data);
        const details = response.data;
        dispatch(storeuserAttendance(details));
      } catch (error) {
        console.log("attendance error", error);
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeuserAttendance(details));
      } finally {
        setTimeout(() => {
          setAttendanceLoading(false);
        }, 1500);
      }
    }
    if (activePage === 2) {
      setBreakLoading(true);
      try {
        const response = await getUserBreak(
          userId,
          startDate != undefined ? startDate : selectedDates[0],
          endDate != undefined ? endDate : selectedDates[1]
        );
        console.log("user break response", response.data);
        const details = response.data;
        dispatch(storeuserBreak(details));
      } catch (error) {
        console.log("break error", error);
        CommonToaster(error.response?.data, "error");
        const details = [];
        dispatch(storeuserBreak(details));
      } finally {
        setTimeout(() => {
          setBreakLoading(false);
        }, 1500);
      }
    }
  };

  const handleUser = async (value) => {
    setUser(value);
    getuserDetailsData(value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      getuserDetailsData(user, startDate, endDate);
    }
  };
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="userdetail_iconContainer">
          <FaUserLarge size={19} />
        </div>
        <h2 className="allpage_mainheadings">
          User Detail{" "}
          {activePage === 1
            ? "> Attendance"
            : activePage === 2
            ? "> Breaks"
            : activePage === 3
            ? "> Wellness"
            : activePage === 4
            ? "> Productivity"
            : activePage === 5
            ? "> Activity"
            : activePage === 6
            ? "> Apps & URLs"
            : ""}
        </h2>
      </div>
      <div className="userdetail_userselectContainer">
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <CommonSelectField
              placeholder="Select Users"
              value={user}
              options={userList}
              onChange={handleUser}
              className="userdetail_userselectfield"
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            className="usersdetail_calendarContainer"
          >
            <CommonDoubleDatePicker
              value={selectedDates}
              onChange={handleDateChange}
            />
          </Col>
        </Row>
      </div>

      <Row className="settings_rowcontainer">
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={6}
          className="settinglist_columnOneContainer"
        >
          <Row className="userdetail_profileContainer">
            <Col span={8}>
              <Avatar className="userdetail_avatar" icon={<UserOutlined />} />
            </Col>
            <Col span={16}>
              <p className="userdetail_username">{name}</p>
              <Tooltip placement="top" title={email}>
                <p className="userdetail_usermail">{email}</p>
              </Tooltip>
            </Col>
          </Row>
          <div className="settings_sidebarContainer">
            {usermenuList.map((item) => (
              <div
                className={
                  item.id === activePage
                    ? "settings_activelistContainer"
                    : "settings_inactivelistContainer"
                }
                onClick={() => handlePageChange(item.id)}
              >
                {item.icon}
                <p
                  className={
                    item.id === activePage ? "" : "settings_inactivelisttext"
                  }
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={16}
          lg={18}
          className="settinglist_columnContainer"
        >
          {activePage === 1 && (
            <div>
              <UserAttendance loading={attendanceLoading} />
            </div>
          )}
          {activePage === 2 && (
            <div>
              <UserBreak loading={breakLoading} />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <UserWellness />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <UserProductivity />
            </div>
          )}
          {activePage === 5 && (
            <div>
              <UserActivity />
            </div>
          )}
          {activePage === 6 && (
            <div>
              <UserAppsUrls />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
