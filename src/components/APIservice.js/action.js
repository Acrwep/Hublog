import axios from "axios";
import { Modal } from "antd";
import "../Common/commonstyles.css";

let isModalVisible = false;
let modalInstance = null; // Track modal instance for manual control

const subDomain = localStorage.getItem("subDomain");
let APIURL = "";

if (process.env.NODE_ENV === "production") {
  // APIURL = `https://${
  //   subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
  // }workstatus.qubinex.com:8086`;
  APIURL = "https://workstatus.qubinex.com:8086";
} else {
  // APIURL = `https://${
  //   subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
  // }localhost:7263`;
  APIURL = "https://localhost:7263";
}

// Create an Axios instance
const api = axios.create({
  baseURL: APIURL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

api.interceptors.request.use(
  (config) => {
    const AccessToken = localStorage.getItem("Accesstoken");
    const subDomain = localStorage.getItem("subDomain");

    console.log("AccessToken", AccessToken, subDomain);
    if (AccessToken) {
      const expired = isTokenExpired(AccessToken);
      if (expired === true) {
        ShowModal();
        return Promise.reject(new Error("Token is expired"));
      }
      config.headers.Authorization = `Bearer ${AccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const isTokenExpired = (token) => {
  if (!token) return true; // No token means it's "expired"

  try {
    // split the token into parts
    const payloadBase64 = token.split(".")[1];

    // decode the base64 payload
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // get the current time in seconds
    const currentTime = Date.now() / 1000;

    // check if the token has expired
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

const handleSessionModal = () => {
  const event = new Event("tokenExpireUpdated");
  window.dispatchEvent(event);
  if (modalInstance) {
    modalInstance.destroy(); // Manually close the modal
    modalInstance = null;
  }
  isModalVisible = false;
};

const ShowModal = () => {
  if (isModalVisible) {
    return; // Don't open a new modal if one is already visible
  }

  isModalVisible = true;

  modalInstance = Modal.warning({
    title: "Session Expired",
    centered: true,
    content: "Your session has expired. Please log in again.",
    onOk() {
      handleSessionModal();
    },
    onCancel() {
      handleSessionModal();
    },
    onClose() {
      handleSessionModal();
    },
    footer: [
      <div className="sessionmodal_okbuttonContainer">
        <button className="sessionmodal_okbutton" onClick={handleSessionModal}>
          OK
        </button>
      </div>,
    ],
  });

  return;
};

//api functions
//login
export const LoginApi = async (loginCredential) => {
  try {
    const response = await api.post("/api/Login/login", loginCredential);
    return response;
  } catch (error) {
    throw error;
  }
};

//signup
export const createOrganization = async (payload) => {
  try {
    const response = await api.post("/api/Organization/insert", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getOrganizations = async () => {
  try {
    const response = await api.get("/api/Organization/getall");
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkDomain = async (domain) => {
  try {
    const response = await api.get(
      `/api/Organization/CheckDomain?domain=${domain}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//dashboard goals
export const getGoalsDetails = async (goalspayload) => {
  try {
    const response = await api.get("/api/Goal/GetGoalsDetails", {
      params: goalspayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//Attendance dashboard
export const getAttendanceSummary = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/AllAttendanceSummary`,
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAttendanceTrends = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/AllAttendanceSummary`,
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAttendanceAndBreakSummary = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/AttendanaceAndBreakSummary`,
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getLateArrivals = async (payload) => {
  try {
    const response = await api.get(`/api/AttendanceDashboard/LateArrivals`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAttendanceBreakTrends = async (payload) => {
  try {
    const response = await api.get(`/api/AttendanceDashboard/BreakTrends`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// designation
export const getDesignation = async (organizationId, name) => {
  try {
    const response = await api.get(
      `/api/Designation/GetDesignationAll?organizationId=${organizationId}&searchQuery=${
        name ? name : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createDesignation = async (designpayload) => {
  try {
    const response = await api.post(
      "/api/Designation/InsertDesignation",
      designpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateDesignation = async (designpayload) => {
  try {
    const response = await api.put(
      "/api/Designation/UpdateDesignation",
      designpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteDesignation = async (organizationId, designationId) => {
  try {
    const response = await api.delete(
      `/api/Designation/DeleteDesignation?organizationId=${organizationId}&designationId=${designationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//teams
export const getTeams = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/Team/GetTeam?organizationId=${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createTeams = async (teampayload) => {
  try {
    const response = await api.post("/api/Team/CreateTeam", teampayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateTeams = async (teamId, teampayload) => {
  try {
    const response = await api.put(
      `/api/Team/UpdateTeam?id=${teamId}`,
      teampayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteTeam = async (teamId) => {
  try {
    const response = await api.delete(`/api/Team/DeleteTeam?id=${teamId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//role
export const getRole = async () => {
  try {
    const response = await api.get("/api/Role/GetRoleAll");
    return response;
  } catch (error) {
    throw error;
  }
};
export const createRole = async (rolepayload) => {
  try {
    const response = await api.post("/api/Role/InsertRole", rolepayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateRole = async (teamID, rolepayload) => {
  try {
    const response = await api.put("/api/Role/UpdateRole", rolepayload);
    return response;
  } catch (error) {
    throw error;
  }
};

//users
export const getAllUsers = async (organizationId, name) => {
  try {
    const response = await api.get(
      `api/Users/GetAllUsers?organizationId=${organizationId}&searchQuery=${
        name ? name : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (organizationId, name) => {
  try {
    const response = await api.get(
      `api/Users/GetActiveUsers?organizationId=${organizationId}&searchQuery=${
        name ? name : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUsersByTeamId = async (teamId) => {
  try {
    const response = await api.get(
      `api/Users/GetUsersByTeamId?TeamId=${teamId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (userpayload) => {
  try {
    const response = await api.post("/api/Users/InsertUser", userpayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (userpayload) => {
  try {
    const response = await api.put("/api/Users/UpdateUser", userpayload);
    return response;
  } catch (error) {
    throw error;
  }
};

//userdetail attendance
export const getUserAttendance = async (payload) => {
  try {
    const response = await api.get(`api/Users/GetUserAttendanceDetails`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserPunchInOutDetails = async (payload) => {
  try {
    const response = await api.get(`api/Users/GetUserPunchInOutDetails`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//userdetail break
export const getUserBreak = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(
      `api/Users/GetUserBreakRecordDetails?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserTotalBreak = async (payload) => {
  try {
    const response = await api.get(`api/Users/GetTotalBreak`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//settings break
export const getBreak = async (payload) => {
  try {
    const response = await api.get("/api/Admin/GetBreakMaster", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createBreak = async (breakpayload) => {
  try {
    const response = await api.post(
      "/api/Admin/InsertBreakMaster",
      breakpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateBreak = async (breakpayload) => {
  try {
    const response = await api.put(
      "/api/Admin/UpdateBreakMaster",
      breakpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//settings shifts
export const createShift = async (payload) => {
  try {
    const response = await api.post("/api/Admin/InsertShiftMaster", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateShift = async (payload) => {
  try {
    const response = await api.put("/api/Admin/UpdateShiftMaster", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getShifts = async (organizationId, name) => {
  try {
    const response = await api.get(
      `/api/Admin/GetShiftMaster?organizationId=${organizationId}&searchQuery=${
        name ? name : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteShift = async (orgId, shiftId) => {
  try {
    const response = await api.delete(
      `/api/Admin/DeleteShiftMaster?organizationId=${orgId}&shiftId=${shiftId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//settings alertrules
export const getAlertRules = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/Alert/GetAlertRule?organizationId=${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createAlertRules = async (alertpayload) => {
  try {
    const response = await api.post("/api/Alert/InsertAlertRule", alertpayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateAlertRules = async (alertpayload) => {
  try {
    const response = await api.put("/api/Alert/UpdateAlertRule", alertpayload);
    return response;
  } catch (error) {
    throw error;
  }
};
//settings wellness
export const getWellnessRules = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/Wellness/GetWellness?organizationId=${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createWellnessRules = async (wellnesspayload) => {
  try {
    const response = await api.post(
      "/api/Wellness/insertWellness",
      wellnesspayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateWellnessRules = async (organizationId, wellnesspayload) => {
  try {
    const response = await api.put(
      `/api/Wellness/UpdateWellness?organizationId=${organizationId}`,
      wellnesspayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//settings goals
export const createGoals = async (payload) => {
  try {
    const response = await api.post("/api/Goal/InsertGoals", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateGoals = async (payload) => {
  try {
    const response = await api.put("/api/Goal/UpdateGoals", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGoals = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/Goal/GetGoals?organizationId=${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//settings productivity rules
export const createDefaultCategories = async (organizationId) => {
  try {
    const response = await api.post(
      `/api/Productivity/InsertDefaultCategoryRecords/${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCategories = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/Productivity/Category?organizationId=${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteImbuildAppOrUrl = async (Id) => {
  try {
    const response = await api.delete(
      `/api/Productivity/DeleteImbuildAppOrUrl?id=${Id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createDefaultAppsandUrls = async (organizationId) => {
  try {
    const response = await api.post(
      `/api/Productivity/InsertDefaultAppsAndUrlsRecords/${organizationId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const assignProductivityStatus = async (categoryId, productivityId) => {
  try {
    const response = await api.put(
      `/api/Productivity/UpdateProductivityId?categoryId=${categoryId}&productivityId=${productivityId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createImbuildAppsandUrls = async (payload) => {
  try {
    const response = await api.post(
      "/api/Productivity/AddImbuildAppsAndUrls",
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getImbuildAppsandUrls = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/GetImbuildAppsAndUrls", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateImbuildAppsandUrls = async (id, payload) => {
  try {
    const response = await api.put(
      `/api/Productivity/InsertImbuildAppsAndUrls/${id}`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//reports
//daily attendance report
export const getDailyAttendanceReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/AttendanceReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//break report
export const getBreakReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/BreakReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//monthly attendance report
export const getMonthlyAttendanceReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/GetMonthlyAttendanceReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//monthly InandOut report
export const getMonthlyInandOutReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/GetMonthlyInOutReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//monthly InandOut report
export const getLateAttendanceReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/LateAttendance`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAppsandUrlsReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/combined`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//dynamic report
export const getDynamicReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/DynamicReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDynamicDetailedReport = async (reportPayload) => {
  try {
    const response = await api.get(`/api/Report/DynamicDetailReport`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//notebook
export const getNotebook = async (reportPayload) => {
  try {
    const response = await api.get(`/api/NoteBook/GetbyId`, {
      params: reportPayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const createNotebook = async (notepayload) => {
  try {
    const response = await api.post("/api/NoteBook/CreateNote", notepayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateNotebook = async (noteid, notepayload) => {
  try {
    const response = await api.put(`/api/NoteBook/${noteid}`, notepayload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteNotebook = async (noteid) => {
  try {
    const response = await api.delete(`/api/NoteBook/${noteid}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//devices
export const getSystemInfo = async (payload) => {
  try {
    const response = await api.get("/api/SystemInfo/GetSystemInfo", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDeviceInfoCount = async (payload) => {
  try {
    const response = await api.get("/api/SystemInfo/GetSystemInfoCount", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//analytics --- module api's --- start
//screenshot
export const getScreenShots = async (userId, organizationId, date) => {
  try {
    const response = await api.get(
      `/api/Screenshot/GetUserScreenShots?userId=${userId}&organizationId=${organizationId}&date=${date}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//apps and urls
export const getAppsUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetAppUsage`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUrlsUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetUrlUsage`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTopAppsUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetTopAppUsage`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTopUrlsUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetTopUrlUsage`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTopAppAndUrlsUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetTopAppAndUrlUsage`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTopCategoryUsage = async (payload) => {
  try {
    const response = await api.get(`/api/AppsUrls/GetTopCategory`, {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//productivity
export const getProductivityBreakdown = async (payload) => {
  try {
    const response = await api.get(
      "/api/Productivity/GetProductivityBreakDown",
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTeamwiseProductivity = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/Teamwise_Productivity", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProductivityOutliers = async (payload) => {
  try {
    const response = await api.get(
      "/api/Productivity/Most&Least_Teamwise_Productivity",
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProductivityWorktimeTrends = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/Total_Working_Time", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProductivityTrend = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/GetProductivity_Trend", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProductivityEmployeesList = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/GetEmployeeList", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//activity
export const getActivityBreakdown = async (payload) => {
  try {
    const response = await api.get("/api/Activity/GetActivityBreakDown", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getActivityTrend = async (payload) => {
  try {
    const response = await api.get("/api/Activity/Date_wise_Activity", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getActivityEmployeeslist = async (payload) => {
  try {
    const response = await api.get("/api/Activity/GetActivityEmployeeList", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//wellness
export const getWellnessSummary = async (payload) => {
  try {
    const response = await api.get("/api/Wellness/GetWellnessSummary", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getWellnessWorktimeTrends = async (payload) => {
  try {
    const response = await api.get("/api/Wellness/GetWellnessTimeTrend", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getWellnessEmployeeDetails = async (payload) => {
  try {
    const response = await api.get("/api/Wellness/GetWellnessUserDetails", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//timeline
export const getEmployeeTimeline = async (payload) => {
  try {
    const response = await api.get("/api/Activity/GetEmployeeTimeLine", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//analytics --- module api's --- end

//alerts
export const getAlerts = async (payload) => {
  try {
    const response = await api.get("/api/Alert/GetAlert", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//manual time
export const getManualtime = async (payload) => {
  try {
    const response = await api.get("/api/Manual_Time/get_Manual_Time", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//projects
export const createProject = async (projectpayload) => {
  try {
    const response = await api.post(
      "/api/Project/InsertProject",
      projectpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateProject = async (projectpayload) => {
  try {
    const response = await api.put(
      "/api/Project/UpdateProject",
      projectpayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjects = async (projectpayload) => {
  try {
    const response = await api.get("/api/Project/GetProjects", {
      params: projectpayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteProject = async (deletepayload) => {
  try {
    const response = await api.delete("/api/Project/DeleteProject", {
      params: deletepayload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//forgot password
export const userEmailValidate = async (email) => {
  try {
    const response = await api.get(
      `/api/ForgotPassword/CheckEmailExists?email=${email}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (payload) => {
  try {
    const response = await api.put(
      "/api/ForgotPassword/update-password",
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//punchin users
export const getPunchInUsers = async (payload) => {
  try {
    const response = await api.get("/api/Users/GetPunchIn_Users", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//otp verification
export const sendOTP = async (payload) => {
  try {
    const response = await api.post("/api/OTP/send-otp", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const OtpValidate = async (payload) => {
  try {
    const response = await api.post("/api/OTP/validate-otp", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
