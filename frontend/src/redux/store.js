import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/updateProfileSlice.js";
import adminproductDetailsReducer from "./slices/adminproductDetailsSlice.js";
import newproductSlice from "./slices/newProductSlice.js";
import cartSlicereducer from "./slices/cartSlice.js";
//import myOrdersReducer from "./slices/myOrderSlice.js";
import orderDetailSlice from "./slices/orderDetailSlice.js";
import myOrdersSlice from "./slices/myOrdersSlice.js";
import newReviewSlice from "./slices/newReviewSlice.js";
import reviewSlice from "./slices/reviewSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfilereducer,
    adminproductDetails: adminproductDetailsReducer,
    newproduct: newproductSlice,
    cart : cartSlicereducer,
    order : orderDetailSlice ,
    myOrders : myOrdersSlice , 
    newReview : newReviewSlice , 
    reviews : reviewSlice ,
  },
});
