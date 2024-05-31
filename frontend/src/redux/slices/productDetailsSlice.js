import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

//It's an action
//Async thunk to fetch product details from the backend
export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (productId) => {
    const response = await axios.get(`/api/v1/admin/product/${productId}`);
    return response.data.product;
  }
);

const productSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Handle the fetchProductDetails actions
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
