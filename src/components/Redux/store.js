import { configureStore } from "@reduxjs/toolkit";
import { teamMemberReducer, userAttendanceReducer } from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    teamMembers: teamMemberReducer,
    userAttendance: userAttendanceReducer,
  },
});
