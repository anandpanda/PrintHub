import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id) => {
  const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
  return data.success;
});

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: { isDeleted: false, loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetDelete } = orderSlice.actions;

export default orderSlice.reducer;