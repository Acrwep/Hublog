import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  designationReducer,
  activeDesignationReducer,
  teamsReducer,
  teamMemberReducer,
  userAttendanceReducer,
  userBreakReducer,
  settingsBreakReducer,
  roleReducer,
} from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: usersReducer,
    designation: designationReducer,
    activedesignation: activeDesignationReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    roles: roleReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    settingsBreak: settingsBreakReducer,
  },
});
