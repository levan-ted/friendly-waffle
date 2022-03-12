import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import currencySlice from "./slices/currency-slice";
import dataSlice from "./slices/data-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    currencies: currencySlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
