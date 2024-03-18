import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    isUpdated: false,
    isAuthenticated: false,
};

//update profile Action
export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (userData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.put(
                "/api/v1/me/update",
                userData,
                config
            );
            return response.data.success;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

//update password action
export const updatePassword = createAsyncThunk(
    "user/updatePassword",
    async (passwords) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.put(
                "/api/v1/password/update",
                passwords,
                config
            );
            return response.data.success;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

const updateProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },

        reset: (state) => {
            state.isUpdated = false;
        },
    },
    extraReducers: (builder) => {
        builder

            //update profile reducers
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.isUpdated = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.isUpdated = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearErrors, reset } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
