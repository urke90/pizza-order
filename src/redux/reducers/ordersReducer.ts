import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICartItem } from 'ts/orders';
import type { TIngredientActionType } from 'ts/ingredients';

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
    pizzaId: '',
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

            const isEmptyObject = Object.keys(pizza).length === 0;

            if (pizza.pizzaId && !isEmptyObject) {
                state.cart[pizza.pizzaId] = pizza;
            }
        },
        removePizzaFromCart() {
            console.log('remove pizza from cart');
        },
        changeIngredientQuantity(
            state,
            action: PayloadAction<{
                pizzaId: string;
                ingId: string;
                value: number;
                type: TIngredientActionType;
            }>
        ) {
            const { pizzaId, ingId, value, type } = action.payload;
            // console.log(' REDUCER pizzaId', pizzaId);
            // console.log('REDUCER ingId', ingId);
            // console.log('REDUCER value', value);
            // console.log('REDUCER type', type);
        }
    }
});

export const { addPizzaToCart, removePizzaFromCart, changeIngredientQuantity } =
    ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
