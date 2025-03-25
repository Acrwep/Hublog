import {
  MdOutlineDashboardCustomize,
  MdAnalytics,
  MdOutlineDevicesOther,
  MdSettings,
  MdRocketLaunch,
  MdScreenshotMonitor,
  MdOutlineTimeline,
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
import { FiActivity } from "react-icons/fi";
import { VscOrganization } from "react-icons/vsc";
import { PiMonitorFill } from "react-icons/pi";

export const ManagerMenuConfig = {
  1: {
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize size={17} />,
    path: "dashboard",
  },
  2: {
    title: "Attendance",
    icon: <TbCirclesFilled size={17} />,
    path: "attendance",
  },
  3: {
    title: "Real Time",
    icon: <TbActivityHeartbeat size={17} />,
    submenu: [
      {
        title: "Livestream",
        icon: <CiStreamOn size={17} />,
        path: "livestream",
      },
      {
        title: "Field",
        icon: <GrMapLocation size={17} />,
        path: "field",
      },
    ],
  },
  4: {
    title: "Analytics",
    icon: <MdAnalytics size={17} />,
    submenu: [
      {
        title: "Timeline",
        icon: <MdOutlineTimeline size={17} />,
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
        title: "Apps & URLs",
        icon: <PiMonitorFill size={17} />,
        path: "apps&urls",
      },
      {
        title: "Wellness",
        icon: <GiLotus size={17} />,
        path: "wellness",
      },
    ],
  },
  5: {
    title: "Devices",
    icon: <MdOutlineDevicesOther size={17} />,
    path: "devices",
  },
  6: {
    title: "Manual Time",
    icon: <MdTimer size={17} />,
    path: "manualtime",
  },
  7: {
    title: "Alerts",
    icon: <TbBellFilled size={17} />,
    path: "alerts",
  },
  8: {
    title: "Reports",
    icon: <TbReport size={17} />,
    path: "reports",
  },
  9: {
    title: "Projects",
    icon: <RiSuitcaseFill size={17} />,
    path: "projects",
  },
  10: {
    title: "Notebook",
    icon: <GiNotebook size={17} />,
    path: "notebook",
  },
  11: {
    title: "User Detail",
    icon: <RiUser3Fill size={17} />,
    path: "userdetail",
  },
  12: {
    title: "Organization",
    icon: <VscOrganization size={17} />,
    path: "organization",
  },
};
