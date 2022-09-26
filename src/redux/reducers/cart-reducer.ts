import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isUndefined } from 'util/check-statments';
import { ICartItem } from 'ts/orders-cart';
import type { TIngredientActionType } from 'ts/ingredients';

interface IInitialState {
    cart: {
        [key: string]: ICartItem;
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    cart: {},
    isLoading: false,
    error: null
};

export const emptyCartItem: ICartItem = {
    pizzaId: '',
    userId: '',
    title: '',
    recipeId: '',
    quantity: 0,
    imageUrl: '',
    sourceUrl: '',
    ingredients: {}
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaToCart(state, action: PayloadAction<ICartItem>) {
            const pizza = action.payload;

            const isEmptyObject = Object.keys(pizza).length === 0;

            if (pizza.pizzaId && !isEmptyObject) {
                state.cart[pizza.pizzaId] = pizza;
            }
        },
        removePizzaFromCart(state, action: PayloadAction<string>) {
            const pizzaId = action.payload;

            if (isUndefined(state.cart[pizzaId])) {
                throw new Error(`pizza with ID: ${pizzaId} not found!`);
            }

            delete state.cart[pizzaId];
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

            if (isUndefined(state.cart[pizzaId])) {
                throw new Error(`Pizza with ID: ${pizzaId} is not found!!!`);
            }

            if (isUndefined(state.cart[pizzaId].ingredients[ingId])) {
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

            if (isUndefined(state.cart[pizzaId])) {
                throw new Error(`Pizza with ID: ${pizzaId} not found`);
            }

            if (isUndefined(state.cart[pizzaId].ingredients[ingId])) {
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

            if (isUndefined(state.cart[pizzaId])) {
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
        },
        resetCart(state) {
            state.cart = {};
        }
    }
});

export const {
    addPizzaToCart,
    removePizzaFromCart,
    changeIngredientQuantity,
    removePizzaIngredient,
    changePizzaQuantity,
    resetCart
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
