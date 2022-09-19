import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddress } from 'ts/address';
import { db } from '../../firebase/firebase';
import { ref, push, set } from 'firebase/database';
import { DB_ENDPOINTS } from 'api/endpoints';

interface ICreateAddressData {
    uid: string;
    data: any;
}

export const createAddress = createAsyncThunk(
    'address/createAddress',
    async ({ uid, data }: ICreateAddressData, thunkAPI) => {
        try {
            const userAddressRef = ref(db, 'addresses/' + uid);
            const newAddressRef = push(userAddressRef);

            const response = await set(newAddressRef, data);
            console.log('response create address', response);
        } catch (error) {
            console.log('error creating new address in ASYN ACTIOn', error);
        }
    }
);
