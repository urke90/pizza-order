import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { isUndefined, isEmptyObject } from 'util/check-statments';
import { ICartItem } from 'ts/orders-cart';
import type { TIngredientActionType } from 'ts/ingredients';

interface IInitialState {
    cart: {
        [key: string]: ICartItem;
    };
    isLoading: boolean;
}

const initialState: IInitialState = {
    cart: {},
    isLoading: false
};

export const emptyCartItem: ICartItem = {
    pizzaId: '',
    userId: '',
    title: '',
    recipeId: '',
    quantity: 0,
    price: 0,
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

            if (pizza.pizzaId && !isEmptyObject(pizza)) {
                state.cart[pizza.pizzaId] = pizza;

                toast.success(`${pizza.title} added to cart successfully!`);
            }
        },
        removePizzaFromCart(state, action: PayloadAction<string>) {
            const pizzaId = action.payload;

            if (isUndefined(state.cart[pizzaId])) {
                throw new Error(`pizza with ID: ${pizzaId} not found!`);
            }
            const pizzaTitle = state.cart[pizzaId].title;

            delete state.cart[pizzaId];

            toast.success(`${pizzaTitle} removed from cart successfully!`);
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
            const ingredientToUpdate = state.cart[pizzaId].ingredients[ingId];

            if (isIncrementAction) {
                ingredientToUpdate.quantity += value;
            } else {
                if (ingredientToUpdate.quantity <= value) {
                    return;
                }
                ingredientToUpdate.quantity -= value;
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

            const pizza = state.cart[pizzaId];

            if (isUndefined(state.cart[pizzaId].ingredients[ingId])) {
                throw new Error(`Ingredient with ID: ${ingId} doesn't exist`);
            }

            const ingredientTitle = pizza.ingredients[ingId].title;

            delete pizza.ingredients[ingId];

            toast.success(`${ingredientTitle} removed successfully!`);

            if (isEmptyObject(pizza.ingredients)) {
                const pizzaTitle = pizza.title;

                delete state.cart[pizzaId];

                toast.success(`${pizzaTitle} removed successfully!`);
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

            const pizza = state.cart[pizzaId];

            const isIncrementAction = type === 'inc';

            if (isIncrementAction) {
                pizza.quantity++;
            } else {
                if (pizza.quantity <= 1) {
                    const pizzaTitle = pizza.title;

                    delete state.cart[pizzaId];

                    toast.success(`${pizzaTitle} removed successfully!`);

                    return;
                }

                pizza.quantity--;
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
