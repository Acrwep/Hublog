import React, { useState, useEffect } from "react";
import { FiCoffee } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { Row, Col, Avatar, Tooltip, Button } from "antd";
import { UserOutlined, RedoOutlined } from "@ant-design/icons";
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
  getAppsUsage,
  getUrlsUsage,
  getTopAppsUsage,
  getTopUrlsUsage,
  getUserTotalBreak,
} from "../APIservice.js/action";
import CommonSelectField from "../../Components/Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Components/Common/CommonDoubleDatePicker";
import {
  storeuserAppsUsage,
  storeuserAttendance,
  storeuserBreak,
  storeUserTotalBreak,
  storeuserUrlsUsage,
} from "../Redux/slice";
import {
  addAppandUrlTime,
  getCurrentandPreviousweekDate,
} from "../Common/Validation";
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
  const [organizationId, setOrganizationId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [topAppName, setTopAppName] = useState("");
  const [topAppUsageTime, setTopAppUsageTime] = useState("");
  const [topUrlName, setTopUrlName] = useState("");
  const [topUrlUsageTime, setTopUrlUsageTime] = useState("");
  const [internetTime, setInternetTime] = useState("");
  //loadings
  const [initialLoading, setInitialLoading] = useState(true);
  const [attendanceFilterLoading, setAttendanceFilterLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);
  const [breakFilterLoading, setBreakFilterLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsFilterLoading, setAppsFilterLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState("");

  const handlePageChange = (id) => {
    if (id === 3 || id === 5) {
      return;
    }
    setActivePage(id === activePage ? activePage : id);
  };

  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUsersData();
  }, [activePage]);

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
    let PreviousandCurrentDate = [];
    if (initialLoading === true) {
      PreviousandCurrentDate = getCurrentandPreviousweekDate();
      setSelectedDates(PreviousandCurrentDate);
    }
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    try {
      const response = await getUsers(orgId);
      const userDetail = response?.data;
      console.log("users response", userDetail);

      setUserList(userDetail);
      if (userId) {
        const findSelectedUser = userList.find((f) => f.id === userId);
        setUserId(userId);
        setFullName(findSelectedUser.full_Name);
        setEmail(findSelectedUser.email);
      } else {
        setFullName(userDetail[0].full_Name);
        setEmail(userDetail[0].email);
        setUserId(userDetail[0].id);
      }
      getuserDetailsData(
        userId === null ? userDetail[0].id : userId,
        orgId,
        PreviousandCurrentDate.length >= 1
          ? PreviousandCurrentDate[0]
          : selectedDates[0],
        PreviousandCurrentDate.length >= 1
          ? PreviousandCurrentDate[1]
          : selectedDates[1]
      );
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const getuserDetailsData = async (userId, orgId, startdate, enddate) => {
    setAttendanceFilterLoading(true);
    setBreakFilterLoading(true);
    setAppsFilterLoading(true);
    if (activePage === 1) {
      const payload = {
        userId: userId,
        organizationId: orgId,
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getUserAttendance(payload);
        console.log("user attendance response", response);
        const details = response?.data?.attendanceDetails;
        const reverseData = details.reverse();
        dispatch(storeuserAttendance(reverseData));
        setAttendanceSummary(response?.data?.attendanceSummary);
      } catch (error) {
        console.log("attendance error", error);
        CommonToaster(error.response?.data?.message, "error");
        const details = [];
        dispatch(storeuserAttendance(details));
      } finally {
        setTimeout(() => {
          setAttendanceFilterLoading(false);
          setInitialLoading(false);
        }, 350);
      }
    }
    if (activePage === 2) {
      try {
        const response = await getUserBreak(userId, startdate, enddate);
        console.log("user break response", response.data);
        const details = response.data;
        const reverseData = details.reverse();
        dispatch(storeuserBreak(reverseData));
      } catch (error) {
        console.log("break error", error);
        CommonToaster(error.response?.data, "error");
        const details = [];
        dispatch(storeuserBreak(details));
      } finally {
        setTimeout(() => {
          getUserTotalBreakData(userId, orgId, startdate, enddate);
        }, 350);
      }
    }
    if (activePage === 6) {
      const orgId = localStorage.getItem("organizationId");

      const payload = {
        ...(userId && { userId: userId }),
        organizationId: orgId,
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getAppsUsage(payload);
        const AppsData = response.data;
        // setAppsData(AppsandurlsData);
        dispatch(storeuserAppsUsage(AppsData));
      } catch (error) {
        CommonToaster(error.response?.data?.message, "error");
      } finally {
        setTimeout(() => {
          getTopAppUsageData(userId, orgId, startdate, enddate);
        }, 500);
      }
    }
  };

  const getUserTotalBreakData = async (userId, orgId, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      userId: userId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getUserTotalBreak(payload);
      console.log("user total break response", response.data);
      const details = response.data;
      const reverseData = details.reverse();
      const removeNull = reverseData.filter((f) => f.totalBreakHours != null);
      dispatch(storeUserTotalBreak(removeNull));
    } catch (error) {
      CommonToaster(error.response?.data, "error");
      const details = [];
      dispatch(storeUserTotalBreak(details));
    } finally {
      setTimeout(() => {
        setBreakLoading(false);
        setBreakFilterLoading(false);
      }, 350);
    }
  };

  const getTopAppUsageData = async (userid, orgId, startdate, enddate) => {
    const payload = {
      ...(userid && { userId: userid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    let AppMaxTime = "";
    try {
      const response = await getTopAppsUsage(payload);
      const TopAppsUsageData = response.data;
      if (TopAppsUsageData.applicationName != null) {
        setTopAppName(
          TopAppsUsageData.applicationName[0].toUpperCase() +
            TopAppsUsageData.applicationName.slice(1)
        );

        const [hours, minutes] = TopAppsUsageData.maxUsage.split(":");
        AppMaxTime = TopAppsUsageData.maxUsage;
        setTopAppUsageTime(hours + "h:" + minutes + "m");
        return;
      } else {
        setTopAppName("-");
        setTopAppUsageTime("-");
        AppMaxTime = "";
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopAppName("-");
      setTopAppUsageTime("-");
      AppMaxTime = "";
    } finally {
      setTimeout(() => {
        getUrlsUsageData(userid, orgId, startdate, enddate, AppMaxTime);
      }, 500);
    }
  };

  const getUrlsUsageData = async (
    userid,
    orgId,
    startdate,
    enddate,
    AppMaxTime
  ) => {
    const payload = {
      ...(userid && { userId: userid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getUrlsUsage(payload);
      const UrlsData = response.data;
      dispatch(storeuserUrlsUsage(UrlsData));
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getTopUrlUsageData(userid, orgId, startdate, enddate, AppMaxTime);
      }, 500);
    }
  };

  const getTopUrlUsageData = async (
    userid,
    orgId,
    startdate,
    enddate,
    AppMaxTime
  ) => {
    const payload = {
      ...(userid && { userId: userid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopUrlsUsage(payload);
      const TopUrlsUsageData = response.data;

      if (TopUrlsUsageData.url) {
        setTopUrlName(TopUrlsUsageData.url);

        const [hours, minutes] = TopUrlsUsageData.maxUsage.split(":");
        setTopUrlUsageTime(hours + "h:" + minutes + "m");

        const totalTime = addAppandUrlTime(
          AppMaxTime,
          TopUrlsUsageData.maxUsage
        );
        setInternetTime(totalTime);
      } else {
        setTopUrlName("-");
        setTopUrlUsageTime("-");
        setInternetTime("");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopUrlName("-");
      setTopUrlUsageTime("-");
      setInternetTime("");
    } finally {
      setTimeout(() => {
        setAppsFilterLoading(false);
        setAppsLoading(false);
      }, 500);
    }
  };

  const handleUser = async (value) => {
    setUserId(value);
    const findSelectedUser = userList.find((f) => f.id === value);
    setFullName(findSelectedUser.full_Name);
    setEmail(findSelectedUser.email);
    getuserDetailsData(
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
      getuserDetailsData(userId, organizationId, startDate, endDate);
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
    const defaultUser = userList.find((f, index) => index === 0);
    console.log("defaultuser", defaultUser);

    if (
      userId === defaultUser.id &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }

    setUserId(defaultUser.id);
    setFullName(defaultUser.full_Name);
    setEmail(defaultUser.email);
    setSelectedDates(PreviousandCurrentDate);
    getuserDetailsData(
      defaultUser.id,
      organizationId,
      PreviousandCurrentDate[0],
      PreviousandCurrentDate[1]
    );
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
                value={userId}
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
            <div className="wellness_calendarContainer">
              <div>
                <CommonDoubleDatePicker
                  value={selectedDates}
                  onChange={handleDateChange}
                />
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
            </div>
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
                  index === 2 || index === 4
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
                loading={initialLoading}
                filterLoading={attendanceFilterLoading}
                attendanceSummary={attendanceSummary}
              />
            </div>
          )}
          {activePage === 2 && (
            <div>
              <UserBreak
                loading={breakLoading}
                filterLoading={breakFilterLoading}
              />
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
              <UserAppsUrls
                loading={appsLoading}
                filterLoading={appsFilterLoading}
                topAppName={topAppName}
                topAppUsageTime={topAppUsageTime}
                topUrlName={topUrlName}
                topUrlUsageTime={topUrlUsageTime}
                internetTime={internetTime}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
