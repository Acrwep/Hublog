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
import { RiSuitcaseFill, RiUser3Fill } from "react-icons/ri";
import { GiNotebook, GiLotus } from "react-icons/gi";
import { CiStreamOn } from "react-icons/ci";
import { GrMapLocation } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { LiaAsteriskSolid } from "react-icons/lia";

export const SideMenuConfig = {
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
        icon: <LiaAsteriskSolid />,
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
        icon: <TbAppWindowFilled />,
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
    title: "Alert",
    icon: <TbBellFilled />,
    path: "alert",
  },
  7: {
    title: "Reports",
    icon: <TbReport />,
    path: "reports",
  },
  8: {
    title: "Projects",
    icon: <RiSuitcaseFill />,
    path: "projects",
  },
  9: {
    title: "Notebook",
    icon: <GiNotebook />,
    path: "notebook",
  },
  10: {
    title: "User Detail",
    icon: <RiUser3Fill />,
    path: "userdetail",
  },
  11: {
    title: "Setting",
    icon: <MdSettings />,
    path: "setting",
  },
};
