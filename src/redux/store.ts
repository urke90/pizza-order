import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import pizzaReducer from './reducers/pizzaReducer';

export const store = configureStore({
    reducer: {
        authReducer,
        pizzaReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
