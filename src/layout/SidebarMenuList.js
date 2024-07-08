import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdAnalytics,
  MdOutlineDevicesOther,
  MdSettings,
  MdRocketLaunch,
  MdScreenshotMonitor,
} from "react-icons/md";
import {
  TbActivityHeartbeat,
  TbBellFilled,
  TbCirclesFilled,
  TbReport,
  TbAppWindowFilled,
} from "react-icons/tb";
import { FaAppStore } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { RiSuitcaseFill, RiUser3Fill } from "react-icons/ri";
import { GiNotebook, GiLotus } from "react-icons/gi";
import { CiStreamOn } from "react-icons/ci";
import { GrMapLocation } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { FiActivity } from "react-icons/fi";
import { Menu } from "antd";

const { SubMenu } = Menu;

const SidebarMenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  const SideMenuConfig = {
    1: {
      title: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
      path: "dashboard",
    },
    2: {
      title: "Attendance",
      icon: <TbCirclesFilled />,
      path: "attendance",
    },
    3: {
      title: "Real Time",
      icon: <TbActivityHeartbeat />,
      submenu: [
        {
          title: "Livestream",
          icon: <CiStreamOn />,
          path: "livestream",
        },
        {
          title: "Field",
          icon: <GrMapLocation />,
          path: "field",
        },
      ],
    },
    4: {
      title: "Analytics",
      icon: <MdAnalytics />,
      submenu: [
        {
          title: "Timeline",
          icon: <VscGraphLine />,
          path: "timeline",
        },
        {
          title: "Activity",
          icon: <FiActivity />,
          path: "activity",
        },
        {
          title: "Productivity",
          icon: <MdRocketLaunch />,
          path: "productivity",
        },
        {
          title: "Screenshots",
          icon: <MdScreenshotMonitor />,
          path: "screenshots",
        },
        {
          title: "App $ URLs",
          icon: <FaAppStore />,
          path: "app$url",
        },
        {
          title: "Wellness",
          icon: <GiLotus />,
          path: "wellness",
        },
      ],
    },
    5: {
      title: "Devices",
      icon: <MdOutlineDevicesOther />,
      path: "devices",
    },
    6: {
      title: "Manual Time",
      icon: <MdTimer />,
      path: "manualtime",
    },
    7: {
      title: "Alerts",
      icon: <TbBellFilled />,
      path: "alerts",
    },
    8: {
      title: "Reports",
      icon: <TbReport />,
      path: "reports",
    },
    9: {
      title: "Projects",
      icon: <RiSuitcaseFill />,
      path: "projects",
    },
    10: {
      title: "Notebook",
      icon: <GiNotebook />,
      path: "notebook",
    },
    11: {
      title: "User Detail",
      icon: <RiUser3Fill />,
      path: "userdetail",
    },
    12: {
      title: "Settings",
      icon: <MdSettings />,
      path: "settings",
    },
  };

  useEffect(() => {
    const pathName = location.pathname.split("/")[1];
    console.log("pathnameee", pathName);
    if (pathName === "") {
      setSelectedKey("dashboard");
      return;
    }
    setSelectedKey(pathName);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
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
            style={{ marginBottom: "12px" }}
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
          style={{ marginBottom: "12px", padding: "0px 24px" }}
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
