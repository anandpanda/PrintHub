import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  loading: false,
  isDeleted: false,
  error: null
};


// Async action
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    console.log(id);
    const response = await axios.delete(`/api/v1/admin/product/${id}`);
    return response.data;
  }
);


// Slice
const deleteProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.isDeleted = false;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, reset } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;