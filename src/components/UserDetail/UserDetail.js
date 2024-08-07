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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //loadings
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState("");

  const handlePageChange = (id) => {
    if (id >= 3) {
      return;
    }
    setActivePage(id === activePage ? activePage : id);
  };

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);

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

    let dates = [];
    dates.push(formattedPreviousWeekDate, formattedCurrentDate);
    console.log("datearray", dates);
    setSelectedDates(dates);
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
    const getUserInfofromLocal = localStorage.getItem("LoginUserInfo");

    if (getUserInfofromLocal) {
      const loginUserDetails = JSON.parse(getUserInfofromLocal);
      setFirstName(loginUserDetails.first_Name);
      setLastName(loginUserDetails.last_Name);
      setRoleId(parseInt(loginUserDetails.roleId));
    } else {
      setFirstName("");
      setLastName("");
      setRoleId(null);
    }

    getCurrentandPreviousweekDate();
    if (user != null) {
      getuserDetailsData(user);
      return;
    }
    try {
      const response = await getUsers();
      const userDetail = response?.data;
      console.log("users response", userDetail);
      setUserList(userDetail);
      setUser(userDetail[0].id);
      setFullName(userDetail[0].first_Name + " " + userDetail[0].last_Name);
      setEmail(userDetail[0].email);
      getuserDetailsData(response.data[0].id);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const getuserDetailsData = async (userId, startDate, endDate) => {
    console.log(startDate, endDate, selectedDates);
    const currentDate = new Date();

    // Calculate previous week date (subtract 7 days)
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    // Format dates
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPreviousWeekDate = formatDate(previousWeekDate);

    let dates = [];
    dates.push(formattedPreviousWeekDate, formattedCurrentDate);
    console.log("datearray", dates);
    // setSelectedDates(dates);

    if (activePage === 1) {
      setAttendanceLoading(true);
      try {
        const response = await getUserAttendance(
          userId,
          startDate === undefined ? formattedPreviousWeekDate : startDate,
          endDate === undefined ? formattedCurrentDate : endDate
        );
        console.log("user attendance response", response);
        const details = response?.data?.attendanceDetails;
        dispatch(storeuserAttendance(details));
        setAttendanceSummary(response?.data?.attendanceSummary);
      } catch (error) {
        console.log("attendance error", error);
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeuserAttendance(details));
      } finally {
        setTimeout(() => {
          setAttendanceLoading(false);
        }, 350);
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
        }, 350);
      }
    }
  };

  const handleUser = async (value) => {
    setUser(value);
    const findSelectedUser = userList.find((f) => f.id === value);
    setFullName(findSelectedUser.first_Name + " " + findSelectedUser.last_Name);
    setEmail(findSelectedUser.email);
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
          {roleId === 3 ? firstName + " " + lastName : "User Detail"}{" "}
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
            {roleId === 3 ? (
              ""
            ) : (
              <CommonSelectField
                placeholder="Select Users"
                disabled={roleId === 3 ? true : false}
                value={user}
                options={userList}
                onChange={handleUser}
                className="userdetail_userselectfield"
              />
            )}
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
              <p className="userdetail_username">{fullName}</p>
              <Tooltip placement="top" title={email}>
                <p className="userdetail_usermail">{email}</p>
              </Tooltip>
            </Col>
          </Row>
          <div className="settings_sidebarContainer">
            {usermenuList.map((item, index) => (
              <div
                key={index}
                className={
                  index >= 2
                    ? "settings_disabledlistContainer"
                    : item.id === activePage
                    ? "settings_activelistContainer"
                    : item.id != activePage
                    ? "settings_inactivelistContainer"
                    : ""
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
              <UserAttendance
                loading={attendanceLoading}
                attendanceSummary={attendanceSummary}
              />
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
