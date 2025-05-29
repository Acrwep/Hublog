import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { SideMenuConfig } from "./SideMenuConfig";
import { ManagerMenuConfig } from "./ManagerMenuConfig";
import { checkDomain } from "../Components/APIservice.js/action";

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
    const mangrStatus = localStorage.getItem("managerStatus");
    console.log("managerstatus", mangrStatus);
    setManagerStatus(mangrStatus);

    // checkDomainName();

    // if (
    //   (getSubDomainfromLocal === "null" || getSubDomainfromLocal === null) &&
    //   location.pathname !== "/portal"
    // ) {
    //   window.location.href = process.env.REACT_APP_PORTAL_URL;
    //   return;
    // } else if (accessToken === null) {
    //   navigate("/login");
    //   return;
    // }

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

  const getSubdomain = () => {
    const hostName = window.location.hostname;
    const domain = "localtest.me";

    if (hostName.endsWith(domain)) {
      const hostNameParts = hostName.split(".");
      const domainParts = domain.split(".");
      const subdomainParts = hostNameParts.slice(
        0,
        hostNameParts.length - domainParts.length
      );
      const subdomain = subdomainParts.join(".");
      return subdomain || null;
    } else {
      return null;
    }
  };

  const checkDomainName = async () => {
    const subdomain = getSubdomain();
    try {
      const response = await checkDomain(subdomain);
      console.log("domain response", response);
    } catch (error) {
      console.log("domain rror", error);
      window.location.href = process.env.REACT_APP_PORTAL_URL;
    }
  };

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
        return {
          key,
          icon: item.icon,
          label: item.title,
          children: item.submenu.map((subItem) => ({
            key: subItem.path,
            icon: subItem.icon,
            label: ["Field"].includes(subItem.title) ? (
              <span style={{ cursor: "default" }}>{subItem.title}</span>
            ) : (
              <Link to={`/${subItem.path}`}>{subItem.title}</Link>
            ),
            disabled: ["Field"].includes(subItem.title),
          })),
          style:
            roleId === 3 &&
            managerStatus === "false" &&
            ["Real Time", "Analytics"].includes(item.title)
              ? { display: "none" }
              : {},
        };
      }

      return {
        key: item.path,
        icon: item.icon,
        label:
          roleId === 3 &&
          managerStatus === "false" &&
          item.title === "User Detail" ? (
            `${firstName} ${lastName}`
          ) : item.title === "" ? (
            <span style={{ cursor: "default" }}>{item.title}</span>
          ) : (
            <Link to={`/${item.path}`}>{item.title}</Link>
          ),
        style:
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
            ? { display: "none" }
            : { marginBottom: "12px", padding: "0px 24px" },
        disabled: item.title === "",
      };
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={renderMenuItems(
        managerStatus === "true" ? ManagerMenuConfig : SideMenuConfig
      )}
    />
  );
};

export default SidebarMenuList;
