import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  userSearchValueReducer,
  designationReducer,
  activeDesignationReducer,
  designationSearchValueReducer,
  teamsReducer,
  activeTeamReducer,
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
    designationsearchvalue: designationSearchValueReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    activeteams: activeTeamReducer,
    roles: roleReducer,
    rolesearchvalue: roleSearchValueReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    settingsBreak: settingsBreakReducer,
  },
});
