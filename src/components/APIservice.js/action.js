import axios from "axios";
import { Modal } from "antd";
import "../Common/commonstyles.css";

let isModalVisible = false;
let modalInstance = null; // Track modal instance for manual control

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const AccessToken = localStorage.getItem("Accesstoken");

    console.log("AccessToken", AccessToken);
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
export const LoginApi = async (loginCredential) => {
  try {
    const response = await api.post("/api/Login/login", loginCredential);
    return response;
  } catch (error) {
    throw error;
  }
};
//dashboard
export const getTopProductivityTeams = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/top-productivity-Teams`,
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getLeastProductivityTeams = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/Least-Productivity-Teams`,
      {
        params: payload,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//Attendance dashboard
export const getAttendanceSummary = async (payload) => {
  try {
    const response = await api.get(
      `/api/AttendanceDashboard/dashboard-summary`,
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
//analytics
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
//apps
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
//urls
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
export const getUsers = async (organizationId, name) => {
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
// ?userId=${userId}&startDate=${startDate}&endDate=${endDate}
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
export const getBreak = async (name) => {
  try {
    const response = await api.get(
      `/api/Admin/GetBreakMaster?seachQuery=${name ? name : ""}`
    );
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
export const getDeviceInfo = async (payload) => {
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
//settings productivity rules
export const getCategories = async (payload) => {
  try {
    const response = await api.get("/api/Productivity/Category", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateProductivity = async (categoryId, productivityId) => {
  try {
    const response = await api.put(
      `/api/Productivity/UpdateProductivityId?categoryId=${categoryId}&productivityId=${productivityId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getImbuildAppsandUrls = async () => {
  try {
    const response = await api.get("/api/Productivity/GetImbuildAppsAndUrls");
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
