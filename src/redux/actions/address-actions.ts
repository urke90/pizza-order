import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { IAddress } from 'ts/address';
import { db } from '../../firebase/firebase';
import { ref, push, set } from 'firebase/database';

import { DB_ENDPOINTS } from 'api/endpoints';

interface ICreateAddressData {
    uid: string;
    data: IAddress;
}

export const createAddress = createAsyncThunk(
    'address/createAddress',
    async ({ uid, data }: ICreateAddressData, thunkAPI) => {
        try {
            const userAddressRef = ref(db, 'addresses/' + uid);
            const newAddressRef = push(userAddressRef);
            const addressId = newAddressRef.key || uuid();
            data.id = addressId;
            await set(newAddressRef, data);
            return {
                data,
                addressId
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
