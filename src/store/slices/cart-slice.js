import { createSlice } from '@reduxjs/toolkit';
import * as storage from '../../helpers/localStorage';

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const alreadyInCart = state.cartItems.some((item) => item.combinedId === newItem.combinedId);
      if (alreadyInCart) {
        const existingItem = state.cartItems.find((el) => el.combinedId === newItem.combinedId);
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.cartItems.push(newItem);
      }
      storage.set('cart', state.cartItems);
    },
    removeItem(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.combinedId === item.combinedId);
      if (!existingItem) return;
      state.cartItems = state.cartItems.filter((el) => el.combinedId !== item.combinedId);
      storage.set('cart', state.cartItems);
    },

    reduceItemQuantity(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.combinedId === item.combinedId);
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((el) => el.combinedId !== item.combinedId);
      } else {
        existingItem.quantity--;
      }
      storage.set('cart', state.cartItems);
    },

    getInitialState(state, action) {
      if (!action.payload) return;
      const newState = [...action.payload];
      if (newState && newState.length > 0) state.cartItems = newState;
    },

    updateAttributes(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.combinedId === item.combinedId);
      existingItem.selectedAttributes = item.selectedAttributes;
      storage.set('cart', state.cartItems);
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
