import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer.js";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const addProduct = (product) => ({
  type: "products/addProduct",
  payload: product,
});
const selectProducts = (state) => state.products;

export { store, addProduct, selectProducts };

//-------------------------TRIAL CODE-------------------------
// import { configureStore } from '@reduxjs/toolkit';
// import productSlice from './slices/productSlice';
// import { productReducer } from "./reducers/productReducer";

// export const store = configureStore({
//     reducer : {
//         product : productSlice,
//     },
// });
