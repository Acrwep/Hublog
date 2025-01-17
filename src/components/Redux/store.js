import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  usersCountReducer,
  attendanceSummaryReducer,
  todayattendanceReducer,
  attendancetrendsReducer,
  summaryattendancetrendsReducer,
  latearrivalReducer,
  attendanceandbreaksummaryReducer,
  usersforteamstabReducer,
  userSearchValueReducer,
  designationReducer,
  designationCountReducer,
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
  datewiseAttendancePresentListReducer,
  datewiseAttendanceAbsentReducer,
  datewiseAttendanceUsersReducer,
  datewiseAttendanceTeamValueReducer,
  datewiseAttendanceUserValueReducer,
  datewiseAttendanceDateValueReducer,
  userTotalBreakReducer,
  categoriesReducer,
  alertRulesReducer,
  wellnessRulesReducer,
  activityBreakdownReducer,
  activityTeamlevelBreakdownReducer,
  teamwiseActivityReducer,
  activityWorktimeTrendsReducer,
  activityTrendsReducer,
  mostActivityTeamsReducer,
  leastActivityTeamsReducer,
  activityEmployeesListReducer,
  imbuildAppsandUrlsReducer,
  productivityBreakdownReducer,
  teamwiseProductivityReducer,
  mostProductivityTeamsReducer,
  leastProductivityTeamsReducer,
  productivityWorktimeTrendsReducer,
  productivityTrendReducer,
  productivityEmployeelistReducer,
  imbuildAppsandUrlsCountReducer,
  mappingSearchValueReducer,
  mappingShowIdReducer,
  mappingStatusIdReducer,
} from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: usersReducer,
    userscount: usersCountReducer,
    usersforteamstabs: usersforteamstabReducer,
    usersearchvalue: userSearchValueReducer,
    designation: designationReducer,
    designationcount: designationCountReducer,
    activedesignation: activeDesignationReducer,
    designationsearchvalue: designationSearchValueReducer,
    teams: teamsReducer,
    teamMembers: teamMemberReducer,
    latearrival: latearrivalReducer,
    attendancesummary: attendanceSummaryReducer,
    todayattendance: todayattendanceReducer,
    attendancetrends: attendancetrendsReducer,
    summaryattendancetrends: summaryattendancetrendsReducer,
    attendanceandbreaksummary: attendanceandbreaksummaryReducer,
    activeteams: activeTeamReducer,
    roles: roleReducer,
    categories: categoriesReducer,
    alertrules: alertRulesReducer,
    wellnessrules: wellnessRulesReducer,
    activitybreakdown: activityBreakdownReducer,
    activityteamlevelbreakdown: activityTeamlevelBreakdownReducer,
    teamwiseactivity: teamwiseActivityReducer,
    activityworktimetrends: activityWorktimeTrendsReducer,
    activitytrends: activityTrendsReducer,
    mostactivityteams: mostActivityTeamsReducer,
    leastactivityteams: leastActivityTeamsReducer,
    activityemployeeslist: activityEmployeesListReducer,
    imbuildappsandurls: imbuildAppsandUrlsReducer,
    imbuildappsandurlscount: imbuildAppsandUrlsCountReducer,
    mappingsearchvalue: mappingSearchValueReducer,
    mappingshowid: mappingShowIdReducer,
    mappingstatusid: mappingStatusIdReducer,
    productivitybreakdown: productivityBreakdownReducer,
    teamwiseproductivity: teamwiseProductivityReducer,
    mostproductivityteams: mostProductivityTeamsReducer,
    leastproductivityteams: leastProductivityTeamsReducer,
    productivityworktimetrends: productivityWorktimeTrendsReducer,
    productivitytrend: productivityTrendReducer,
    productivityemployeelist: productivityEmployeelistReducer,
    rolesearchvalue: roleSearchValueReducer,
    userAttendance: userAttendanceReducer,
    userBreak: userBreakReducer,
    usertotalbreak: userTotalBreakReducer,
    userappsusage: userAppUsageReducer,
    userurlsusage: userUrlUsageReducer,
    settingsBreak: settingsBreakReducer,
    breaksearchvalue: breakSearchValueReducer,
    datewiseattendancepresentdata: datewiseAttendancePresentListReducer,
    datewiseattendanceabsentdata: datewiseAttendanceAbsentReducer,
    datewiseattendanceusers: datewiseAttendanceUsersReducer,
    datewiseattendanceteamvalue: datewiseAttendanceTeamValueReducer,
    datewiseattendanceuservalue: datewiseAttendanceUserValueReducer,
    datewiseattendancedatevalue: datewiseAttendanceDateValueReducer,
  },
});
