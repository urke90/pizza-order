import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

interface IAuthUser {
    isAuth: boolean;
    uid: string;
}

const initialState: IAuthUser = {
    isAuth: false,
    uid: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveUser(state, action: PayloadAction<IAuthUser>) {
            const { uid, isAuth } = action.payload;
            state.isAuth = isAuth;
            state.uid = uid;
        },
        removeUser(state) {
            state.isAuth = false;
            state.uid = '';
        }
    }
});

export const uidSelector = (state: RootState) => state.authReducer.uid;

export const { saveUser, removeUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
