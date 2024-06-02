import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: {},
  loading: false,
  error: null,
};

export const getOrderDetails = createAsyncThunk(
  "order/fetchDetails",
  async (orderId) => {

    const response = await axios.get(`/api/v1/order/${orderId}`);
    // console.log(response.data.order) ;
    return response.data.order;
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
