import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

let store = configureStore({
  reducer: { counter: counterSlice },
});

export default store;
