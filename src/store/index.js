import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/category-slice";
import productsSlice from "./slices/products-slice";
import dataSlice from "./slices/data-slice";

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    products: productsSlice.reducer,
    data: dataSlice.reducer,
  },
});

export default store;
