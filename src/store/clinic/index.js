import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinics: [],
  isLoading: false,
  error: "",
};

const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    clearClinicsOnLogout: () => initialState,
    setClinics: (state, action) => {
      state.clinics = action.payload.clinics;
      state.isLoading = false;
      state.error = "";
    },

    deleteClinic: (state, action) => {
      state.clinics = state.clinics.filter(
        (clinic) => clinic.id !== action.payload.id
      );
    },
  },
});

export const clinicActions = clinicSlice.actions;

export default clinicSlice;
