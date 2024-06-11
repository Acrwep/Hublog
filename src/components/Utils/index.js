import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// dayjs.extend(customParseFormat);

export const dayJs = dayjs;

export const useSetState = (init = {}, clearState = false) => {
  const [thisstate, thisSetState] = useState(init);
  const setState = (newState) =>
    thisSetState((x) => (clearState ? { ...newState } : { ...x, ...newState }));
  return [{ ...thisstate }, setState];
};

export const isEmpty = (obj) => {
  if (typeof obj === "number") return false;
  if (typeof obj === "string") return obj.length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === "object")
    return (
      obj == null ||
      (Object.keys(obj).length === 0 && obj.constructor === Object)
    );
  if (typeof obj === "boolean") return false;
  return !obj;
};

export const toNumber = (val) => {
  if (isNaN(val)) return 0;
  return Number(val);
};

export const formatDate = (date = new Date(), format = "YYYY-MM-DD") => {
  const formattedDate = moment(date).format(format);
  if (formattedDate === "Invalid date") return "";
  return formattedDate;
};

export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let formattedTime = '';

  if (hours !== 0) {
    const hoursStr = String(hours).padStart(2, '0');
    formattedTime += `${hoursStr}h:`;
  }

  if (minutes !== 0 || hours !== 0) {
    const minutesStr = String(minutes).padStart(2, '0');
    formattedTime += `${minutesStr}m:`;
  }

  const secondsStr = String(remainingSeconds).padStart(2, '0');
  formattedTime += `${secondsStr}s`;

  return formattedTime;
}
