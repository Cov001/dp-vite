import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./screenSharingReducer";
import {thunk} from "redux-thunk";

const store = configureStore({
  reducer: {
    screenSharing: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Sử dụng devTools chỉ trong môi trường phát triển
});

export default store;
