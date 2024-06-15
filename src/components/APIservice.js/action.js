import axios from "axios";

const API_URL = process.env.API_URL || "http://43.204.54.223:8001";

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
    const response = await api.post("/api/Login/AdminLogin", loginCredential);
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
