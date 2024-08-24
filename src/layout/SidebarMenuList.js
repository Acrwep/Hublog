import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { SideMenuConfig } from "./SideMenuConfig";

const { SubMenu } = Menu;

const SidebarMenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("Accesstoken");
    if (accessToken === null) {
      navigate("/login");
      return;
    }
    const pathName = location.pathname.split("/")[1];
    console.log("Current PathName", pathName);

    const getItem = localStorage.getItem("LoginUserInfo");
    const userDetails = JSON.parse(getItem);
    setFirstName(userDetails.first_Name);
    setLastName(userDetails.last_Name);
    setRoleId(parseInt(userDetails.roleId));

    if (userDetails.roleId === 3 && pathName === "") {
      setSelectedKey("userdetail");
      return;
    }

    if (pathName === "") {
      setSelectedKey("dashboard");
      return;
    }
    if (
      pathName === "breakreports" ||
      pathName === "dailyattendancereport" ||
      pathName === "monthlyattendancereport" ||
      pathName === "monthlyinandoutreport" ||
      pathName === "activityreport" ||
      pathName === "productivityreport" ||
      pathName === "teamsinsightreport" ||
      pathName === "appsurlsreport" ||
      pathName === "projectreport" ||
      pathName === "logsreport" ||
      pathName === "alertreport" ||
      pathName === "devicereport"
    ) {
      setSelectedKey("reports");
      return;
    }
    setSelectedKey(pathName);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    if (
      e.key === "attendance" ||
      e.key === "devices" ||
      e.key === "manualtime" ||
      e.key === "alerts" ||
      e.key === "reports" ||
      e.key === "projects"
    ) {
      return;
    }
    navigate(`/${e.key}`);
  };

  const renderMenuItems = (menuConfig) => {
    return Object.entries(menuConfig).map(([key, item]) => {
      if (item.submenu) {
        return (
          <SubMenu
            key={key}
            icon={item.icon}
            title={item.title}
            disabled={["Real Time"].includes(item.title) ? true : false}
            style={{
              marginBottom: "12px",
              display:
                roleId === 3 && ["Real Time", "Analytics"].includes(item.title)
                  ? "none"
                  : "block",
            }}
          >
            {item.submenu.map((subItem) => (
              <Menu.Item
                key={subItem.path}
                icon={subItem.icon}
                disabled={
                  [
                    "Timeline",
                    "Activity",
                    "Productivity",
                    "App $ URLs",
                    "Wellness",
                  ].includes(subItem.title)
                    ? true
                    : false
                }
              >
                {[
                  "Timeline",
                  "Activity",
                  "Productivity",
                  "App $ URLs",
                  "Wellness",
                ].includes(subItem.title) ? (
                  <Link style={{ cursor: "default" }}>{subItem.title}</Link>
                ) : (
                  <Link to={`/${subItem.path}`}>{subItem.title}</Link>
                )}
              </Menu.Item>
            ))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.path}
          icon={item.icon}
          disabled={
            [
              "Dashboard",
              "Notebook",
              "User Detail",
              "Settings",
              "Billing",
            ].includes(item.title)
              ? false
              : true
          }
          style={{
            marginBottom: "12px",
            padding: "0px 24px",
            display:
              roleId === 3 &&
              [
                "Dashboard",
                "Attendance",
                "Devices",
                "Manual Time",
                "Alerts",
                "Reports",
                "Projects",
                "Settings",
              ].includes(item.title)
                ? "none"
                : "block",
          }}
        >
          {[
            "Attendance",
            "Devices",
            "Manual Time",
            "Alerts",
            "Reports",
            "Projects",
          ].includes(item.title) ? (
            <Link style={{ cursor: "default" }}>{item.title}</Link>
          ) : (
            <Link to={`/${item.path}`}>
              {roleId === 3 && item.title === "User Detail"
                ? firstName + " " + lastName
                : item.title}
            </Link>
          )}
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    >
      {renderMenuItems(SideMenuConfig)}
    </Menu>
  );
};

export default SidebarMenuList;
