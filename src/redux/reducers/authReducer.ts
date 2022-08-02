import { createSlice } from '@reduxjs/toolkit';

interface IAuthUser {
    isAuth: boolean;
    uid: string;
}

interface IUserPayload {
    type: string;
    payload: IAuthUser;
}

const initialState: IAuthUser = {
    isAuth: false,
    uid: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveUser(state, action: IUserPayload) {
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

export const { saveUser, removeUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
