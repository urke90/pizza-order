import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { IAddress } from 'ts/address';
import { db } from '../../firebase/firebase';
import { ref, push, set, get, remove, update } from 'firebase/database';

enum AddressActionTypes {
    GET_ADDRESSES = 'addresses/getAddresses',
    CREATE_ADDRESS = 'addresses/createAddress',
    DELETE_ADDRESS = 'addresses/deleteAddress',
    UPDATE_ADDRESS = 'addresses/updateAddress'
}

interface ICreateAddressData {
    uid: string;
    data: IAddress;
}

export const asyncGetAddresses = createAsyncThunk(
    AddressActionTypes.GET_ADDRESSES,
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
    AddressActionTypes.CREATE_ADDRESS,
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
    AddressActionTypes.DELETE_ADDRESS,
    async ({ uid, addressId }: IDeleteAddressData, thunkAPI) => {
        try {
            const addressRef = ref(db, `addresses/${uid}/${addressId}`);

            await remove(addressRef);
            return addressId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

interface IUpdateAddressData {
    uid: string;
    data: IAddress;
    addressId: string;
}

export const asyncUpdateAddress = createAsyncThunk(
    AddressActionTypes.UPDATE_ADDRESS,
    async ({ uid, data, addressId }: IUpdateAddressData, thunkAPI) => {
        try {
            const addressRef = ref(db, `addresses/${uid}/${addressId}`);

            await update(addressRef, data);

            return {
                data,
                addressId
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
