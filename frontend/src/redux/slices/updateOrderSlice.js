import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk
export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, order }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
  return data.success;
});

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: { isUpdated: false, loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetUpdate } = orderSlice.actions;

export default orderSlice.reducer;