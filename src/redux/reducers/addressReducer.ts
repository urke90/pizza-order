import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    addresses: IAddress[];
    isLoading: boolean;
    error: string | null;
}

interface IAddress {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string | number;
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
