import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/updateProfileSlice.js";
import cartSlicereducer from "./slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfilereducer,
    cart : cartSlicereducer,
  },
});
