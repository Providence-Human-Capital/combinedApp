import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authSlice from "./auth";
import visitorSlice from "./visitor";
import employeeSlice from "./employees";
import printSlice from "./prints";
import patientsSlice from "./patients";
import companySlice from "./company";
import uiSlice from "./ui";
import clinicSlice from "./clinic";
import hrSlice from "./hr";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  visitor: visitorSlice.reducer,
  employee: employeeSlice.reducer,
  print: printSlice.reducer,
  patient: patientsSlice.reducer,
  company: companySlice.reducer,
  ui: uiSlice.reducer,
  clinic: clinicSlice.reducer,
  hr: hrSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
