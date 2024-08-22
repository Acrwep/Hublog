import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  userSearchValueReducer,
  designationReducer,
  activeDesignationReducer,
  teamsReducer,
  teamMemberReducer,
  userAttendanceReducer,
  userBreakReducer,
  settingsBreakReducer,
  roleReducer,
  roleSearchValueReducer,
} from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: usersReducer,
    usersearchvalue: userSearchValueReducer,
    designation: designationReducer,
    activedesignation: activeDesignationReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    roles: roleReducer,
    rolesearchvalue: roleSearchValueReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    settingsBreak: settingsBreakReducer,
  },
});
