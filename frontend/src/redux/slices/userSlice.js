import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
};

//Login Action
export const login = createAsyncThunk("user/login", async (email, password) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            "/api/v1/login",
            { email, password },
            config
        );
        return response.data.user;
    } catch (error) {
        return error.response.data.message;
    }
});

//Register Action
export const register = createAsyncThunk("user/register", async (userData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await axios.post("/api/v1/register", userData, config);
        return response.data.user;
    } catch (error) {
        return error.response.data.message;
    }
});

//LoadUser Action
export const loaduser = createAsyncThunk("user/loaduser", async () => {
    try {
        console.log("loaduser tak aa gya");
        const response = await axios.get("/api/v1/me");
        console.log("nhi hua");
        return response.data.user;
    } catch (error) {
        return error.response.data.message;
    }
});

//Logout Action
export const logout = createAsyncThunk("user/logout", async () => {
    try {
        await axios.get("/api/v1/logout");
        return { message: "Logout successful" };
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

            //Login reducers
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
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

            //Register reducers
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //Load user reducers
            .addCase(loaduser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(loaduser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loaduser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
                state.user = null;
            })

            //Logout reducers
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = true;
            });
    },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
