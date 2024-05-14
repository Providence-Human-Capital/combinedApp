import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  isLoading: false,
  error: "",
  companyCount: 0,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompaniesOnLogout: () => initialState,
    setCompanies: (state, action) => {
      state.companies = action.payload.companies;
      state.isLoading = false;
      state.error = "";
    },

    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload.id
      );
    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice;
