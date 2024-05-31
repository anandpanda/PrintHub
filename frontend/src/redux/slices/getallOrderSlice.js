import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk
export const allOrders = createAsyncThunk('orders/getAllOrders', async () => {
  const { data } = await axios.get("/api/v1/admin/orders");
  return data.orders;
});

// Slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors } = ordersSlice.actions;

export default ordersSlice.reducer;