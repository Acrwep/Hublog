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
      console.log("Token expire status", expired);
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
    modalInstance.destroy(); // manually close the modal
  }
};

const ShowModal = () => {
  isModalVisible = true;

  modalInstance = Modal.warning({
    title: "Session Expired",
    centered: true,
    content: "Your session has expired. Please log in again.",
    onOk() {
      handleSessionModal();
    },
    onCancel() {
      isModalVisible = false;
    },
    onClose() {
      isModalVisible = false;
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
    const response = await api.post("/api/Login/Login", loginCredential);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScreenShots = async (userId, organizationId, date) => {
  try {
    const response = await api.get(
      `/api/Users/GetUserScreenShots?userId=${userId}&organizationId=${organizationId}&date=${date}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// designation
export const getDesignation = async () => {
  try {
    const response = await api.get("/api/Designation/GetDesignationAll");
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
export const updateTeams = async (teamID, teampayload) => {
  try {
    const response = await api.put(
      `/api/Team/UpdateTeam/${teamID}`,
      teampayload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//role
export const getRole = async () => {
  try {
    const response = await api.get("api/Role/GetRoleAll");
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
export const getUsers = async () => {
  try {
    const response = await api.get("api/Users/GetAllUsers");
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
export const getUserAttendance = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(
      `api/Users/GetUserAttendanceDetails?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
    );
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
//settings break
export const getBreak = async () => {
  try {
    const response = await api.get("/api/Admin/GetAllBreakMasters");
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
