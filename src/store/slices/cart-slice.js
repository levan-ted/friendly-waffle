import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      const alreadyInCart = state.cartItems.some(
        (item) => item.id === newItem.id
      );

      if (alreadyInCart) {
        const existingItem = state.cartItems.find((el) => el.id === newItem.id);
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.cartItems.push(newItem);
      }
    },
    removeItem(state, action) {
      const item = action.payload;

      const existingItem = state.cartItems.find((el) => el.id === item.id);

      if (!existingItem) return;
      if (existingItem.quantity === 1)
        state.cartItems = state.cartItems.filter((el) => el.id !== item.id);
      return;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
