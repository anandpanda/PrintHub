import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const getUserDetails = createAsyncThunk('userDetails/getUserDetails', async (id) => {
  const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  return data.user;
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: {}, loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(getUserDetails.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { clearErrors } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;