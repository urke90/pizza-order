import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, push } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { ICartItem } from 'ts/orders';

export const createCartOrder = createAsyncThunk(
    'cart/createCartOrder',
    async (
        { uid, cartItems }: { uid: string; cartItems: ICartItem[] },
        thunkAPI
    ) => {
        try {
            const userOrderRef = ref(db, 'orders/' + uid);

            const newOrderRef = push(userOrderRef);

            await set(newOrderRef, cartItems);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
