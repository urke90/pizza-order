import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
    isBtnDisabled: boolean;
}

const initialState: IInitialState = {
    addresses: {},
    selectedAddressId: '',
    isLoading: false,
    error: null,
    isBtnDisabled: false
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
                    toast.error('Something went wrong!');
                }
            );
        builder
            .addCase(asyncCreateAddress.pending, (state) => {
                toast.info('Creating new address...');
                state.isBtnDisabled = true;
            })
            .addCase(
                asyncCreateAddress.fulfilled,
                (
                    state,
                    action: PayloadAction<{ addressId: string; data: IAddress }>
                ) => {
                    const { addressId, data } = action.payload;
                    state.addresses[addressId] = data;
                    toast.success('Address created successfully!');
                    state.isBtnDisabled = false;
                }
            )
            .addCase(
                asyncCreateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    toast.error(
                        'Something went wrong! Address is not created!'
                    );
                    state.isBtnDisabled = false;
                }
            );
        builder
            .addCase(asyncUpdateAddress.pending, (state) => {
                toast.info('Updating address...');
                state.isBtnDisabled = true;
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

                    const addressStreet = data.street;

                    toast.success(
                        `Address ${addressStreet} updated successfully!`
                    );
                    state.isBtnDisabled = false;
                }
            )
            .addCase(
                asyncUpdateAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    toast.error(
                        'Something went wrong! Address is not updated!'
                    );
                    state.isBtnDisabled = false;
                }
            );
        builder
            .addCase(asyncDeleteAddress.pending, (state) => {
                toast.info('Deleting address...');
                state.isBtnDisabled = true;
            })
            .addCase(
                asyncDeleteAddress.fulfilled,
                (state, action: PayloadAction<string>) => {
                    const addressId = action.payload;

                    if (isUndefined(state.addresses[addressId])) {
                        throw new Error(`Address with ${addressId} not found!`);
                    }

                    const addressStreet = state.addresses[addressId].street;

                    delete state.addresses[addressId];

                    toast.success(
                        `Address ${addressStreet} deleted successfully!`
                    );
                    state.isBtnDisabled = false;
                }
            )
            .addCase(
                asyncDeleteAddress.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload;
                    toast.error('Something went wrong! Address is not deleted');
                    state.isBtnDisabled = false;
                }
            );
    }
});

export const addressesSelector = {
    addresses: (state: RootState) => state.addressReducer.addresses,
    isLoading: (state: RootState) => state.addressReducer.isLoading,
    error: (state: RootState) => state.addressReducer.error,
    selectedAddressId: (state: RootState) =>
        state.addressReducer.selectedAddressId,
    isBtnDisabled: (state: RootState) => state.addressReducer.isBtnDisabled
};

export const { selectAddressForCart, removeSelectedAddressId } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
