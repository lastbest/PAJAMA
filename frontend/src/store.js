import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ovsessionSlice from "./ovsessionSlice";

let store = configureStore({
  reducer: { ovsession: ovsessionSlice },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
