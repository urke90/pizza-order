import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import pizzaReducer from './reducers/pizzaReducer';
import paginationReducer from './reducers/paginationReducer';
import cartReducer from './reducers/cartReducer';

export const store = configureStore({
    reducer: {
        authReducer,
        pizzaReducer,
        paginationReducer,
        cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
