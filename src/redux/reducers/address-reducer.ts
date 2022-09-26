import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isUndefined } from 'util/check-statments';
import { RootState } from 'redux/store';
import { IAddress } from 'ts/address';

import {
    asyncGetAddresses,
    asyncCreateAddress,
    asyncDeleteAddress,
    asyncUpdateAddress
} from 'redux/actions/address-actions';

interface IInitialState {
    addresses: { [key: string]: IAddress };
    selectedAddressId: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    addresses: {},
    selectedAddressId: '',
    isLoading: false,
    error: null
};

const addressSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        selectAddressForCart(state, action: PayloadAction<string>) {
            state.selectedAddressId = action.payload;
        },
        removeSelectedAddressId(state) {
            state.selectedAddressId = '';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(asyncCreateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                asyncCreateAddress.fulfilled,
                (
                    state,
                    action: PayloadAction<{ addressId: string; data: IAddress }>
                ) => {
                    const { addressId, data } = action.payload;
                    state.addresses[addressId] = data;
                    state.isLoading = false;
                }
            )
            .addCase(
                asyncCreateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
        builder
            .addCase(asyncGetAddresses.pending, (state) => {
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

                    if (isUndefined(state.addresses[addressId])) {
                        throw new Error(`Address with ${addressId} not found!`);
                    }

                    delete state.addresses[addressId];

                    state.isLoading = false;
                }
            )
            .addCase(
                asyncDeleteAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
        builder
            .addCase(asyncUpdateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                asyncUpdateAddress.fulfilled,
                (
                    state,
                    action: PayloadAction<{ data: IAddress; addressId: string }>
                ) => {
                    const { data, addressId } = action.payload;
                    if (isUndefined(state.addresses[addressId])) {
                        throw new Error(`Address with ${addressId} not found!`);
                    }
                    state.addresses[addressId] = data;
                    state.isLoading = false;
                }
            )
            .addCase(
                asyncUpdateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            );
    }
});

export const addressesSelector = {
    addresses: (state: RootState) => state.addressReducer.addresses,
    isLoading: (state: RootState) => state.addressReducer.isLoading,
    error: (state: RootState) => state.addressReducer.error,
    selectedAddressId: (state: RootState) =>
        state.addressReducer.selectedAddressId
};

export const { selectAddressForCart, removeSelectedAddressId } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
