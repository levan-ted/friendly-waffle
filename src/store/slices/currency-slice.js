import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: [], active: { label: "USD", symbol: "$" } };

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    getCurrencies(state, action) {
      state.list = action.payload;
    },
    changeCurrency(state, action) {
      state.active = state.list.find((el) => el.label === action.payload);
    },
  },
});

export const currencyActions = currencySlice.actions;
export default currencySlice;
