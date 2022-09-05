import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

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
        removePizzaFromCart(state, action: PayloadAction<{ pizzaId: string }>) {
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

            if (state.cart[pizzaId] === undefined) {
                throw new Error(`Pizza with ID: ${pizzaId} is not found!!!`);
            }

            if (state.cart[pizzaId].ingredients[ingId] === undefined) {
                throw new Error(`Ingredient with ID: ${ingId} is not found!!!`);
            }

            const isIncrementAction = type === 'inc';

            if (isIncrementAction) {
                state.cart[pizzaId].ingredients[ingId].quantity += value;
            } else {
                state.cart[pizzaId].ingredients[ingId].quantity -= value;
            }
        },
        removePizzaIngredient(
            state,
            action: PayloadAction<{ pizzaId: string; ingId: string }>
        ) {
            const { ingId, pizzaId } = action.payload;

            if (state.cart[pizzaId] === undefined) {
                throw new Error(`Pizza with ID: ${pizzaId} not found`);
            }

            if (state.cart[pizzaId].ingredients[ingId] === undefined) {
                throw new Error(`Ingredient with ID: ${ingId} doesn't exist`);
            }

            delete state.cart[pizzaId].ingredients[ingId];

            if (Object.keys(state.cart[pizzaId].ingredients).length === 0) {
                delete state.cart[pizzaId];
            }
        },
        changePizzaQuantity(
            state,
            action: PayloadAction<{
                pizzaId: string;
                type: TIngredientActionType;
            }>
        ) {
            const { pizzaId, type } = action.payload;

            if (state.cart[pizzaId] === undefined) {
                throw new Error(`Can't find pizza with ID: ${pizzaId}`);
            }

            const isIncrementAction = type === 'inc';

            if (isIncrementAction) {
                state.cart[pizzaId].quantity++;
            } else {
                if (state.cart[pizzaId].quantity <= 1) {
                    delete state.cart[pizzaId];
                    return;
                }

                state.cart[pizzaId].quantity--;
            }

            console.log('state cart pizza qty change', current(state.cart));
        }
    }
});

export const {
    addPizzaToCart,
    removePizzaFromCart,
    changeIngredientQuantity,
    removePizzaIngredient,
    changePizzaQuantity
} = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
