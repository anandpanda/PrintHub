import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

//It's an action
export const newReview = createAsyncThunk(
  "/newReview",
  async (reviewData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",    //"multipart/form-data" //"application/json"
        },
      };

      const response = await axios.put(
        `/api/v1/review`,
        reviewData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const newReviewSlice = createSlice({
  name: "newReview",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetNewProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //Handle the fetchProductDetails actions
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || {};
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors, resetNewProduct } = newReviewSlice.actions;
export default newReviewSlice.reducer;
