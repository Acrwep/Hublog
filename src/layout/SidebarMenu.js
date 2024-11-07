import "../App.css";
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  Button,
  Layout,
  theme,
  Space,
  Input,
  Dropdown,
  Avatar,
  Row,
  Col,
  Divider,
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenuList from "./SidebarMenuList";
import LogoImg from "../../src/assets/images/logo-re-3.png";
import { AiOutlineLogout } from "react-icons/ai";
import {
  MdOutlineDashboardCustomize,
  MdRocketLaunch,
  MdScreenshotMonitor,
} from "react-icons/md";
import { FaAppStore } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import { GrMapLocation } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { FiActivity } from "react-icons/fi";
import { GiNotebook, GiLotus } from "react-icons/gi";
import { RiUser3Fill } from "react-icons/ri";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { BiSpreadsheet } from "react-icons/bi";
//login and signup
import Signup from "../Components/Signup/Signup.tsx";
import Login from "../Components/Login/Login";
//dashboard
import Dashboard from "../Components/Dashboard/Dashboard";
//attendance
import Attendance from "../Components/Attendance/Attendance";
//real time
import Field from "../Components/Real Time/Field";
import LiveStream from "../Components/Real Time/LiveStream";
//analytics
import Timeline from "../Components/Analytics/Timeline";
import Activity from "../Components/Analytics/Activity/Activity.js";
import Productivity from "../Components/Analytics/Productivity/Productivity.js";
import Screenshots from "../Components/Analytics/Screenshots";
import Apps$Url from "../Components/Analytics/Apps$Url";
import Wellness from "../Components/Analytics/Wellness/Wellness.js";
//devices
import Devices from "../Components/Devices/Devices";
//aler
import Alerts from "../Components/Alerts/Alerts";
//reports
import Reports from "../Components/Reports/Reports";
import BreakReports from "../Components/Reports/BreakReports";
import DailyAttendanceReport from "../Components/Reports/DailyAttendanceReport";
import MonthlyAttendanceReport from "../Components/Reports/MonthlyAttendanceReport";
import ActivityReport from "../Components/Reports/ActivityReport";
import ProductivityReport from "../Components/Reports/ProductivityReport";
import TeamsInsightReport from "../Components/Reports/TeamsInsightReport";
import ProjectReport from "../Components/Reports/ProjectReport";
import LogsReport from "../Components/Reports/LogsReport";
import AppsUrlsReport from "../Components/Reports/AppsUrlsReport";
import DeviceReport from "../Components/Reports/DeviceReport";
//projects
import Projects from "../Components/Projects/Project";
//notebook
import Notebook from "../Components/Notebook/Notebook";
//userdetail
import UserDetail from "../Components/UserDetail/UserDetail";
//settings
import Settings from "../Components/Settings/Setting";
import "./sidebarstyles.css";
import MonthlyInandOutReport from "../Components/Reports/MonthlyInandOutReport";
import AlertReport from "../Components/Reports/AlertReport";
import ManualTime from "../Components/Manual Time/ManualTime";
import { SideMenuConfig } from "./SideMenuConfig";
import Downloads from "../Components/Login/downloads";
import Demo from "../Components/Typescript/demo.tsx";
//licence
import Billing from "../Components/Licence/Billing.js";
import Organization from "../Components/Organization/Organization.js";

const { Header, Sider, Content } = Layout;
function SidebarMenu() {
  // const accessToken = localStorage.getItem("Accesstoken");
  // console.log("Access Token:::::", accessToken);
  const navigation = useNavigate();
  const location = useLocation();
  // const userInformation = useSelector((state) => state.userInfo);

  const [collapsed, setCollapsed] = useState(false);
  const [sidemenuList, setSidemenuList] = useState([]);
  const [dummySidemenuList, setDummySidemenuList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchbarHover, setSearchbarHover] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigation("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth >= 300 && window.outerWidth <= 699) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    //the useEffect call only when login
    const handleStorageUpdate = () => {
      const accessToken = localStorage.getItem("Accesstoken");
      if (accessToken === null) {
        navigation("/login");
        setShowPages(false);
        return;
      }
      //handle login userinformation
      const getItem = localStorage.getItem("LoginUserInfo");
      const convertLoginInfoAsJson = JSON.parse(getItem);
      console.log("logininfo in sidebarmenu", convertLoginInfoAsJson);
      setLoginUserInfo(convertLoginInfoAsJson);
      if (convertLoginInfoAsJson) {
        setFirstName(convertLoginInfoAsJson.first_Name);
        setLastName(convertLoginInfoAsJson.last_Name);
        setFullName(
          convertLoginInfoAsJson.first_Name +
            " " +
            convertLoginInfoAsJson.last_Name
        );
      } else {
        setFullName("");
      }

      //handle navigation by accesstoken
      if (accessToken) {
        setShowPages(true);
        if (location.pathname === "/") {
          if (convertLoginInfoAsJson.roleId === 3) {
            navigation("/userdetail");
            setUserRole(true);
          } else {
            navigation("/dashboard");
            setUserRole(false);
          }
        } else {
          if (convertLoginInfoAsJson.roleId === 3) {
            navigation("/userdetail");
            setUserRole(true);
          } else {
            navigation("/dashboard");
            setUserRole(false);
          }
        }
      }

      //handle header menulist
      if (
        convertLoginInfoAsJson != null &&
        convertLoginInfoAsJson.roleId === 3
      ) {
        let userMenuList = [];
        userMenuList.push(
          {
            title: "Notebook",
            icon: <GiNotebook size={17} />,
            path: "notebook",
          },
          {
            title: convertLoginInfoAsJson.usersName
              ? convertLoginInfoAsJson.usersName
              : "",
            icon: <RiUser3Fill size={17} />,
            path: "userdetail",
          }
        );
        setSidemenuList(userMenuList);
        setDummySidemenuList(userMenuList);
      } else {
        const menuList = Object.values(SideMenuConfig).map((item) => {
          return { ...item };
        });

        const filterItems = menuList.filter((f) => !f.submenu);
        filterItems.push(
          {
            title: "Livestream",
            icon: <CiStreamOn size={17} />,
            path: "livestream",
          },
          { title: "Field", icon: <GrMapLocation size={17} />, path: "field" },
          {
            title: "Timeline",
            icon: <VscGraphLine size={17} />,
            path: "timeline",
          },
          {
            title: "Activity",
            icon: <FiActivity size={17} />,
            path: "activity",
          },
          {
            title: "Productivity",
            icon: <MdRocketLaunch size={17} />,
            path: "productivity",
          },
          {
            title: "Screenshots",
            icon: <MdScreenshotMonitor size={17} />,
            path: "screenshots",
          },
          {
            title: "App $ URLs",
            icon: <FaAppStore size={17} />,
            path: "apps&urls",
          },
          {
            title: "Wellness",
            icon: <GiLotus size={17} />,
            path: "wellness",
          }
        );
        console.log("filterItems", filterItems);

        setSidemenuList(filterItems);
        setDummySidemenuList(filterItems);
      }
    };

    window.addEventListener("localStorageUpdated", handleStorageUpdate);

    // Initial load
    handleStorageUpdate();

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    };
  }, []);

  //the useEffect call only the token will expire
  useEffect(() => {
    //handle navigate to login page when token expire
    const handleTokenExpire = () => {
      navigation("/login");
    };

    window.addEventListener("tokenExpireUpdated", handleTokenExpire);

    // Initial load
    // handleTokenExpire();

    return () => {
      window.removeEventListener("tokenExpireUpdated", handleTokenExpire);
    };
  }, []);

  useEffect(() => {
    //handle login userinformation
    const getItem = localStorage.getItem("LoginUserInfo");
    const convertLoginInfoAsJson = JSON.parse(getItem);

    const accessToken = localStorage.getItem("Accesstoken");
    console.log("Access Token:::::", accessToken);
    if (accessToken) {
      setShowPages(true);
      if (location.pathname === "/") {
        if (convertLoginInfoAsJson.roleId === 3) {
          navigation("/userdetail");
          setUserRole(true);
        } else {
          navigation("/dashboard");
          setUserRole(false);
        }
      } else {
        navigation(location.pathname);
      }
    } else {
      if (location.pathname === "/downloads") {
        setShowPages(false);
        navigation("/downloads");
        return;
      } else {
        setShowPages(false);
        navigation("/login");
        return;
      }
    }

    // const getItem = localStorage.getItem("LoginUserInfo");
    // const convertLoginInfoAsJson = JSON.parse(getItem);
    // console.log("logininfoooooooo", convertLoginInfoAsJson);
    // setLoginUserInfo(convertLoginInfoAsJson);

    // const menuList = Object.values(SideMenuConfig).map((item) => {
    //   return { ...item };
    // });

    // const filterItems = menuList.filter((f) => !f.submenu);
    // filterItems.push(
    //   { title: "Livestream", icon: <CiStreamOn size={17} /> },
    //   { title: "Field", icon: <GrMapLocation size={17} /> },
    //   {
    //     title: "Timeline",
    //     icon: <VscGraphLine size={17} />,
    //   },
    //   {
    //     title: "Activity",
    //     icon: <FiActivity size={17} />,
    //   },
    //   {
    //     title: "Productivity",
    //     icon: <MdRocketLaunch size={17} />,
    //   },
    //   {
    //     title: "Screenshots",
    //     icon: <MdScreenshotMonitor size={17} />,
    //   },
    //   {
    //     title: "App $ URLs",
    //     icon: <FaAppStore size={17} />,
    //   },
    //   {
    //     title: "Wellness",
    //     icon: <GiLotus size={17} />,
    //     path: "wellness",
    //   }
    // );
    // console.log("filterItems", filterItems);

    // setSidemenuList(filterItems);
    // setDummySidemenuList(filterItems);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") {
      setSidemenuList(dummySidemenuList);
      return;
    }

    const filterData = dummySidemenuList.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setSidemenuList(filterData);
  };

  const handleSearchLists = (item) => {
    // const removespace = title.split(" ").join("");
    // console.log("spaceeeee", removespace);
    navigation(`/${item.path}`);
    setSearch("");
  };
  const CustomDropdownContent = () => (
    <div className="header_logoutmenuContainer">
      <div className="headerlogoutmenu_avatercontainer">
        <Avatar
          size={40}
          style={{
            backgroundColor: "#25a17d",
            fontWeight: "600",
            marginRight: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {firstName[0] + lastName[0]}
        </Avatar>

        <div>
          <p className="header_logoutmenuname">{fullName}</p>
          <p className="header_logoutmenuemail">
            {loginUserInfo.email ? loginUserInfo.email : ""}
          </p>
        </div>
      </div>
      {userRole === false ? (
        <>
          <Divider style={{ margin: "0" }} />
          <div
            className="headerlogoutmenu_logiconContainer"
            onClick={() => navigation("/billing")}
          >
            <BiSpreadsheet size={22} style={{ marginRight: "27px" }} />
            <p className="header_logoutmenulogout">Billing</p>
          </div>
        </>
      ) : (
        ""
      )}
      <Divider style={{ margin: "0" }} />
      <div className="headerlogoutmenu_logiconContainer" onClick={handleLogout}>
        <AiOutlineLogout size={22} style={{ marginRight: "27px" }} />
        <p className="header_logoutmenulogout">Logout</p>
      </div>
    </div>
  );
  return (
    <div>
      {location.pathname === "/login" ? (
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      ) : location.pathname === "/signup" ? (
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : location.pathname === "/downloads" ? (
        <div>
          <Routes>
            <Route path="/downloads" element={<Downloads />} />
          </Routes>
        </div>
      ) : location.pathname === "/typescript" ? (
        <div>
          <Routes>
            <Route path="/typescript" element={<Demo />} />
          </Routes>
        </div>
      ) : showPages === true ? (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical">
              <img
                src={LogoImg}
                className={collapsed ? "collapsed_projectlogo" : "project_logo"}
              />
              <hr className="sidebar_hrtag" />
            </div>
            <SidebarMenuList />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={2}
                  lg={2}
                  className="header_collapesbuttonContainer"
                  id="header_collapesbuttonContainer"
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ fontSize: "16px", width: 64, height: 64 }}
                  />
                </Col>
                <Col xs={24} sm={24} md={11} lg={11}>
                  <div style={{ position: "relative" }}>
                    <div className="searchbarandexplore_container">
                      <div
                        className="navbar_discoversearchbar_container"
                        onMouseEnter={() => setSearchbarHover(true)}
                        onMouseLeave={() => setSearchbarHover(false)}
                      >
                        <Space direction="vertical">
                          <Input
                            placeholder="Discover it all: feature, settings, report"
                            className="navbar_discoversearchnbar"
                            prefix={
                              <SearchOutlined className="site-form-item-icon" />
                            }
                            onChange={handleSearch}
                            value={search}
                          />
                        </Space>
                      </div>
                    </div>
                    <div
                      className="navbar_searchlistContainer"
                      style={{
                        display:
                          searchbarHover &&
                          search != "" &&
                          sidemenuList.length >= 1
                            ? "block"
                            : "none",
                      }}
                      onMouseEnter={() => setSearchbarHover(true)}
                      onMouseLeave={() => setSearchbarHover(false)}
                    >
                      {sidemenuList.map((item, index) => (
                        <>
                          <div
                            className="searchlist_innerContainer"
                            key={index}
                            onClick={() => handleSearchLists(item)}
                          >
                            <div style={{ marginRight: "12px" }}>
                              {item.icon}
                            </div>
                            <p className="searchlist_texts">{item.title}</p>
                          </div>
                          <Divider style={{ margin: "0px" }} />
                        </>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={11}
                  lg={11}
                  className="logoutavatar_container"
                >
                  <Space direction="vertical">
                    <Space wrap>
                      <Dropdown
                        dropdownRender={CustomDropdownContent}
                        placement="bottomRight"
                        arrow
                      >
                        <div>
                          <Avatar size={37} className="header_avatar">
                            {firstName[0] + lastName[0]}
                          </Avatar>
                        </div>
                      </Dropdown>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                minHeight: "100vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/livestream" element={<LiveStream />} />
                <Route path="/field" element={<Field />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/productivity" element={<Productivity />} />
                <Route path="/screenshots" element={<Screenshots />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/apps&urls" element={<Apps$Url />} />

                <Route path="/devices" element={<Devices />} />
                <Route path="/manualtime" element={<ManualTime />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/breakreports" element={<BreakReports />} />
                <Route
                  path="/dailyattendancereport"
                  element={<DailyAttendanceReport />}
                />
                <Route
                  path="/monthlyattendancereport"
                  element={<MonthlyAttendanceReport />}
                />
                <Route
                  path="/monthlyinandoutreport"
                  element={<MonthlyInandOutReport />}
                />
                <Route path="/alertreport" element={<AlertReport />} />
                <Route path="/activityreport" element={<ActivityReport />} />
                <Route
                  path="/productivityreport"
                  element={<ProductivityReport />}
                />
                <Route
                  path="/teamsinsightreport"
                  element={<TeamsInsightReport />}
                />
                <Route path="/appsurlsreport" element={<AppsUrlsReport />} />
                <Route path="/projectreport" element={<ProjectReport />} />
                <Route path="/logsreport" element={<LogsReport />} />
                <Route path="/devicereport" element={<DeviceReport />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/notebook" element={<Notebook />} />
                <Route path="/userdetail" element={<UserDetail />} />

                <Route path="/settings" element={<Settings />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/organization" element={<Organization />} />

                {/* Catch-all route for unmatched paths */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        ""
      )}
    </div>
  );
}

export default SidebarMenu;
