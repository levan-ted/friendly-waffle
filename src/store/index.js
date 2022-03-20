import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart-slice';
import currencySlice from './slices/currency-slice';
import dataSlice from './slices/data-slice';
import uiSlice from './slices/ui-slice';

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    currencies: currencySlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer
  }
});

export default store;
