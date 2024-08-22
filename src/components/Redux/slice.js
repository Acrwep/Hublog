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

//attendance
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

// break
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

export const { addteamMembers, deleteteamMembers, searchteamMembers } =
  teamMemberSlice.actions;
export const { storeuserAttendance } = userAttendanceSlice.actions;
export const { storeuserBreak } = userBreakSlice.actions;
export const { storeUsers } = usersSlice.actions;
export const { storeUserSearchValue } = userSearchValueSlice.actions;
export const { storeDesignation } = designationSlice.actions;
export const { storeActiveDesignation } = activeDesignationSlice.actions;
export const { storeTeams } = teamsSlice.actions;
export const { storesettingsBreak } = SettingsBreakSlice.actions;
export const { storeRole } = roleSlice.actions;
export const { storeRoleSearchValue } = roleSearchValueSlice.actions;
// export default teamMemberSlice.reducer;

export const teamMemberReducer = teamMemberSlice.reducer;
export const userAttendanceReducer = userAttendanceSlice.reducer;
export const userBreakReducer = userBreakSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const userSearchValueReducer = userSearchValueSlice.reducer;
export const designationReducer = designationSlice.reducer;
export const activeDesignationReducer = activeDesignationSlice.reducer;
export const teamsReducer = teamsSlice.reducer;
export const settingsBreakReducer = SettingsBreakSlice.reducer;
export const roleReducer = roleSlice.reducer;
export const roleSearchValueReducer = roleSearchValueSlice.reducer;
