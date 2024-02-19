// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const reducer = combineReducers({
//     products : productSlice
// });

// let init = {};

// const middleware = [thunk];

// const store = createStore(reducer, init, composeWithDevTools(applyMiddleware(...middleware)));

import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';

export const store = configureStore({
    reducer : {
        product : productSlice,
    },
});