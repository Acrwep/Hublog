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

const attendanceandsummarySlice = createSlice({
  name: "attendanceandbreaksummary",
  initialState,
  reducers: {
    storeAttendanceAndBreakSummary(state, action) {
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
//role
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    storeRole(state, action) {
      state = action.payload;
      const removeSuperAdmin = state.filter((f) => f.id != 1);
      return removeSuperAdmin;
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

//datewise attendance
const datewiseAttendanceSlice = createSlice({
  name: "datewiseattendance",
  initialState,
  reducers: {
    storeDatewiseAttendance(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const datewiseAttendanceAbsentSlice = createSlice({
  name: "datewiseattendanceabsent",
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
  attendanceandsummarySlice.actions;
export const { storeAttendanceTrends } = attendanceTrendsSlice.actions;
//user detail
export const { storeuserAttendance } = userAttendanceSlice.actions;
export const { storeuserBreak } = userBreakSlice.actions;
export const { storeuserAppsUsage } = userAppsUsageSlice.actions;
export const { storeuserUrlsUsage } = userurlsUsageSlice.actions;
export const { storeUsers } = usersSlice.actions;
export const { storeUsersForTeamsTab } = usersForTeamstabSlice.actions;
export const { storeUserSearchValue } = userSearchValueSlice.actions;
export const { storeDesignation } = designationSlice.actions;
export const { storeActiveDesignation } = activeDesignationSlice.actions;
export const { storeDesignationSearchValue } =
  designationSearchValueSlice.actions;
export const { storeTeams } = teamsSlice.actions;
export const { storesettingsBreak } = SettingsBreakSlice.actions;
export const { storeBreakSearchValue } = breakSearchValueSlice.actions;
export const { storeRole } = roleSlice.actions;
export const { storeRoleSearchValue } = roleSearchValueSlice.actions;
export const { storeDatewiseAttendance } = datewiseAttendanceSlice.actions;
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
export const attendancetrendsReducer = attendanceTrendsSlice.reducer;
export const attendanceandsummaryReducer = attendanceandsummarySlice.reducer;
export const userAttendanceReducer = userAttendanceSlice.reducer;
export const userBreakReducer = userBreakSlice.reducer;
export const userAppUsageReducer = userAppsUsageSlice.reducer;
export const userUrlUsageReducer = userurlsUsageSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const usersforteamstabReducer = usersForTeamstabSlice.reducer;
export const userSearchValueReducer = userSearchValueSlice.reducer;
export const designationReducer = designationSlice.reducer;
export const activeDesignationReducer = activeDesignationSlice.reducer;
export const designationSearchValueReducer =
  designationSearchValueSlice.reducer;
export const teamsReducer = teamsSlice.reducer;
export const settingsBreakReducer = SettingsBreakSlice.reducer;
export const breakSearchValueReducer = breakSearchValueSlice.reducer;
export const roleReducer = roleSlice.reducer;
export const roleSearchValueReducer = roleSearchValueSlice.reducer;
export const datewiseAttendanceReducer = datewiseAttendanceSlice.reducer;
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
