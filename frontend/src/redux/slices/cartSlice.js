import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import {toast} from 'react-hot-toast' ;
import axios from "axios";

const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
    loading : false ,
    error : false ,
}

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (state, action) => {
        const item = action.payload ;
        const existingItemIndex = state.cart.findIndex(temp => temp._id === item.id);

    }
)

const cartSlice = createSlice({
    name : "cartDetails" , 
    initialState , 
    reducers : {
        removeFromCart: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item) => item._id === itemId)
 
            if (index >= 0) {
                 
                state.totalItems-- ;
                state.total -= state.cart[index].price
                state.cart[index].quantity-- ;
                if(state.cart[index].quantity === 0) state.cart.splice(index, 1) 
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems)) 
                //toast.success("Item removed from cart")
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(addToCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload.cart;
                    state.total = action.payload.total;
                    state.totalItems = action.payload.totalItems;
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
        
        }
    }
})

export const { removeFromCart} = cartSlice.actions ;

export default cartSlice.reducer;