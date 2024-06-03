import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async ({ reviewId, productId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
      return data.success;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const reviewSlice = createSlice({
  name: 'review',
  initialState: { isDeleted: false, loading: false, error: null },
  reducers: {
    resetDelete: (state) => {
      state.isDeleted = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isDeleted = payload;
      })
      .addCase(deleteReview.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetDelete, clearErrors } = reviewSlice.actions;

export default reviewSlice.reducer;