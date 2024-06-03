import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const { data } = await axios.get(`/api/v1/admin/users`);
  return data.users;
});

const allUsersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { clearErrors } = allUsersSlice.actions;

export default allUsersSlice.reducer;