import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, push, get } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { IOrder } from 'ts/orders-cart';

enum OrdersActionTypes {
    GET_ORDERS = 'orders/getOrders',
    CREATE_ORDER = 'orders/createOrder'
}

export const asyncGetOrders = createAsyncThunk(
    OrdersActionTypes.GET_ORDERS,
    async (uid: string, thunkAPI) => {
        try {
            const ordersRef = ref(db, 'orders/' + uid);

            const response = await get(ordersRef);

            if (response.exists()) {
                return response.val();
            }

            return {};
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

interface IAsyncCreateOrder {
    uid: string;
    data: IOrder;
}

export const asyncCreateOrder = createAsyncThunk(
    OrdersActionTypes.CREATE_ORDER,
    async ({ uid, data }: IAsyncCreateOrder, thunkAPI) => {
        try {
            const ordersRef = ref(db, 'orders/' + uid);
            const newOrderRef = push(ordersRef);
            const newOrderKey = newOrderRef.key!;
            data.orderId = newOrderKey;

            await set(newOrderRef, data);

            return {
                data,
                orderId: newOrderKey
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
