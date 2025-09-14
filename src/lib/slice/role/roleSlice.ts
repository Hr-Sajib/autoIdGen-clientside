// src/redux/slices/roleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoleState = {
  selected: "student" | "employee";
};

const initialState: RoleState = {
  selected: "student", // default
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<"student" | "employee">) => {
      state.selected = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
