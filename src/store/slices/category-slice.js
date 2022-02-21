import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [] };

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories(state, action) {
      console.log("get categories");
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
