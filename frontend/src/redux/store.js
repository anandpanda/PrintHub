import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
  },
});
