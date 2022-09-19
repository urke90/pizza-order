import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createAddress } from 'redux/actions/address-actions';
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
    name: 'address',
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
            .addCase(
                createAddress.fulfilled,
                (
                    state,
                    action: PayloadAction<{ data: IAddress; addressId: string }>
                ) => {
                    console.log('fulfilled, action', action);
                    const { addressId, data } = action.payload;

                    state.isLoading = false;
                }
            )
            .addCase(createAddress.rejected, (state, action) => {
                console.log('rejected action', action);
            });
    }
});

export const { addAddress, removeAddress, updateAddress } =
    addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;
