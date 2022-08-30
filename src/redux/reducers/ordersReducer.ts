import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from 'ts/orders';

interface IInitialState {
    cart: {
        [key: string]: ICartItem;
    };
    orders: ICartItem[];
}

const initialState: IInitialState = {
    cart: {},
    orders: []
};

export const emptyCartItem: ICartItem = {
    id: '',
    uid: '',
    title: '',
    recipeId: '',
    quantity: 0,
    imageUrl: '',
    sourceUrl: '',
    ingredients: {}
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        /**
         * key should be uuidV4
         * object should be pizza
         */
        addPizzaToCart(state, action: PayloadAction<{ pizza: ICartItem }>) {
            const { pizza } = action.payload;
            console.log('pizza in order Slice', pizza);

            const isEmptyObject = Object.keys(pizza).length === 0;

            if (pizza.id && !isEmptyObject) {
                state.cart[pizza.id] = pizza;
            }
        },
        removePizzaFromCart() {
            console.log('remove pizza from cart');
        }
    }
});

export const { addPizzaToCart, removePizzaFromCart } = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
