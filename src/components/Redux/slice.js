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

export const { addteamMembers, deleteteamMembers, searchteamMembers } =
  teamMemberSlice.actions;
export default teamMemberSlice.reducer;
