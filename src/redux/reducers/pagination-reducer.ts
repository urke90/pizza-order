import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

interface IPaginationState {
    currentPage: number;
    itemsPerPage: number;
}

const initialState: IPaginationState = {
    currentPage: 1,
    itemsPerPage: 4
};

/**
 * TODO Add action for reseting current Page ===> add it when pizza is added to the cart
 */

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        incrementPaginationPage(state) {
            state.currentPage++;
        },
        decrementPaginationPage(state) {
            state.currentPage--;
        },
        selectPaginationPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    }
});

export const paginationSelectors = {
    currentPage: ({ paginationReducer: { currentPage } }: RootState) =>
        currentPage,
    itemsPerPage: ({ paginationReducer: { itemsPerPage } }: RootState) =>
        itemsPerPage
};
export const {
    incrementPaginationPage,
    decrementPaginationPage,
    selectPaginationPage
} = paginationSlice.actions;

const paginationReducer = paginationSlice.reducer;

export default paginationReducer;
