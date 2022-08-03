import { createSlice } from '@reduxjs/toolkit';

interface IPaginationState {
    currentPage: number;
    itemsPerPage: number;
}

interface IPaginationAction {
    type: string;
    payload: {
        selectedPage: number;
    };
}

const initialState: IPaginationState = {
    currentPage: 1,
    itemsPerPage: 4
};

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
        selectPaginationPage(state, action: IPaginationAction) {
            const { selectedPage } = action.payload;
            state.currentPage = selectedPage;
        }
    }
});

const paginationReducer = paginationSlice.reducer;

export const {
    incrementPaginationPage,
    decrementPaginationPage,
    selectPaginationPage
} = paginationSlice.actions;

export default paginationReducer;
