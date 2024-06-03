import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import userReducer from "./slices/userSlice";
import updateProfilereducer from "./slices/updateProfileSlice.js";
import adminproductDetailsReducer from "./slices/adminproductDetailsSlice.js";
import newproductSlice from "./slices/newProductSlice.js";
import cartReducer from "./slices/cartSlice.js";
import deleteProductReducer from "./slices/deleteProductSlice.js";
import updateProductSlice from "./slices/updateProductSlice.js";
import getallOrderSlice from "./slices/getallOrderSlice.js";
import updateOrderSlice from "./slices/updateOrderSlice.js";
import deleteOrderSlice from "./slices/deleteOrderSlice.js";

//Use these keywords assigned in store to access the state in the componentimport cartReducer from "./slices/cartSlice.js";
import newOrderReducer from "./slices/orderSlice.js";
//import myOrdersReducer from "./slices/myOrderSlice.js";
import orderDetailSlice from "./slices/orderDetailSlice.js";
import myOrdersSlice from "./slices/myOrdersSlice.js";
import newReviewSlice from "./slices/newReviewSlice.js";
import reviewSlice from "./slices/reviewSlice.js";
import getallUsersSlice from "./slices/getallUsersSlice.js";
import deleteUserSlice from "./slices/deleteUserSlice.js";
import userDetailsSlice from "./slices/getUserDetailsSlice.js";
import updateUserSlice from "./slices/updateUserSlice.js";
import allReviewsSlice from './slices/getallReviewsSlice';
import deleteReviewSlice from "./slices/deleteReviewSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfilereducer,
    adminproductDetails: adminproductDetailsReducer,
    newproduct: newproductSlice,
    deleteproduct: deleteProductReducer,
    updateproduct: updateProductSlice,
    allOrders: getallOrderSlice,
    updateOrder: updateOrderSlice,
    deleteOrder: deleteOrderSlice,
    cart : cartReducer,
    newOrder: newOrderReducer,
    order : orderDetailSlice ,
    myOrders : myOrdersSlice , 
    newReview : newReviewSlice , 
    reviews : reviewSlice ,
    allUsers : getallUsersSlice,
    deleteUser : deleteUserSlice,
    updateUser : updateUserSlice,
    userDetails : userDetailsSlice, 
    allReviews : allReviewsSlice,
    deleteReview : deleteReviewSlice,
  },
});
