import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  isLoading: false,
  error: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeesOnLogout: () => initialState,
    setEmployees: (state, action) => {
      state.employees = action.payload.employees;
      state.isLoading = false;
      state.error = "";
    },

    deleteEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees.splice(index, 1);
      }
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice;
