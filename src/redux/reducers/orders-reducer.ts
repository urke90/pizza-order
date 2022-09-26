import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncGetOrders, asyncCreateOrder } from 'redux/actions/orders-actions';
import { RootState } from 'redux/store';
import { IOrderItem } from 'ts/orders-cart';

interface IInitialState {
    orders: IOrderItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    orders: [],
    isLoading: false,
    error: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(asyncCreateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                asyncCreateOrder.fulfilled,
                (state, action: PayloadAction<IOrderItem[]>) => {
                    const data = action.payload;
                    const orders = [...state.orders, ...data].flat();

                    state.orders = orders;
                    state.isLoading = false;
                }
            )
            .addCase(
                asyncCreateOrder.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        builder
            .addCase(asyncGetOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                asyncGetOrders.fulfilled,
                (
                    state,
                    action: PayloadAction<{ [key: string]: IOrderItem[] }>
                ) => {
                    const orders = Object.values(action.payload).flat();

                    state.orders = orders;
                    state.isLoading = false;
                }
            )
            .addCase(
                asyncGetOrders.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const ordersSelectors = {
    orders: (state: RootState) => state.ordersReducer.orders,
    isLoading: (state: RootState) => state.ordersReducer.isLoading,
    error: (state: RootState) => state.ordersReducer.error
};

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
