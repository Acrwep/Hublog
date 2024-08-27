import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  usersforteamstabReducer,
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
  breakSearchValueReducer,
  roleReducer,
  roleSearchValueReducer,
} from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: usersReducer,
    usersforteamstabs: usersforteamstabReducer,
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
    breaksearchvalue: breakSearchValueReducer,
  },
});
