import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPizzas } from 'redux/actions/pizza-actions';
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
    isLoading: boolean;
    error: null | string;
}

export const emptySelectedPizza: ISelectedPizza = {
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
    selectedPizza: emptySelectedPizza,
    isLoading: false,
    error: null
};

/**
 * * https://www.youtube.com/watch?v=80c33x2ne20 ===> youtube video for async actions with TS
 * 1. 1st arg is type of the action: pizzas ===> slice name, /fetchPizzas ===> manually added
 * 2. 2nd arg is async function: 1st arg is data, second is thunkAPI
 * ! investigate 2nd argument for createAsyncThunk
 */

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
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
            state.selectedPizza = emptySelectedPizza;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPizzas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getPizzas.fulfilled,
                (state, action: PayloadAction<{ recipes: IPizzas[] }>) => {
                    const { recipes } = action.payload;
                    state.isLoading = false;
                    state.pizzas = recipes;
                }
            )
            .addCase(
                getPizzas.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const {
    savePizzaId,
    savePizzaRecipe,
    removePizzaId,
    removePizzaRecipe
} = pizzaSlice.actions;

const pizzaReducer = pizzaSlice.reducer;

export default pizzaReducer;
