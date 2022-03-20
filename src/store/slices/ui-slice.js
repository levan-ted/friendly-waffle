import { createSlice } from '@reduxjs/toolkit';

const initialState = { showBag: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleBag(state) {
      state.showBag = !state.showBag;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;
