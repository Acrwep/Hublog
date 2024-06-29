import "../App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenuList from "./SidebarMenuList";
import LogoImg from "../../src/assets/images/logo-re-3.png";
//sidebar
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/attendance/Attendance";
import LiveStream from "../pages/Real Time/LiveStream";
import Field from "../pages/Real Time/Field";
import Timeline from "../pages/analytics/Timeline";
import Activity from "../pages/analytics/Activity";
import Productivity from "../pages/analytics/Productivity";
import Screenshots from "../pages/analytics/Screenshots";
import Wellness from "../pages/analytics/Wellness";
import Apps$Url from "../pages/analytics/Apps$Url";
import Devices from "../pages/Devices";
import Alert from "../pages/Alert";
import Reports from "../pages/Reports";
import Project from "../pages/Project";
import Notebook from "../pages/Notebook";
import Setting from "../pages/setting/Setting";
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
import UserDetail from "../pages/UserDetail/UserDetail";
import "./sidebarstyles.css";
import Login from "../pages/Login/Login";
const { Header, Sider, Content } = Layout;

//pages
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
              <img
                src={LogoImg}
                alt="profile_image"
                style={{
                  width: "182px",
                  padding: "12px 21px",
                }}
              />
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
                            }}
                          >
                            {avatarName}
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
                <Route path="/projects" element={<Project />} />
                <Route path="/notebook" element={<Notebook />} />
                <Route path="/userdetail" element={<UserDetail />} />

                <Route path="/settings" element={<Setting />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
}

export default SidebarMenu;
