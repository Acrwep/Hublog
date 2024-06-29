import { configureStore } from "@reduxjs/toolkit";
import { teamMemberReducer } from "./slice";

export const store = configureStore({
  devTools: true,
  reducer: {
    teamMembers: teamMemberReducer,
    // windowWidth: windowWidthReducer,
  },
});
