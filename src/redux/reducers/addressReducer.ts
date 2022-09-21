import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    asyncGetAddresses,
    asyncCreateAddress,
    asyncDeleteAddress,
    asyncUpdateAddress
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
        // updateAddress(state, action) {},
        removeAddress(state, action) {}
    },
    extraReducers(builder) {
        builder
            .addCase(asyncCreateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncCreateAddress.fulfilled, (state, action) => {
                const { addressId, data } = action.payload;
                state.addresses[addressId] = data;
                state.isLoading = false;
            })
            .addCase(
                asyncCreateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
        builder
            .addCase(asyncGetAddresses.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(
                asyncGetAddresses.fulfilled,
                (state, action: PayloadAction<{ [key: string]: IAddress }>) => {
                    state.addresses = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(
                asyncGetAddresses.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        builder
            .addCase(asyncDeleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                asyncDeleteAddress.fulfilled,
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
                asyncDeleteAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    console.log('rejected deleteAddress', action);
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
        builder
            .addCase(asyncUpdateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncUpdateAddress.fulfilled, (state, action) => {
                // const addressId = action.payload;
                // if (state.addresses[addressId] === undefined) {
                //     throw new Error(`Address with ${addressId} not found!`);
                // }
                // delete state.addresses[addressId];
                // state.isLoading = false;
            })
            .addCase(
                asyncUpdateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    // console.log('rejected deleteAddress', action);
                    // state.error = action.payload;
                    // state.isLoading = false;
                }
            );
    }
});

export const addressesSelector = {
    addresses: (state: RootState) => state.addressReducer.addresses,
    isLoading: (state: RootState) => state.addressReducer.isLoading,
    error: (state: RootState) => state.addressReducer.error
};

export const { addAddress, removeAddress } = addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
