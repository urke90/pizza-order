import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas, fetchPizzaById } from 'redux/actions/pizza-actions';
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
            .addCase(fetchPizzas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchPizzas.fulfilled,
                (state, action: PayloadAction<{ recipes: IPizzas[] }>) => {
                    const { recipes } = action.payload;
                    state.isLoading = false;
                    state.pizzas = recipes;
                }
            )
            .addCase(
                fetchPizzas.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        builder
            .addCase(fetchPizzaById.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(
                fetchPizzaById.fulfilled,
                (state, action: PayloadAction<{ recipe: ISelectedPizza }>) => {
                    const { recipe } = action.payload;
                    state.isLoading = false;
                    state.selectedPizza = recipe;
                }
            )
            .addCase(
                fetchPizzaById.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    }
});

// type TPizzaReducerSelectorsReturnTypes =
//     | IPizzas[]
//     | string
//     | ISelectedPizza
//     | boolean
//     | null;

// interface IPizzaReducerSelectors {
//     [key: string]: (state: IInitialState) => TPizzaReducerSelectorsReturnTypes;
// }
// interface IPizzaReducerSelectors {
//     [key in initialState]: (state: IInitialState) => TPizzaReducerSelectorsReturnTypes;
// }

// export const pizzaReducerSelectors: IPizzaReducerSelectors = {
//     pizzas: ({ pizzas }) => pizzas,
//     pizzaId: ({ pizzaId }) => pizzaId,
//     selectedPizza: ({ selectedPizza }) => selectedPizza
// };

export const pizzaReducerSelectors = {
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

export const {
    savePizzaId,
    savePizzaRecipe,
    removePizzaId,
    removePizzaRecipe
} = pizzaSlice.actions;

const pizzaReducer = pizzaSlice.reducer;

export default pizzaReducer;
