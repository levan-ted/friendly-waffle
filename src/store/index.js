import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./slices/currency-slice";
import dataSlice from "./slices/data-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    currencies: currencySlice.reducer,
  },
});

export default store;
