import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
let dummyState = [];

const teamMemberSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    addteamMembers(state, action) {
      state = action.payload;
      dummyState = action.payload;
      return state;
    },
    searchteamMembers(state, action) {
      if (action.payload === "") {
        state = dummyState;
        return state;
      } else {
        const name = action.payload;
        const filterData = dummyState.filter((item) =>
          item.name.toLowerCase().includes(name)
        );
        return filterData;
      }
    },
    deleteteamMembers(state, action) {
      const deleteIndex = action.payload;
      return state.filter((val, index) => index !== deleteIndex);
    },
  },
});

const activeTeamSlice = createSlice({
  name: "activeteam",
  initialState,
  reducers: {
    storeActiveTeam(state, action) {
      state = action.payload;
      return state;
    },
  },
});

// attendance dashboard
const attendanceActivityLevelSlice = createSlice({
  name: "attendanceactivitylevel",
  initialState,
  reducers: {
    storeAttendanceActivityLevel(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const attendanceTrendsSlice = createSlice({
  name: "attendancetrends",
  initialState,
  reducers: {
    storeAttendanceTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const attendanceBreakTrendsSlice = createSlice({
  name: "attendancebreaktrends",
  initialState,
  reducers: {
    storeAttendanceBreakTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const attendanceLateTendencySlice = createSlice({
  name: "attendancelatetendency",
  initialState,
  reducers: {
    storeAttendanceLateTendency(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const attendanceandbreakSummarySlice = createSlice({
  name: "attendanceandbreaksummary",
  initialState,
  reducers: {
    storeAttendanceAndBreakSummary(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const todayAttendance = null;
const todayAttendanceSlice = createSlice({
  name: "todayattendance",
  initialState: todayAttendance,
  reducers: {
    storeTodayAttendance(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//users
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUsers(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const usersCount = 0;
const usersCountSlice = createSlice({
  name: "userscount",
  initialState: usersCount,
  reducers: {
    storeUsersCount(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const activeUsersCount = 0;
const activeUsersCountSlice = createSlice({
  name: "activeuserscount",
  initialState: usersCount,
  reducers: {
    storeActiveUsersCount(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const usersForTeamstabSlice = createSlice({
  name: "usersforteamstab",
  initialState,
  reducers: {
    storeUsersForTeamsTab(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const usersearchvalue = null;
const userSearchValueSlice = createSlice({
  name: "usersearchvalue",
  initialState: usersearchvalue,
  reducers: {
    storeUserSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//designation
const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {
    storeDesignation(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const designationCount = 0;
const designationCountSlice = createSlice({
  name: "designationcount",
  initialState: designationCount,
  reducers: {
    storeDesignationCount(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const activeDesignationSlice = createSlice({
  name: "activedesignation",
  initialState,
  reducers: {
    storeActiveDesignation(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const designationsearchvalue = null;
const designationSearchValueSlice = createSlice({
  name: "designationsearchvalue",
  initialState: designationsearchvalue,
  reducers: {
    storeDesignationSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//team
const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    storeTeams(state, action) {
      console.log("teams action payload", action.payload);
      state = action.payload;
      return state;
    },
  },
});

//user detail attendance
const userAttendanceSlice = createSlice({
  name: "userAttendance",
  initialState,
  reducers: {
    storeuserAttendance(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//user detail break
const userBreakSlice = createSlice({
  name: "userBreak",
  initialState,
  reducers: {
    storeuserBreak(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const userTotalBreakSlice = createSlice({
  name: "usertotalbreak",
  initialState,
  reducers: {
    storeUserTotalBreak(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//user detail apps ans urls
const userAppsUsageSlice = createSlice({
  name: "userappsusage",
  initialState,
  reducers: {
    storeuserAppsUsage(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const userurlsUsageSlice = createSlice({
  name: "userurlsusage",
  initialState,
  reducers: {
    storeuserUrlsUsage(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//settings break
const SettingsBreakSlice = createSlice({
  name: "settingsbreak",
  initialState,
  reducers: {
    storesettingsBreak(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const breaksearchvalue = null;
const breakSearchValueSlice = createSlice({
  name: "breaksearchvalue",
  initialState: breaksearchvalue,
  reducers: {
    storeBreakSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//settings shifts
const SettingsShiftSlice = createSlice({
  name: "settingsshift",
  initialState,
  reducers: {
    storeSettingsShifts(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const shiftSearchValue = null;
const shiftSearchValueSlice = createSlice({
  name: "shiftsearchvalue",
  initialState: shiftSearchValue,
  reducers: {
    storeShiftSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//role
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    storeRole(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const rolesearchvalue = null;
const roleSearchValueSlice = createSlice({
  name: "rolesearchvalue",
  initialState: rolesearchvalue,
  reducers: {
    storeRoleSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//settings productivity rules
const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    storeCategories(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const ImbuildAppsandUrlsSlice = createSlice({
  name: "imbuildappsandurls",
  initialState,
  reducers: {
    storeImbuildAppsandUrls(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const imbuildappsandurlsCount = 0;
const imbuildappsandurlsCountSlice = createSlice({
  name: "imbuildappsandurlscount",
  initialState: imbuildappsandurlsCount,
  reducers: {
    storeImbuildappsandurlsCount(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const mappingSearchValue = "";
const mappingSearchValueSlice = createSlice({
  name: "mappingsearchvalue",
  initialState: mappingSearchValue,
  reducers: {
    storeMappingSearchValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const mappingShowId = 1;
const mappingShowIdSlice = createSlice({
  name: "mappingshowid",
  initialState: mappingShowId,
  reducers: {
    storeMappingShowId(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const mappingStatusId = 1;
const mappingStatusIdSlice = createSlice({
  name: "mappingstatusid",
  initialState: mappingStatusId,
  reducers: {
    storeMappingStatusId(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//settings alert rules
const alertRulesSlice = createSlice({
  name: "alertrules",
  initialState,
  reducers: {
    storeAlertRules(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//settings goals rules
const goalsRulesSlice = createSlice({
  name: "goalrules",
  initialState,
  reducers: {
    storeGoalRules(state, action) {
      state = action.payload;
      return state;
    },
  },
});

//settings wellness rules
const wellnessRulesSlice = createSlice({
  name: "wellnessrules",
  initialState,
  reducers: {
    storeWellnessRules(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//activity
const activityBreakdownSlice = createSlice({
  name: "activitybreakdown",
  initialState,
  reducers: {
    storeActivityBreakdown(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const activityTeamlevelBreakdownSlice = createSlice({
  name: "activityteamlevelbreakdown",
  initialState,
  reducers: {
    storeActivityTeamLevelBreakdown(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const teamwiseActivitySlice = createSlice({
  name: "teamwiseactivity",
  initialState,
  reducers: {
    storeTeamwiseActivity(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const activityWorktimeTrendsSlice = createSlice({
  name: "activityworktimetrends",
  initialState,
  reducers: {
    storeActivityWorktimeTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const activityTrendsSlice = createSlice({
  name: "activitytrends",
  initialState,
  reducers: {
    storeActivityTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const mostActivityTeamsSlice = createSlice({
  name: "mostactivityteams",
  initialState,
  reducers: {
    storeMostActivityTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const leastActivityTeamsSlice = createSlice({
  name: "leastactivityteams",
  initialState,
  reducers: {
    storeLeastActivityTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const activityEmployeeslistSlice = createSlice({
  name: "activityemployeeslist",
  initialState,
  reducers: {
    storeActivityEmployeesList(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//wellness
const teamwiseWellnessSlice = createSlice({
  name: "teamwisewellness",
  initialState,
  reducers: {
    storeTeamwiseWellness(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const overallWellnessSlice = createSlice({
  name: "overallwellness",
  initialState,
  reducers: {
    storeOverallWellness(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const topHealthyTeamsSlice = createSlice({
  name: "tophealthyteams",
  initialState,
  reducers: {
    storeTopHealthyTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const topOverburdenedTeamsSlice = createSlice({
  name: "topoverburdenedteams",
  initialState,
  reducers: {
    storeTopOverburdenedTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const topUnderutilizedTeamsSlice = createSlice({
  name: "topunderutilizedteams",
  initialState,
  reducers: {
    storeTopUnderutilizedTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const wellnessWorktimeTrendsSlice = createSlice({
  name: "wellnessworktimetrends",
  initialState,
  reducers: {
    storeWellnessWorktimeTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const wellnessEmployeesListSlice = createSlice({
  name: "wellnessemployeeslist",
  initialState,
  reducers: {
    storeWellnessEmployeesList(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//productivity
const productivityBreakdownSlice = createSlice({
  name: "productivitybreakdown",
  initialState,
  reducers: {
    storeProductivityBreakdown(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const teamwiseProductivitySlice = createSlice({
  name: "teamwiseproductivity",
  initialState,
  reducers: {
    storeTeamwiseProductivity(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const mostProductivityTeamsSlice = createSlice({
  name: "mostproductivityteams",
  initialState,
  reducers: {
    storeMostProductivityTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const leastProductivityTeamsSlice = createSlice({
  name: "leastproductivityteams",
  initialState,
  reducers: {
    storeLeastProductivityTeams(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const productivityWorktimeTrendsSlice = createSlice({
  name: "productivityworktimetrends",
  initialState,
  reducers: {
    storeProductivityWorktimeTrends(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const productivityTrendSlice = createSlice({
  name: "productivitytrend",
  initialState,
  reducers: {
    storeProductivityTrend(state, action) {
      state = action.payload;
      return state;
    },
  },
});
const productivityEmployeelistSlice = createSlice({
  name: "productivityemployeelist",
  initialState,
  reducers: {
    storeProductivityEmployeelist(state, action) {
      state = action.payload;
      return state;
    },
  },
});
//datewise attendance
const datewiseAttendancePresentListSlice = createSlice({
  name: "datewiseattendancepresentdata",
  initialState,
  reducers: {
    storeDatewiseAttendancePresentData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceAbsentSlice = createSlice({
  name: "datewiseattendanceabsentdata",
  initialState,
  reducers: {
    storeDatewiseAttendanceAbsentData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceUsersSlice = createSlice({
  name: "datewiseattendanceusers",
  initialState,
  reducers: {
    storeDatewiseAttendanceUsersData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceTeamValue = null;
const datewiseAttendanceTeamValueSlice = createSlice({
  name: "datewiseattendanceteamvalue",
  initialState: datewiseAttendanceTeamValue,
  reducers: {
    storeDatewiseAttendanceTeamValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceUserValue = null;
const datewiseAttendanceUserValueSlice = createSlice({
  name: "datewiseattendanceuservalue",
  initialState: datewiseAttendanceUserValue,
  reducers: {
    storeDatewiseAttendanceUserValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceDateValue = null;
const datewiseAttendanceDateValueSlice = createSlice({
  name: "datewiseattendancedatevalue",
  initialState: datewiseAttendanceDateValue,
  reducers: {
    storeDatewiseAttendanceDateValue(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { addteamMembers, deleteteamMembers, searchteamMembers } =
  teamMemberSlice.actions;
export const { storeActiveTeam } = activeTeamSlice.actions;
//attendance dashboard
export const { storeAttendanceAndBreakSummary } =
  attendanceandbreakSummarySlice.actions;
export const { storeTodayAttendance } = todayAttendanceSlice.actions;
export const { storeAttendanceBreakTrends } =
  attendanceBreakTrendsSlice.actions;
export const { storeAttendanceLateTendency } =
  attendanceLateTendencySlice.actions;
export const { storeAttendanceTrends } = attendanceTrendsSlice.actions;
export const { storeAttendanceActivityLevel } =
  attendanceActivityLevelSlice.actions;
//user detail
export const { storeuserAttendance } = userAttendanceSlice.actions;
export const { storeuserBreak } = userBreakSlice.actions;
export const { storeUserTotalBreak } = userTotalBreakSlice.actions;
export const { storeuserAppsUsage } = userAppsUsageSlice.actions;
export const { storeuserUrlsUsage } = userurlsUsageSlice.actions;
export const { storeUsers } = usersSlice.actions;
export const { storeUsersCount } = usersCountSlice.actions;
export const { storeActiveUsersCount } = activeUsersCountSlice.actions;
export const { storeUsersForTeamsTab } = usersForTeamstabSlice.actions;
export const { storeUserSearchValue } = userSearchValueSlice.actions;
export const { storeDesignation } = designationSlice.actions;
export const { storeActiveDesignation } = activeDesignationSlice.actions;
export const { storeDesignationCount } = designationCountSlice.actions;
export const { storeDesignationSearchValue } =
  designationSearchValueSlice.actions;
export const { storeTeams } = teamsSlice.actions;
export const { storesettingsBreak } = SettingsBreakSlice.actions;
export const { storeBreakSearchValue } = breakSearchValueSlice.actions;
export const { storeSettingsShifts } = SettingsShiftSlice.actions;
export const { storeShiftSearchValue } = shiftSearchValueSlice.actions;
export const { storeRole } = roleSlice.actions;
export const { storeCategories } = CategoriesSlice.actions;
export const { storeImbuildAppsandUrls } = ImbuildAppsandUrlsSlice.actions;
export const { storeImbuildappsandurlsCount } =
  imbuildappsandurlsCountSlice.actions;
export const { storeMappingSearchValue } = mappingSearchValueSlice.actions;
export const { storeMappingShowId } = mappingShowIdSlice.actions;
export const { storeMappingStatusId } = mappingStatusIdSlice.actions;
export const { storeAlertRules } = alertRulesSlice.actions;
export const { storeGoalRules } = goalsRulesSlice.actions;
export const { storeWellnessRules } = wellnessRulesSlice.actions;
export const { storeActivityBreakdown } = activityBreakdownSlice.actions;
export const { storeActivityTeamLevelBreakdown } =
  activityTeamlevelBreakdownSlice.actions;
export const { storeTeamwiseActivity } = teamwiseActivitySlice.actions;
export const { storeActivityWorktimeTrends } =
  activityWorktimeTrendsSlice.actions;
export const { storeActivityTrends } = activityTrendsSlice.actions;
export const { storeMostActivityTeams } = mostActivityTeamsSlice.actions;
export const { storeLeastActivityTeams } = leastActivityTeamsSlice.actions;
export const { storeActivityEmployeesList } =
  activityEmployeeslistSlice.actions;
export const { storeTeamwiseWellness } = teamwiseWellnessSlice.actions;
export const { storeOverallWellness } = overallWellnessSlice.actions;
export const { storeTopHealthyTeams } = topHealthyTeamsSlice.actions;
export const { storeTopOverburdenedTeams } = topOverburdenedTeamsSlice.actions;
export const { storeTopUnderutilizedTeams } =
  topUnderutilizedTeamsSlice.actions;
export const { storeWellnessWorktimeTrends } =
  wellnessWorktimeTrendsSlice.actions;
export const { storeWellnessEmployeesList } =
  wellnessEmployeesListSlice.actions;
export const { storeProductivityBreakdown } =
  productivityBreakdownSlice.actions;
export const { storeTeamwiseProductivity } = teamwiseProductivitySlice.actions;
export const { storeMostProductivityTeams } =
  mostProductivityTeamsSlice.actions;
export const { storeLeastProductivityTeams } =
  leastProductivityTeamsSlice.actions;
export const { storeProductivityWorktimeTrends } =
  productivityWorktimeTrendsSlice.actions;
export const { storeProductivityTrend } = productivityTrendSlice.actions;
export const { storeProductivityEmployeelist } =
  productivityEmployeelistSlice.actions;
export const { storeRoleSearchValue } = roleSearchValueSlice.actions;
export const { storeDatewiseAttendancePresentData } =
  datewiseAttendancePresentListSlice.actions;
export const { storeDatewiseAttendanceAbsentData } =
  datewiseAttendanceAbsentSlice.actions;
export const { storeDatewiseAttendanceUsersData } =
  datewiseAttendanceUsersSlice.actions;
export const { storeDatewiseAttendanceTeamValue } =
  datewiseAttendanceTeamValueSlice.actions;
export const { storeDatewiseAttendanceUserValue } =
  datewiseAttendanceUserValueSlice.actions;
export const { storeDatewiseAttendanceDateValue } =
  datewiseAttendanceDateValueSlice.actions;
// export default teamMemberSlice.reducer;

export const teamMemberReducer = teamMemberSlice.reducer;
export const activeTeamReducer = activeTeamSlice.reducer;
export const attendanceActivityLevelReducer =
  attendanceActivityLevelSlice.reducer;
export const attendancetrendsReducer = attendanceTrendsSlice.reducer;
export const attendanceBreakTrendsReducer = attendanceBreakTrendsSlice.reducer;
export const attendanceLateTendencyReducer =
  attendanceLateTendencySlice.reducer;
export const attendanceandbreaksummaryReducer =
  attendanceandbreakSummarySlice.reducer;
export const todayattendanceReducer = todayAttendanceSlice.reducer;
export const userAttendanceReducer = userAttendanceSlice.reducer;
export const userBreakReducer = userBreakSlice.reducer;
export const userTotalBreakReducer = userTotalBreakSlice.reducer;
export const userAppUsageReducer = userAppsUsageSlice.reducer;
export const userUrlUsageReducer = userurlsUsageSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const usersCountReducer = usersCountSlice.reducer;
export const activeUsersCountReducer = activeUsersCountSlice.reducer;
export const usersforteamstabReducer = usersForTeamstabSlice.reducer;
export const userSearchValueReducer = userSearchValueSlice.reducer;
export const designationReducer = designationSlice.reducer;
export const designationCountReducer = designationCountSlice.reducer;
export const activeDesignationReducer = activeDesignationSlice.reducer;
export const designationSearchValueReducer =
  designationSearchValueSlice.reducer;
export const teamsReducer = teamsSlice.reducer;
export const settingsBreakReducer = SettingsBreakSlice.reducer;
export const breakSearchValueReducer = breakSearchValueSlice.reducer;
export const settingsShiftReducer = SettingsShiftSlice.reducer;
export const shiftSearchValueReducer = shiftSearchValueSlice.reducer;
export const roleReducer = roleSlice.reducer;
export const categoriesReducer = CategoriesSlice.reducer;
export const imbuildAppsandUrlsReducer = ImbuildAppsandUrlsSlice.reducer;
export const imbuildAppsandUrlsCountReducer =
  imbuildappsandurlsCountSlice.reducer;
export const mappingSearchValueReducer = mappingSearchValueSlice.reducer;
export const mappingShowIdReducer = mappingShowIdSlice.reducer;
export const mappingStatusIdReducer = mappingStatusIdSlice.reducer;
export const alertRulesReducer = alertRulesSlice.reducer;
export const goalRulesReducer = goalsRulesSlice.reducer;
export const wellnessRulesReducer = wellnessRulesSlice.reducer;
export const activityBreakdownReducer = activityBreakdownSlice.reducer;
export const activityTeamlevelBreakdownReducer =
  activityTeamlevelBreakdownSlice.reducer;
export const teamwiseActivityReducer = teamwiseActivitySlice.reducer;
export const activityWorktimeTrendsReducer =
  activityWorktimeTrendsSlice.reducer;
export const activityTrendsReducer = activityTrendsSlice.reducer;
export const mostActivityTeamsReducer = mostActivityTeamsSlice.reducer;
export const leastActivityTeamsReducer = leastActivityTeamsSlice.reducer;
export const activityEmployeesListReducer = activityEmployeeslistSlice.reducer;
export const teamwiseWellnessReducer = teamwiseWellnessSlice.reducer;
export const overallWellnessReducer = overallWellnessSlice.reducer;
export const topHealthyTeamsReducer = topHealthyTeamsSlice.reducer;
export const topOverburdenedTeamsReducer = topOverburdenedTeamsSlice.reducer;
export const topUnderutilizedTeamsReducer = topUnderutilizedTeamsSlice.reducer;
export const wellnessWorktimeTrendsReducer =
  wellnessWorktimeTrendsSlice.reducer;
export const wellnessEmployeesListReducer = wellnessEmployeesListSlice.reducer;
export const productivityBreakdownReducer = productivityBreakdownSlice.reducer;
export const teamwiseProductivityReducer = teamwiseProductivitySlice.reducer;
export const mostProductivityTeamsReducer = mostProductivityTeamsSlice.reducer;
export const leastProductivityTeamsReducer =
  leastProductivityTeamsSlice.reducer;
export const productivityWorktimeTrendsReducer =
  productivityWorktimeTrendsSlice.reducer;
export const productivityTrendReducer = productivityTrendSlice.reducer;
export const productivityEmployeelistReducer =
  productivityEmployeelistSlice.reducer;
export const roleSearchValueReducer = roleSearchValueSlice.reducer;
export const datewiseAttendancePresentListReducer =
  datewiseAttendancePresentListSlice.reducer;
export const datewiseAttendanceAbsentReducer =
  datewiseAttendanceAbsentSlice.reducer;
export const datewiseAttendanceUsersReducer =
  datewiseAttendanceUsersSlice.reducer;
export const datewiseAttendanceTeamValueReducer =
  datewiseAttendanceTeamValueSlice.reducer;
export const datewiseAttendanceUserValueReducer =
  datewiseAttendanceUserValueSlice.reducer;
export const datewiseAttendanceDateValueReducer =
  datewiseAttendanceDateValueSlice.reducer;
