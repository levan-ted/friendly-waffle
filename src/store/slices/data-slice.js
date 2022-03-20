import { createSlice } from '@reduxjs/toolkit';

const initialState = { categories: [] };

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getCategoryNames(state, action) {
      state.categories = action.payload;
    },

    getProducts(state, action) {
      state[action.payload.category] = action.payload.products;
    }
  }
});

export const dataActions = dataSlice.actions;
export default dataSlice;
