import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/profileSlice.js";

export const store = configureStore({
    reducer: {
        product: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        profile: updateProfilereducer,
    },
});
