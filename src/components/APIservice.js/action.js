import axios from "axios";

// const API_URL = process.env.API_URL || "http://43.204.54.223:8001";
const API_URL = process.env.API_URL || "https://localhost:44318";

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
      config.headers.Authorization = `Bearer ${AccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const LoginApi = async (loginCredential) => {
  try {
    const response = await api.post("api/Login/AdminLogin", loginCredential);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScreenShots = async (request) => {
  try {
    const response = await api.post("/api/Admin/GetScreenShots", request);
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
//attendance
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
