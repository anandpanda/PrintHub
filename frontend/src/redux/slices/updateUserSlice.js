import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userData }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
  return data.success;
});

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: { isUpdated: false, loading: false, error: null },
  reducers: {
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUpdated = payload;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { resetUpdate, clearErrors } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;