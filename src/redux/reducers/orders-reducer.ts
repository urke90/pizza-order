import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { asyncGetOrders, asyncCreateOrder } from 'redux/actions/orders-actions';
import { RootState } from 'redux/store';
import { IOrderItem } from 'ts/orders-cart';

interface IInitialState {
    orders: {
        [key: string]: IOrderItem[];
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    orders: {},
    isLoading: false,
    error: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
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
                    const orders = action.payload;

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
        builder
            .addCase(asyncCreateOrder.pending, () => {
                toast.info('Creating order in progress...');
            })
            .addCase(
                asyncCreateOrder.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        data: IOrderItem[];
                        orderId: string;
                    }>
                ) => {
                    const { data, orderId } = action.payload;
                    const orders = { ...state.orders, [orderId]: [...data] };

                    state.orders = orders;
                    toast.success('Order created successfully!');
                }
            )
            .addCase(
                asyncCreateOrder.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    toast.error('Something went wrong, order is not created!');
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
