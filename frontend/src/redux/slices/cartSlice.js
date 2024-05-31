import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const addToCart = createAsyncThunk(
	"cart/addItemsToCart",
	async ({ id, quantity }) => {
		const { data } = await axios.get(`/api/v1/product/${id}`);
		return {
			product: data.product._id,
			name: data.product.name,
			price: data.product.price,
			image: data.product.images[0].url,
			stock: data.product.stock,
			quantity,
		};
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/removeItemsFromCart",
	async (id) => id
);

export const saveShippingInfo = createAsyncThunk(
	"cart/saveShippingInfo",
	async (data) => data
);

// Slice
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.fulfilled, (state, action) => {
				const item = action.payload;
				const isItemExist = state.cartItems.find(
					(i) => i.product === item.product
				);

				if (isItemExist) {
					state.cartItems = state.cartItems.map((i) =>
						i.product === isItemExist.product ? item : i
					);
				} else {
					state.cartItems.push(item);
				}

				localStorage.setItem(
					"cartItems",
					JSON.stringify(state.cartItems)
				);
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.cartItems = state.cartItems.filter(
					(i) => i.product !== action.payload
				);

				localStorage.setItem(
					"cartItems",
					JSON.stringify(state.cartItems)
				);
			})
			.addCase(saveShippingInfo.fulfilled, (state, action) => {
				state.shippingInfo = action.payload;

				localStorage.setItem(
					"shippingInfo",
					JSON.stringify(state.shippingInfo)
				);
			});
	},
});

export default cartSlice.reducer;