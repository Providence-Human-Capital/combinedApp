import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  isLoading: false,
  error: "",
  selectedPatient: null,
};

const patientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearPatientsOnLogout: () => initialState,
    setPatients: (state, action) => {
      state.patients = action.payload.patients;
      state.isLoading = false;
      state.error = "";
    },

    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload.selectedPatient;
    },

    clearSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload.selectedPatient;
    },
    deletePatient: (state, action) => {
      const index = state.patients.findIndex(
        (patients) => patients.id === action.payload.id
      );
      if (index !== -1) {
        state.patients.splice(index, 1);
      }
    },
  },
});

export const patientsActions = patientsSlice.actions;

export default patientsSlice;
