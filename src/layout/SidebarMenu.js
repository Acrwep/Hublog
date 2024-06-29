import "../App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenuList from "./SidebarMenuList";
import LogoImg from "../../src/assets/images/logo-re-3.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
//pages
import Login from "../Components/Login/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../Components/Attendance/Attendance";
import LiveStream from "../pages/Real Time/LiveStream";
import Field from "../pages/Real Time/Field";
import Timeline from "../Components/Analytics/Timeline";
import Activity from "../Components/Analytics/Activity";
import Productivity from "../Components/Analytics/Productivity";
import Screenshots from "../Components/Analytics/Screenshots";
import Apps$Url from "../Components/Analytics/Apps$Url";
import Wellness from "../Components/Analytics/Wellness";
import Devices from "../Components/Devices/Devices";
import Alert from "../Components/Alert/Alert";
import Reports from "../Components/Reports/Reports";
import Projects from "../Components/Projects/Project";
import Notebook from "../Components/Notebook/Notebook";
import Settings from "../Components/Settings/Setting";
import UserDetail from "../Components/UserDetail/UserDetail";
import "./sidebarstyles.css";

const { Header, Sider, Content } = Layout;
function SidebarMenu() {
  // const accessToken = localStorage.getItem("Accesstoken");
  // console.log("Access Token:::::", accessToken);
  const navigation = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [avatarName, setAvatarName] = useState("");
  const [screenWidth, setScreenWidth] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("Logout");
    localStorage.clear();
    navigation("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="#">
          Explorer
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="#">
          User
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="#">
          Apps&URLs
        </a>
      ),
    },
  ];

  const profileItems = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" onClick={handleLogout}>
          Logout
        </a>
      ),
    },
  ];
  const menu = {
    items: profileItems,
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

  return (
    <div>
      {location.pathname === "/login" ? (
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical">
              <img src={LogoImg} className="project_logo" />
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
                  <div className="searchbarandexplore_container">
                    <div className="searchbar_container">
                      <Space direction="vertical">
                        <Input
                          placeholder="Discover it all: feature, settings, report"
                          className="navbar_discoversearchnbar"
                          prefix={
                            <SearchOutlined className="site-form-item-icon" />
                          }
                        />
                      </Space>
                    </div>
                    <div className="explore_container">
                      <Space direction="vertical">
                        <Space wrap>
                          <Dropdown menu={{ items }} placement="bottomLeft">
                            <Button className="explore_button">
                              <div style={{ display: "flex" }}>
                                <p>Explorer</p>
                                <DownOutlined className="navbar_explorericon" />
                              </div>
                            </Button>
                          </Dropdown>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11}>
                  <div className="logoutavatar_container">
                    <Space direction="vertical">
                      <Space wrap>
                        <Dropdown menu={menu} placement="bottomRight" arrow>
                          <Avatar
                            size={40}
                            style={{
                              backgroundColor: "#25a17d",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          >
                            {/* {avatarName} */}B
                          </Avatar>
                        </Dropdown>
                      </Space>
                    </Space>
                  </div>
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
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/livestream" element={<LiveStream />} />
                <Route path="/field" element={<Field />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/productivity" element={<Productivity />} />
                <Route path="/screenshots" element={<Screenshots />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/app$url" element={<Apps$Url />} />

                <Route path="/devices" element={<Devices />} />
                <Route path="/alert" element={<Alert />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/notebook" element={<Notebook />} />
                <Route path="/userdetail" element={<UserDetail />} />

                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
}

export default SidebarMenu;
