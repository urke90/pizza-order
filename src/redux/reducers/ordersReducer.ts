import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncGetOrders, asyncCreateOrder } from 'redux/actions/ordersActions';
import { IOrderItem } from 'ts/orders-cart';

/**
 * NE ZNAM STA RADIM TREBA PIZZE KOJI SU:
 *      ICartItem[]
 */

interface IInitialState {
    orders: IOrderItem[];
}

const initialState: IInitialState = {
    orders: []
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {}
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;

/**
 * PRAVIMO NOVI KEY KOD SVAKOG ORDERA I ON CE IMATI:
 *      svaki cart item treba da ima addresu
 */
