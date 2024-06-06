import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newEmployees: [],
  terminationsEmployees: [],
  isLoading: false,
  error: "",
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    clearHrOnLogout: () => initialState,
    clearOnLoad: (state) => {
      state.newEmployees = [];
    },
    setNewEmployees: (state, action) => {
      state.newEmployees = action.payload.newEmployees;
      state.isLoading = false;
      state.error = "";
    },
    clearTerminationsEmployees: (state, action) => {
      state.terminationsEmployees = [];
    },

    setEmployeesForTerminations: (state, action) => {
      state.terminationsEmployees = action.payload.terminationsEmployees;
      state.isLoading = false;
      state.error = "";
    }
  },
});

export const hrActions = hrSlice.actions;

export default hrSlice;
