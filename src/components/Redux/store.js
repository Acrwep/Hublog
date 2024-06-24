import { configureStore } from "@reduxjs/toolkit";
import teamMemberSlice from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    teamMembers: teamMemberSlice,
  },
});
