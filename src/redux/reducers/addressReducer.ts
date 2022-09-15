import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddress } from 'ts/address';

interface IInitialState {
    addresses: IAddress[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    addresses: [],
    isLoading: false,
    error: null
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress(state, action) {},
        updateAddress(state, action) {},
        removeAddress(state, action) {}
    }
});

export const { addAddress, removeAddress, updateAddress } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
