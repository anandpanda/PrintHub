import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: {},
  loading: false,
  error: null,
};

export const getMyOrderDetails = createAsyncThunk(
  "myOrder/fetchDetails",
  async () => {

    const response = await axios.get("/api/v1/orders/me");
    // console.log(response.data.order) ;
    return response.data.order;
  }
);

const myOrderDetailSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getMyOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors } = myOrderDetailSlice.actions;
export default myOrderDetailSlice.reducer;
