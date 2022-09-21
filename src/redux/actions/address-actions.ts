import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { IAddress } from 'ts/address';
import { db } from '../../firebase/firebase';
import { ref, push, set, get, remove } from 'firebase/database';

interface ICreateAddressData {
    uid: string;
    data: IAddress;
}

export const asyncGetAddresses = createAsyncThunk(
    'addresses',
    async (uid: string, thunkAPI) => {
        try {
            const addressesRef = ref(db, 'addresses/' + uid);

            const addresses = await get(addressesRef);

            if (addresses.exists()) {
                return addresses.val();
            }

            return {};
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const asyncCreateAddress = createAsyncThunk(
    'addresses/createAddress',
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

interface IDeleteAddressData {
    uid: string;
    addressId: string;
}

export const asyncDeleteAddress = createAsyncThunk(
    'addresses/deleteAddress',
    async ({ uid, addressId }: IDeleteAddressData, thunkAPI) => {
        try {
            const addressRef = ref(db, `addresses/${uid}/${addressId}`);

            await remove(addressRef);
            return addressId;
        } catch (error: any) {
            console.log('error DELETING ADDRESS', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const asyncUpdateAddress = createAsyncThunk(
    'addresses/updateAddress',
    async (_, thunkAPI) => {
        try {
        } catch (error) {}
    }
);
