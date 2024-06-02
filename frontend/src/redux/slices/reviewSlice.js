import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions
export const getAllReviews = createAsyncThunk(
  'review/fetchReviews',
  async (id) => {
    const { data } = await axios.get(`/api/v1/reviws?id=${id}`);
    return {
      review : data.reviews
    };
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId , productId) => {
    const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`) ;
    return {
        review : data.reviews 
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: { reviews : [] ,
  loading: false,
  error : null },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.review;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.review;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
    }
}) ;

export default reviewSlice.reducer;