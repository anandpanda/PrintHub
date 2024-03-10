import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
};

export const login = createAsyncThunk(
    "user/login",
    async (email, password) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post(
                "/api/v1/login",
                {email, password},
                config
            );
            return response.data.user;
        } catch (error) {
            return error.response.data.message;
        }
});

export const register = createAsyncThunk(
    "user/register",
    async (userData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(
                "/api/v1/register",
                userData,
                config
            );
            return response.data.user;
        } catch (error) {
            return error.response.data.message;
        }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;