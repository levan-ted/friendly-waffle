import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/data-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
