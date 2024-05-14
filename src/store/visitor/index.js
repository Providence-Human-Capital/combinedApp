import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitors: [],
  isLoading: false,
  error: "",
  searchedResults: []
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    clearVisitorsOnLogout: () => initialState,
    setVisitors: (state, action) => {
      state.visitors = action.payload.visitors;
      state.isLoading = false;
      state.error = "";
    },

    setSearchedVisitors: (state, action) => { 
      state.searchedResults = action.payload.searchedResults;
      state.isLoading = false;
      state.error = "";
    },
    deleteVisitor: (state, action) => {
      const index = state.visitors.findIndex(
        (visitor) => visitor.id === action.payload.id
      );
      if (index !== -1) {
        state.visitors.splice(index, 1);
      }
    },
  },
});

export const visitorActions = visitorSlice.actions;

export default visitorSlice;
