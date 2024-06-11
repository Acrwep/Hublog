const basicAuth = {
  username: "admin",
  password: "supersecret",
};

const jwtToken = {
  tokenStorageName: `hubloo_id_${process.env.NODE_ENV}`,
};

const API_URL = process.env.API_URL || "http://43.204.54.223:8001/api/";
const publicFeatures = ["login"];
const isPublic = (feature) =>
  publicFeatures.find((item) => item === feature) !== undefined;

export const Config = {
  jwtToken,
  basicAuth,
  isPublic,
  middleware: {
    url: API_URL,
    urlBase: API_URL.split("/").slice(0, -2).join("/"),
    basicAuth: `Basic ${btoa(`${basicAuth.username}:${basicAuth.password}`)}`,
  },
};
export default Config;
