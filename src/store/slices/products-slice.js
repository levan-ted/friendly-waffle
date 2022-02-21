import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      console.log("get all products");
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
