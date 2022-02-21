import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/category-slice";
import productsSlice from "./slices/products-slice";

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
