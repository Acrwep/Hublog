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
    const response = await api.post("api/Login/UserLogin", loginCredential);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (userDetails) => {
  try {
    const response = await api.post("/api/Admin/GetUsers", userDetails);
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
export const createDesignation = async (designrequest) => {
  try {
    const response = await api.post(
      "/api/Designation/InsertDesignation",
      designrequest
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateDesignation = async (designrequest) => {
  try {
    const response = await api.put(
      "/api/Designation/UpdateDesignation",
      designrequest
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
export const createTeams = async (teamrequest) => {
  try {
    const response = await api.post("/api/Team/CreateTeam", teamrequest);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateTeams = async (teamrequest) => {
  try {
    const response = await api.post("/api/Team/UpdateTeam", teamrequest);
    return response;
  } catch (error) {
    throw error;
  }
};
