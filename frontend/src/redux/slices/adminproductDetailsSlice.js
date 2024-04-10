import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

//It's an action
//Async thunk to fetch product details from the backend
export const fetchadminProductDetails = createAsyncThunk(
  "adminProducts/fetchDetails",
  async (productId) => {
    const response = await axios.get(`/api/v1/admin/products`);
    return response.data.product;
  }
);

const adminproductSlice = createSlice({
  name: "adminproductDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Handle the fetchProductDetails actions
      .addCase(fetchadminProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchadminProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchadminProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors } = adminproductSlice.actions;
export default adminproductSlice.reducer;
