import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, update } from 'firebase/database';
import { db } from 'firebase/firebase';

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

export const asyncCreateOrder = createAsyncThunk(
    'orders/createOrder',
    async (_, thunkAPI) => {
        try {
            // create order
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
