import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        uid: null
    },
    reducers: {}
});

const authReducer = authSlice.reducer;

export default authReducer;
