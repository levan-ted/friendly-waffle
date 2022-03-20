import { createSlice } from '@reduxjs/toolkit';
import * as storage from '../../helpers/localStorage';

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const alreadyInCart = state.cartItems.some((item) => item.id === newItem.id);
      if (alreadyInCart) {
        const existingItem = state.cartItems.find((el) => el.id === newItem.id);
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.cartItems.push(newItem);
      }
      storage.set('cart', state.cartItems);
    },
    removeItem(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.id === item.id);
      if (!existingItem) return;
      state.cartItems = state.cartItems.filter((el) => el.id !== item.id);
      storage.set('cart', state.cartItems);
    },

    reduceItemQuantity(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.id === item.id);
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((el) => el.id !== item.id);
      } else {
        existingItem.quantity--;
      }
      storage.set('cart', state.cartItems);
    },

    getInitialState(state, action) {
      if (!action.payload) return;
      const newState = [...action.payload];
      console.log(newState);
      if (newState && newState.length > 0) state.cartItems = newState;
    },

    updateAttributes(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((el) => el.id === item.id);
      existingItem.selectedAttributes = item.selectedAttributes;
      storage.set('cart', state.cartItems);
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
