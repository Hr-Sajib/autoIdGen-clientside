import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEmployee: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setSelectedEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
