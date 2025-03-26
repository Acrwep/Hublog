import React, { useState, useEffect } from "react";
import { FiCoffee } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { GiLotus } from "react-icons/gi";
import { PiMonitor, PiFlowerLotus } from "react-icons/pi";
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
  getProductivityBreakdown,
  getTopCategoryUsage,
  getProductivityEmployeesList,
  getActivityBreakdown,
  getActivityEmployeeslist,
  getWellnessEmployeeDetails,
  getWellnessWorktimeTrends,
  getUsersByTeamId,
  getTopAppAndUrlsUsage,
} from "../APIservice.js/action";
import CommonSelectField from "../../Components/Common/CommonSelectField";
import CommonDoubleDatePicker from "../../Components/Common/CommonDoubleDatePicker";
import {
  storeProductivityBreakdown,
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
    { id: 3, name: "Wellness", icon: <PiFlowerLotus size={23} /> },
    { id: 4, name: "Productivity", icon: <IoRocketOutline size={21} /> },
    { id: 5, name: "Activity", icon: <FiActivity size={21} /> },
    { id: 6, name: "Apps & URLs", icon: <PiMonitor size={21} /> },
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
  const [topCategoryName, setTopCategoryName] = useState("");
  const [topCategoryUsageTime, setTopCategoryUsageTime] = useState("");
  const [breakdownTotalDuration, setBreakdownTotalDuration] = useState("");
  const [breakdownAverageTime, setBreakdownAverageTime] = useState("");
  const [productivityEmployeesData, setProductivityEmployeesData] = useState(
    []
  );
  const [activityBreakdownData, setActivityBreakdownData] = useState([]);
  const [totalBreakdownOnlineTime, setTotalBreakdownOnlineTime] = useState("");
  const [activityBreakdownAverageTime, setActivityBreakdownAverageTime] =
    useState("");
  const [activityEmployeesData, setActivityEmployeesData] = useState([]);
  const [isActivityBreakdownEmpty, setIsActivityBreakdownEmpty] =
    useState(false);
  const [wellnessEmployeeList, setWellnessEmployeeList] = useState([]);
  const [wellnessTrendsData, setWellnessTrendsData] = useState([]);
  //loadings
  const [initialLoading, setInitialLoading] = useState(true);
  const [attendanceFilterLoading, setAttendanceFilterLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);
  const [breakFilterLoading, setBreakFilterLoading] = useState(true);
  const [wellnessLoading, setWellnessLoading] = useState(true);
  const [wellnessFilterLoading, setWellnessFilterLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsFilterLoading, setAppsFilterLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState("");
  const [isBreakdownEmpty, setIsBreakdownEmpty] = useState(false);
  const [productivityLoading, setProductivityLoading] = useState(true);
  const [productivityFilterLoading, setProductivityFilterLoading] =
    useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityFilterLoading, setActivityFilterLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);

  const handlePageChange = (id) => {
    // if (id === 3) {
    //   return;
    // }
    setActivePage(id === activePage ? activePage : id);
  };

  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [defaultUserId, setDefaultUserId] = useState(null);

  useEffect(() => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    setAttendanceFilterLoading(true);
    setBreakFilterLoading(true);
    setWellnessFilterLoading(true);
    setAppsFilterLoading(true);
    setProductivityFilterLoading(true);
    setActivityFilterLoading(true);
    if (managerTeamId) {
      setIsManager(true);
      getUsersDataByTeamId();
    } else {
      setIsManager(false);
      getUsersData();
    }
  }, [activePage]);

  const parseTimeToDecimal = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
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
        setDefaultUserId(userDetail[0].id);
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

  const getUsersDataByTeamId = async () => {
    const getUserInfofromLocal = localStorage.getItem("LoginUserInfo");
    const managerTeamId = localStorage.getItem("managerTeamId");

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
      const response = await getUsersByTeamId(managerTeamId);
      const userDetail = response?.data?.team?.users;
      setUserList(userDetail);

      const loginUserData = localStorage.getItem("LoginUserInfo");
      const convertAsJson = JSON.parse(loginUserData);
      console.log("loginuser", convertAsJson);

      if (userId) {
        const findSelectedUser = userList.find((f) => f.id === userId);
        setUserId(userId);
        setFullName(
          findSelectedUser.first_Name + " " + findSelectedUser.last_Name
        );
        setEmail(findSelectedUser.email);
      } else {
        setFullName(convertAsJson.first_Name + " " + convertAsJson.last_Name);
        setEmail(convertAsJson.email);
        setUserId(convertAsJson.id);
        setDefaultUserId(convertAsJson.id);
      }
      getuserDetailsData(
        userId === null ? convertAsJson.id : userId,
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
    setWellnessFilterLoading(true);
    setAppsFilterLoading(true);
    setActivityFilterLoading(true);
    setProductivityFilterLoading(true);
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
    if (activePage === 3) {
      const payload = {
        organizationId: orgId,
        ...(userId && { userId: userId }),
        startDate: startdate,
        endDate: enddate,
      };
      try {
        const response = await getWellnessEmployeeDetails(payload);
        const wellnessEmployeesData = response?.data?.employees;
        console.log("wellness response", wellnessEmployeesData);
        setWellnessEmployeeList(wellnessEmployeesData);
      } catch (error) {
        CommonToaster(error?.response?.data?.message);
        setWellnessEmployeeList([]);
      } finally {
        setTimeout(() => {
          getWellnessTrendData(userId, orgId, startdate, enddate);
        }, 300);
      }
    }
    if (activePage === 4) {
      const payload = {
        organizationId: orgId,
        ...(userId && { userId: userId }),
        fromDate: startdate,
        toDate: enddate,
      };
      try {
        const response = await getProductivityBreakdown(payload);
        const breakdowndata = response?.data;
        console.log("breakdown response", breakdowndata);
        const [hours, minutes] =
          breakdowndata.totalProductiveDuration.split(":");
        setBreakdownTotalDuration(`${hours}h ${minutes}m`);
        const [avgHours, avgMinutes] =
          breakdowndata.averageDuratiopn.split(":");
        setBreakdownAverageTime(`${avgHours}h ${avgMinutes}m`);
        dispatch(
          storeProductivityBreakdown([
            parseTimeToDecimal(breakdowndata.totalProductiveDuration),
            parseTimeToDecimal(breakdowndata.totalNeutralDuration),
            parseTimeToDecimal(breakdowndata.totalUnproductiveDuration),
          ])
        );
        if (
          breakdowndata.totalProductiveDuration === "00:00:00" &&
          breakdowndata.totalNeutralDuration === "00:00:00" &&
          breakdowndata.totalUnproductiveDuration === "00:00:00"
        ) {
          setIsBreakdownEmpty(true);
        } else {
          setIsBreakdownEmpty(false);
        }
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
        dispatch(storeProductivityBreakdown([]));
        setIsBreakdownEmpty(true);
      } finally {
        setTimeout(() => {
          getTopAppAndUrlData(userId, orgId, startdate, enddate);
        }, 300);
      }
    }
    if (activePage === 5) {
      const payload = {
        organizationId: orgId,
        ...(userId && { userId: userId }),
        fromDate: startdate,
        toDate: enddate,
      };
      try {
        const response = await getActivityBreakdown(payload);
        console.log("activity breakdown response", response);
        const activityBreakdowndata = response?.data?.data;
        setActivityBreakdownData([
          parseTimeToDecimal(activityBreakdowndata.total_active_time),
          parseTimeToDecimal(activityBreakdowndata.total_idle_duration),
        ]);
        const [totalOnlinehrs, totalOnlinemin] =
          activityBreakdowndata?.total_Online_Duration.split(":");
        setTotalBreakdownOnlineTime(`${totalOnlinehrs}h ${totalOnlinemin}m`);

        const [avgHours, avgMinutes] =
          activityBreakdowndata?.averageDuration.split(":");
        setActivityBreakdownAverageTime(`${avgHours}h ${avgMinutes}m`);
        if (
          activityBreakdowndata.total_active_time === "00:00:00" &&
          activityBreakdowndata.total_idle_duration === "00:00:00"
        ) {
          setIsActivityBreakdownEmpty(true);
        } else {
          setIsActivityBreakdownEmpty(false);
        }
      } catch (error) {
        console.log("errr", error);
        CommonToaster(error?.response?.data, "error");
        setTotalBreakdownOnlineTime("-");
        setActivityBreakdownAverageTime("-");
      } finally {
        setTimeout(() => {
          getTopAppAndUrlData(userId, orgId, startdate, enddate);
        }, 300);
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
          getTopAppAndUrlData(userId, orgId, startdate, enddate);
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
      const removeNull = details.filter((f) => f.totalBreakHours != null);
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

  const getWellnessTrendData = async (userid, orgId, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(userid && { userId: userid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getWellnessWorktimeTrends(payload);
      console.log("wellness detailed response", response);
      const wellnessTrends = response?.data?.datewiseWellnessCount;
      setWellnessTrendsData(wellnessTrends);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setWellnessTrendsData([]);
    } finally {
      setTimeout(() => {
        setWellnessLoading(false);
        setWellnessFilterLoading(false);
      }, 150);
    }
  };

  const getTopAppAndUrlData = async (userid, orgId, startdate, enddate) => {
    const payload = {
      ...(userid && { userId: userid }),
      organizationId: orgId,
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getTopAppAndUrlsUsage(payload);
      const TopAppandUrlData = response.data;
      if (TopAppandUrlData.applicationName != null) {
        setTopAppName(
          TopAppandUrlData.applicationName[0].toUpperCase() +
            TopAppandUrlData.applicationName.slice(1)
        );
        const [hours, minutes] = TopAppandUrlData.appMaxUsage.split(":");
        setTopAppUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopAppName("-");
        setTopAppUsageTime("-");
      }

      if (TopAppandUrlData.url != null) {
        setTopUrlName(TopAppandUrlData.url);
        const [hours, minutes] = TopAppandUrlData.urlMaxUsage.split(":");
        setTopUrlUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopUrlName("-");
        setTopUrlUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopAppName("-");
      setTopAppUsageTime("-");
      setTopUrlName("-");
      setTopUrlUsageTime("-");
    } finally {
      setTimeout(() => {
        getUrlsUsageData(userid, orgId, startdate, enddate);
      }, 100);
    }
  };

  const getUrlsUsageData = async (userid, orgId, startdate, enddate) => {
    if (activePage === 4 || activePage === 5) {
      getTopCategoryUsageData(userid, orgId, startdate, enddate);
      return;
    }
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
        getTopCategoryUsageData(userid, orgId, startdate, enddate);
      }, 500);
    }
  };

  const getTopCategoryUsageData = async (userid, orgId, startdate, enddate) => {
    const payload = {
      organizationId: orgId,
      ...(userid && { userId: userid }),
      fromDate: startdate,
      toDate: enddate,
    };
    try {
      const response = await getTopCategoryUsage(payload);
      const TopCategoryUsageData = response.data;
      console.log("topcategory response", TopCategoryUsageData);

      if (TopCategoryUsageData.applicationName) {
        setTopCategoryName(TopCategoryUsageData.applicationName);

        const [hours, minutes] = TopCategoryUsageData.maxUsage.split(":");
        setTopCategoryUsageTime(hours + "h:" + minutes + "m");
      } else {
        setTopCategoryName("-");
        setTopCategoryUsageTime("-");
      }
    } catch (error) {
      CommonToaster(error.response?.data?.message, "error");
      setTopCategoryName("-");
      setTopCategoryUsageTime("-");
    } finally {
      setTimeout(() => {
        if (activePage === 5) {
          getActivityEmployeesListData(userid, orgId, startdate, enddate);
          return;
        }
        if (activePage === 4) {
          getProductivityEmployeeData(userid, orgId, startdate, enddate);
          return;
        }
        setAppsFilterLoading(false);
        setAppsLoading(false);
      }, 500);
    }
  };

  const getActivityEmployeesListData = async (
    userid,
    orgId,
    startdate,
    enddate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(userid && { userId: userid }),
      fromDate: startdate,
      toDate: enddate,
    };

    try {
      const response = await getActivityEmployeeslist(payload);
      const activityEmployeeData = response?.data?.data;
      console.log("activity employeelist response", activityEmployeeData);
      setActivityEmployeesData(activityEmployeeData);

      setActivityBreakdownData([
        parseTimeToDecimal(activityEmployeeData[0].activeTime),
        parseTimeToDecimal(activityEmployeeData[0].idleDuration),
      ]);
      if (
        activityEmployeeData[0].activeTime === "00:00:00" &&
        activityEmployeeData[0].idleDuration === "00:00:00"
      ) {
        setIsActivityBreakdownEmpty(true);
      } else {
        setIsActivityBreakdownEmpty(false);
      }
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setActivityEmployeesData([]);
    } finally {
      setTimeout(() => {
        setActivityLoading(false);
        setActivityFilterLoading(false);
      }, 300);
    }
  };

  const getProductivityEmployeeData = async (
    userid,
    orgId,
    startdate,
    enddate
  ) => {
    const payload = {
      organizationId: orgId,
      ...(userid && { userId: userid }),
      fromDate: startdate,
      toDate: enddate,
    };

    try {
      const response = await getProductivityEmployeesList(payload);
      const productivityEmployeedata = response?.data?.data;
      console.log("prod employee response", productivityEmployeedata);
      setProductivityEmployeesData(productivityEmployeedata);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setProductivityLoading(false);
        setProductivityFilterLoading(false);
      }, 300);
    }
  };

  //onchange functions
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

    if (
      userId === defaultUserId &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }

    const loginUserData = localStorage.getItem("LoginUserInfo");
    const convertAsJson = JSON.parse(loginUserData);
    console.log("loginuser", convertAsJson);

    setUserId(defaultUserId);
    setFullName(convertAsJson.first_Name + " " + convertAsJson.last_Name);
    setEmail(convertAsJson.email);
    setSelectedDates(PreviousandCurrentDate);
    getuserDetailsData(
      defaultUserId,
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
            {roleId === 3 && isManager === false ? (
              ""
            ) : (
              <CommonSelectField
                placeholder="Select Users"
                disabled={roleId === 3 && isManager === false ? true : false}
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
          <Row className="userdetail_profileContainer" gutter={16}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Avatar className="userdetail_avatar" icon={<UserOutlined />} />
            </Col>
            <Col xs={24} sm={24} md={16} lg={18}>
              <p className="userdetail_username">{fullName}</p>
              <Tooltip placement="top" title={email}>
                <p className="userdetail_usermail">{email}</p>
              </Tooltip>
            </Col>
          </Row>
          <div className="settings_sidebarContainer">
            {usermenuList.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={
                    item.id === activePage
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
              </React.Fragment>
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
                selectedUserId={userId}
                userFullName={fullName}
                userEmail={email}
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
              <UserWellness
                loading={wellnessLoading}
                filterLoading={wellnessFilterLoading}
                wellnessEmployeeList={wellnessEmployeeList}
                wellnessTrendsData={wellnessTrendsData}
              />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <UserProductivity
                breakdownTotalDuration={breakdownTotalDuration}
                breakdownAverageTime={breakdownAverageTime}
                isBreakdownEmpty={isBreakdownEmpty}
                topAppName={topAppName}
                topAppUsageTime={topAppUsageTime}
                topUrlName={topUrlName}
                topUrlUsageTime={topUrlUsageTime}
                topCategoryName={topCategoryName}
                topCategoryUsageTime={topCategoryUsageTime}
                productivityEmployeesData={productivityEmployeesData}
                loading={productivityLoading}
                filterLoading={productivityFilterLoading}
              />
            </div>
          )}
          {activePage === 5 && (
            <div>
              <UserActivity
                loading={activityLoading}
                filterLoading={activityFilterLoading}
                topAppName={topAppName}
                topAppUsageTime={topAppUsageTime}
                topUrlName={topUrlName}
                topUrlUsageTime={topUrlUsageTime}
                topCategoryName={topCategoryName}
                topCategoryUsageTime={topCategoryUsageTime}
                totalBreakdownOnlineTime={totalBreakdownOnlineTime}
                activityBreakdownAverageTime={activityBreakdownAverageTime}
                activityBreakdownData={activityBreakdownData}
                activityEmployeesData={activityEmployeesData}
                isActivityBreakdownEmpty={isActivityBreakdownEmpty}
              />
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
                topCategoryName={topCategoryName}
                topCategoryUsageTime={topCategoryUsageTime}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
