import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddCompanyModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    setAddCompanyModal: (state) => {
      state.openAddCompanyModal = true;
    },

    closeAddCompanyModal: (state) => {
      state.openAddCompanyModal = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
