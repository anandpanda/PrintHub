import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const getAllReviews = createAsyncThunk(
  'allReviews/getAllReviews',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
      return data.reviews;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const allReviewsSlice = createSlice({
  name: 'allReviews',
  initialState: { reviews: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reviews = payload;
      })
      .addCase(getAllReviews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearErrors } = allReviewsSlice.actions;

export default allReviewsSlice.reducer;