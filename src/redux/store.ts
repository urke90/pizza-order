import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer';
import pizzaReducer from './reducers/pizza-reducer';
import paginationReducer from './reducers/pagination-reducer';
import cartReducer from './reducers/cart-reducer';
import addressReducer from './reducers/address-reducer';
import ordersReducer from './reducers/orders-reducer';

export const store = configureStore({
    reducer: {
        authReducer,
        pizzaReducer,
        paginationReducer,
        cartReducer,
        addressReducer,
        ordersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
