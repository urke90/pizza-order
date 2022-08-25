import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    orders: []
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {}
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
