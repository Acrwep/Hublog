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

  useEffect(() => {
    const pathName = location.pathname.split("/")[1];
    console.log("Current PathName", pathName);

    const getuserInfo = localStorage.getItem("LoginUserInfo");
    console.log("userInfooooinsidebar", getuserInfo);
    const userDetails = JSON.parse(getuserInfo);
    setRoleId(userDetails.roleId);

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
    console.log("menuuuuuuu", e);
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
            style={{
              marginBottom: "12px",
              display:
                roleId === 3 && ["Real Time", "Analytics"].includes(item.title)
                  ? "none"
                  : "block",
            }}
          >
            {item.submenu.map((subItem) => (
              <Menu.Item key={subItem.path} icon={subItem.icon}>
                <Link to={`/${subItem.path}`}>{subItem.title}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.path}
          icon={item.icon}
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
          <Link to={`/${item.path}`}>{item.title}</Link>
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
