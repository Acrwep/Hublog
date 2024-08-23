import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  userSearchValueReducer,
  designationReducer,
  duplicateDesignationReducer,
  activeDesignationReducer,
  designationSearchValueReducer,
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
    duplicatedesignation: duplicateDesignationReducer,
    activedesignation: activeDesignationReducer,
    designationsearchvalue: designationSearchValueReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    roles: roleReducer,
    rolesearchvalue: roleSearchValueReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    settingsBreak: settingsBreakReducer,
  },
});
