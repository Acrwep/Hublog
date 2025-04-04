import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { SideMenuConfig } from "./SideMenuConfig";
import { ManagerMenuConfig } from "./ManagerMenuConfig";

const { SubMenu } = Menu;

const SidebarMenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerStatus, setManagerStatus] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("Accesstoken");
    const mangrStatus = localStorage.getItem("managerStatus");
    console.log("managerstatus", mangrStatus);
    setManagerStatus(mangrStatus);

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

    if (
      userDetails.roleId === 3 &&
      managerStatus === false &&
      pathName === ""
    ) {
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
      pathName === "wellnessreport" ||
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
            // disabled={["Real Time"].includes(item.title) ? true : false}
            style={{
              marginBottom: "12px",
              display:
                roleId === 3 &&
                managerStatus === "false" &&
                ["Real Time", "Analytics"].includes(item.title)
                  ? "none"
                  : "block",
            }}
          >
            {item.submenu.map((subItem) => (
              <Menu.Item
                key={subItem.path}
                icon={subItem.icon}
                disabled={["Field"].includes(subItem.title) ? true : false}
              >
                {["Field"].includes(subItem.title) ? (
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
          disabled={[""].includes(item.title) ? true : false}
          style={{
            marginBottom: "12px",
            padding: "0px 24px",
            display:
              roleId === 3 &&
              managerStatus === "false" &&
              [
                "Dashboard",
                "Attendance",
                "Devices",
                "Manual Time",
                "Alerts",
                "Reports",
                "Projects",
                "Settings",
                "Organization",
              ].includes(item.title)
                ? "none"
                : "block",
          }}
        >
          {[""].includes(item.title) ? (
            <Link style={{ cursor: "default" }}>{item.title}</Link>
          ) : (
            <Link to={`/${item.path}`}>
              {roleId === 3 &&
              managerStatus === "false" &&
              item.title === "User Detail"
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
      {renderMenuItems(
        managerStatus === "true" ? ManagerMenuConfig : SideMenuConfig
      )}
    </Menu>
  );
};

export default SidebarMenuList;
