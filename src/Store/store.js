// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { api } from "./RTKApi"; // 👈 import your RTK Query API service

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer, // 👈 add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // 👈 add RTK Query middleware
});
