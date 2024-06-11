import Alert from "../pages/Alert";
import Activity from "../pages/analytics/Activity";
import Apps$Url from "../pages/analytics/Apps$Url";
import Productivity from "../pages/analytics/Productivity";
import Screenshots from "../pages/analytics/Screenshots";
import Timeline from "../pages/analytics/Timeline";
import Wellness from "../pages/analytics/Wellness";
import Attendance from "../pages/attendance/Attendance";
import Dashboard from "../pages/Dashboard";
import Devices from "../pages/Devices";
import Login from "../pages/Login/Login";
import Notebook from "../pages/Notebook";
import Project from "../pages/Project";
import Field from "../pages/Real Time/Field";
import LiveStream from "../pages/Real Time/LiveStream";
import Reports from "../pages/Reports";
import Setting from "../pages/setting/Setting";
import UserDetail from "../pages/userDetail/UserDetail";

export const LoginRoutingConfig = [
  { name: "Login", path: "/login", component: <Login /> },
];

export const RoutingConfig = [
  {
    title: "Dashboard",
    path: "dashboard",
    component: <Dashboard />,
  },
  {
    title: "Dashboard",
    path: "",
    component: <Dashboard />,
  },
  {
    title: "Attendance",
    path: "attendance",
    component: <Attendance />,
  },
  {
    title: "Livestream",
    path: "livestream",
    component: <LiveStream />,
  },
  {
    title: "Field",
    path: "field",
    component: <Field />,
  },
  {
    title: "Timeline",
    path: "timeline",
    component: <Timeline />,
  },
  {
    title: "Activity",
    path: "activity",
    component: <Activity />,
  },
  {
    title: "Productivity",
    path: "productivity",
    component: <Productivity />,
  },
  {
    title: "Screenshots",
    path: "screenshots",
    component: <Screenshots />,
  },
  {
    title: "Wellness",
    path: "wellness",
    component: <Wellness />,
  },
  {
    title: "Apps & URLs",
    path: "app$url",
    component: <Apps$Url />,
  },
  {
    title: "Devices",
    path: "devices",
    component: <Devices />,
  },
  {
    title: "Alert",
    path: "alert",
    component: <Alert />,
  },
  {
    title: "Reports",
    path: "reports",
    component: <Reports />,
  },
  {
    title: "Project",
    path: "projects",
    component: <Project />,
  },
  {
    title: "Notebook",
    path: "notebook",
    component: <Notebook />,
  },
  {
    title: "User Detail",
    path: "userdetail",
    component: <UserDetail />,
  },
  {
    title: "Setting",
    path: "setting",
    component: <Setting />,
  },
];
