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
  userAppUsageReducer,
  userUrlUsageReducer,
  settingsBreakReducer,
  breakSearchValueReducer,
  roleReducer,
  roleSearchValueReducer,
  datewiseAttendanceReducer,
  datewiseAttendanceAbsentReducer,
  datewiseAttendanceUsersReducer,
  datewiseAttendanceTeamValueReducer,
  datewiseAttendanceUserValueReducer,
  datewiseAttendanceDateValueReducer,
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
    userappsusage: userAppUsageReducer,
    userurlsusage: userUrlUsageReducer,
    settingsBreak: settingsBreakReducer,
    breaksearchvalue: breakSearchValueReducer,
    datewiseattendance: datewiseAttendanceReducer,
    datewiseattendanceusers: datewiseAttendanceUsersReducer,
    datewiseattendanceabsent: datewiseAttendanceAbsentReducer,
    datewiseattendanceteamvalue: datewiseAttendanceTeamValueReducer,
    datewiseattendanceuservalue: datewiseAttendanceUserValueReducer,
    datewiseattendancedatevalue: datewiseAttendanceDateValueReducer,
  },
});
