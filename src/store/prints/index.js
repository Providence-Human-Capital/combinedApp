import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTF: [],
  beneficiaryPrint: {},
};

const printSlice = createSlice({
  name: "print",
  initialState,

  reducers: {
    clearOnLoad: (state) => {
      state.currentTF = [];
      state.beneficiaryPrint = {};
    },
    setCurrentPrintTerminationForms: (state, actions) => {
      state.currentTF = actions.payload.currentTF;
    },

    setBeneficiaryPrint: (state, actions) => {
      state.beneficiaryPrint = actions.payload.beneficiaryPrint;
    },
  },
});

export const printActions = printSlice.actions;

export default printSlice;
