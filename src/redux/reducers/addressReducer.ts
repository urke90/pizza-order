import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createAddress } from 'redux/actions/address-actions';
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
    },
    extraReducers(builder) {
        builder
            .addCase(createAddress.pending, (state, action) => {
                console.log('pending action', action);
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                console.log('fulfilled, action', action);
            })
            .addCase(createAddress.rejected, (state, action) => {
                console.log('pending action', action);
            });
    }
});

export const { addAddress, removeAddress, updateAddress } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
