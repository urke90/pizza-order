import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPizzas, getPizzaById } from 'redux/actions/pizza-actions';
import { RootState } from 'redux/store';
import { IPizzas, ISelectedPizza } from '../../ts/pizzas';

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

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        savePizzaId(state, action: PayloadAction<string>) {
            state.pizzaId = action.payload;
        },
        removePizzaId(state) {
            state.pizzaId = '';
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
                (state, action: PayloadAction<IPizzas[]>) => {
                    state.pizzas = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(
                getPizzas.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        builder
            .addCase(getPizzaById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getPizzaById.fulfilled,
                (state, action: PayloadAction<ISelectedPizza>) => {
                    state.selectedPizza = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(
                getPizzaById.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const pizzaSelectors = {
    pizzas: ({ pizzaReducer: { pizzas } }: RootState) => pizzas,
    pizzaId: ({ pizzaReducer: { pizzaId } }: RootState) => pizzaId,
    selectedPizza: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza,
    isLoading: ({ pizzaReducer: { isLoading } }: RootState) => isLoading,
    error: ({ pizzaReducer: { error } }: RootState) => error,
    imageUrl: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza.image_url,
    ingredients: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza.ingredients,
    recipeId: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza.recipe_id,
    sourceUrl: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza.source_url,
    title: ({ pizzaReducer: { selectedPizza } }: RootState) =>
        selectedPizza.title
};

export const { savePizzaId, removePizzaId, removePizzaRecipe } =
    pizzaSlice.actions;

const pizzaReducer = pizzaSlice.reducer;

export default pizzaReducer;
