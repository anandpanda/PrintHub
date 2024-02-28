import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await axios.get("/api/v1/products");
    return response.data;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.productsCount;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addDefaultCase((state) => state);
    },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
