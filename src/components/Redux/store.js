import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  designationReducer,
  teamsReducer,
  teamMemberReducer,
  userAttendanceReducer,
  userBreakReducer,
  settingsBreakReducer,
  userInfoReducer,
} from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: usersReducer,
    designation: designationReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    settingsBreak: settingsBreakReducer,
    userInfo: userInfoReducer,
  },
});
