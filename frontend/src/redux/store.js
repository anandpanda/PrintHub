import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/updateProfileSlice.js";
import adminproductDetailsReducer from "./slices/adminproductDetailsSlice.js";
import newproductSlice from "./slices/newProductSlice.js";
import cartSlicereducer from "./slices/cartSlice.js";
import deleteProductReducer from "./slices/deleteProductSlice.js";
import updateProductSlice from "./slices/updateProductSlice.js";
import getallOrderSlice from "./slices/getallOrderSlice.js";
import updateOrderSlice from "./slices/updateOrderSlice.js";
import deleteOrderSlice from "./slices/deleteOrderSlice.js";


//Use these keywords assigned in store to access the state in the component
export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfilereducer,
    adminproductDetails: adminproductDetailsReducer,
    newproduct: newproductSlice,
    cart : cartSlicereducer,
    deleteproduct: deleteProductReducer,
    updateproduct: updateProductSlice,
    allOrders: getallOrderSlice,
    updateOrder: updateOrderSlice,
    deleteOrder: deleteOrderSlice,
  },
});
