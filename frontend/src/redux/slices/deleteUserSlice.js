import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  return data;
});

const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState: { isDeleted: false, loading: false, error: null, message: null },
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
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isDeleted = payload.success;
        state.message = payload.message;
      })
      .addCase(deleteUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { resetDelete, clearErrors } = userDeleteSlice.actions;

export default userDeleteSlice.reducer;