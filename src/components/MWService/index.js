import axios from "axios";
import fileDownload from "react-file-download";
import config from "../../utils/config";
import AuthService from "../AuthService";

const getHeaders = (isPublic) => {
  const auth = new AuthService();

  const headers = { "Content-Type": "application/json" };
  if (isPublic || !auth.loggedIn()) {
    // headers.Authorization = `Basic ${btoa(
    //   `${config.basicAuth.username}:${config.basicAuth.password}`
    // )}`;
    headers["user-id"] = "public";
  } else {
    headers.Authorization = `Bearer ${auth.getToken()}`;
    headers["user-id"] = auth.getProfile().email;
  }
  return headers;
};

const getFullUrl = (url, isPublic = false) =>
  isPublic
    ? `${config.middleware.url}public/${url}`
    : `${config.middleware.url}${url}`;

class MWService {
  login = async (username, password) => {
    const auth = new AuthService();
    const response = await this.post("Login/AdminLogin", {
      username,
      password,
    });
    if (response.data.token) {
      auth.setToken(response.data.token, response.data.user);
    } else {
      auth.clearToken();
    }
    return Promise.resolve(response);
  };

  upload = (file, params = {}) =>
    axios.post(`${config.middleware.url}uploadfile`, file, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  download = (filename, bucket = "public", downloadName = filename) =>
    axios
      .get(`${config.middleware.url}downloadfile`, {
        params: {
          filename,
          bucket,
        },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", downloadName); // or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

  get = (url, isPublic = false) => {
    const options = {
      method: "GET",
      headers: getHeaders(isPublic),
      url: getFullUrl(url, isPublic),
    };
    return axios(options);
  };

  post = (url, data = {}, isPublic = false) => {
    const options = {
      method: "POST",
      headers: getHeaders(isPublic),
      data: JSON.stringify(data),
      url: getFullUrl(url, isPublic),
    };
    return axios(options);
  };

  put = (url, data = {}, isPublic = false) => {
    const options = {
      method: "PUT",
      headers: getHeaders(isPublic),
      data: JSON.stringify(data),
      url: getFullUrl(url, isPublic),
    };
    return axios(options);
  };

  delete = (url, data = {}, isPublic = false) => {
    const options = {
      method: "DELETE",
      headers: getHeaders(isPublic),
      data: JSON.stringify(data),
      url: getFullUrl(url, isPublic),
    };
    return axios(options);
  };

  async getAsDownloadable(url, filename = "", isPublic = false) {
    const options = {
      method: "GET",
      headers: getHeaders(isPublic),
      url: getFullUrl(url, isPublic),
    };
    const res = await axios({ ...options, responseType: "blob" });

    return new Promise((resolve) =>
      resolve(fileDownload(res.data, filename || "file.xlsx"))
    );
  }

  all = (reqs) => axios.all(reqs);
}

export default MWService;
