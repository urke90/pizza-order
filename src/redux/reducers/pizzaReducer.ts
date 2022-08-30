import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizzas } from '../../ts/pizzas';

interface ISelectedPizza {
    image_url: string;
    ingredients: string[];
    publisher: string;
    publisher_url: string;
    recipe_id: string;
    social_rank: number;
    source_url: string;
    title: string;
}

interface IInitialState {
    pizzas: IPizzas[];
    pizzaId: string;
    selectedPizza: ISelectedPizza;
}

export const emptyPizzaSkeleton: ISelectedPizza = {
    image_url: '',
    ingredients: [],
    publisher: '',
    publisher_url: '',
    recipe_id: '',
    social_rank: 0,
    source_url: '',
    title: ''
};

const initialState: IInitialState = {
    pizzas: [],
    pizzaId: '',
    selectedPizza: emptyPizzaSkeleton
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        saveFetchedPizzas(state, action: PayloadAction<{ pizzas: IPizzas[] }>) {
            const { pizzas } = action.payload;
            state.pizzas = pizzas;
        },
        savePizzaId(state, action: PayloadAction<{ pizzaId: string }>) {
            const { pizzaId } = action.payload;

            state.pizzaId = pizzaId;
        },
        removePizzaId(state) {
            state.pizzaId = '';
        },
        savePizzaRecipe(
            state,
            action: PayloadAction<{ selectedPizza: ISelectedPizza }>
        ) {
            const { selectedPizza } = action.payload;
            state.selectedPizza = selectedPizza;
        },
        removePizzaRecipe(state) {
            state.selectedPizza = emptyPizzaSkeleton;
        }
    }
});

export const {
    saveFetchedPizzas,
    savePizzaId,
    savePizzaRecipe,
    removePizzaId,
    removePizzaRecipe
} = pizzaSlice.actions;

const pizzaReducer = pizzaSlice.reducer;

export default pizzaReducer;
