import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, push } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { IOrderItem } from 'ts/orders-cart';

export const asyncGetOrders = createAsyncThunk(
    'orders/getOrders',
    async (_, thunkAPI) => {
        try {
            // get request
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

interface IAsyncCreateOrder {
    uid: string;
    data: IOrderItem[];
}

export const asyncCreateOrder = createAsyncThunk(
    'orders/createOrder',
    async ({ uid, data }: IAsyncCreateOrder, thunkAPI) => {
        try {
            const ordersRef = ref(db, 'orders/' + uid);
            const newOrderRef = push(ordersRef);

            await set(newOrderRef, data);

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
