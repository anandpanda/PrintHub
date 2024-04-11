import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/updateProfileSlice.js";
import adminproductDetailsReducer from "./slices/adminproductDetailsSlice.js";
import newproductSlice from "./slices/newProductSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfilereducer,
    adminproductDetails: adminproductDetailsReducer,
    newproduct: newproductSlice,
  },
});
