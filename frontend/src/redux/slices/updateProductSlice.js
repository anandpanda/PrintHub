import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async action
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );

      return data.success;
    } catch (error) {
      return (error.response.data.message);
    }
  }
);

// Slice
export const updateProductSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdateProduct: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUpdated = payload;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearErrors,resetUpdateProduct } = updateProductSlice.actions;

export default updateProductSlice.reducer;