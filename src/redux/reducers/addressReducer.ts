import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    createAddress,
    getAddresses,
    deleteAddress
} from 'redux/actions/address-actions';
import { RootState } from 'redux/store';
import { IAddress } from 'ts/address';

interface IInitialState {
    addresses: { [key: string]: IAddress };
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    addresses: {},
    isLoading: false,
    error: null
};

const addressSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        addAddress(state, action) {},
        updateAddress(state, action) {},
        removeAddress(state, action) {}
    },
    extraReducers(builder) {
        builder
            .addCase(createAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                const { addressId, data } = action.payload;
                state.addresses[addressId] = data;
                state.isLoading = false;
            })
            .addCase(
                createAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
        builder
            .addCase(getAddresses.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(
                getAddresses.fulfilled,
                (state, action: PayloadAction<{ [key: string]: IAddress }>) => {
                    state.addresses = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(
                getAddresses.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        builder
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                deleteAddress.fulfilled,
                (state, action: PayloadAction<string>) => {
                    const addressId = action.payload;

                    if (state.addresses[addressId] === undefined) {
                        throw new Error(`Address with ${addressId} not found!`);
                    }

                    delete state.addresses[addressId];

                    state.isLoading = false;
                }
            )
            .addCase(
                deleteAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    console.log('rejected deleteAddress', action);
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
    }
});

export const addressesSelector = {
    addresses: (state: RootState) => state.addressReducer.addresses,
    isLoading: (state: RootState) => state.addressReducer.isLoading,
    error: (state: RootState) => state.addressReducer.error
};

export const { addAddress, removeAddress, updateAddress } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
