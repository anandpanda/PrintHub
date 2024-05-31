import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

//It's an action
export const createProduct = createAsyncThunk(
  "/createProduct",
  async (productData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",    //"multipart/form-data" //"application/json"
        },
      };

      const response = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const newproductSlice = createSlice({
  name: "newproduct",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetNewProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //Handle the fetchProductDetails actions
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || {};
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { clearErrors, resetNewProduct } = newproductSlice.actions;
export default newproductSlice.reducer;







//New Code
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   product: {},
//   loading: false,
//   error: null,
//   success: false,
// };

// export const createProduct = createAsyncThunk(
//   "newproduct/createProduct", // Correct action type
//   async (productData, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data", // Correct content type for file uploads
//         },
//       };

//       const response = await axios.post(
//         "/api/v1/admin/product/new",
//         productData,
//         config
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// const newproductSlice = createSlice({
//   name: "newproduct",
//   initialState,
//   reducers: {
//     clearErrors: (state) => {
//       state.error = null;
//     },
//     resetNewProduct: (state) => {
//       state.success = false;
//       state.product = {};
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.product = action.payload.product || {};
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addDefaultCase((state) => state);
//   },
// });

// export const { clearErrors, resetNewProduct } = newproductSlice.actions;
// export default newproductSlice.reducer;
