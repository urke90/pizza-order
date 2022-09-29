import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPizzas, getPizzaById } from 'redux/actions/pizza-actions';
import { RootState } from 'redux/store';
import { IPizzas, ISelectedPizza } from '../../ts/pizzas';

import { pizzasPrices } from 'util/pizzas-data';

interface IInitialState {
    pizzas: IPizzas[];
    pizzaPrices: {
        [key: string]: number;
    };
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
    title: '',
    price: 0
};

const initialState: IInitialState = {
    pizzas: [],
    pizzaPrices: {},
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
                    const pizzas = action.payload;

                    /**
                     * pizzas prices are hardcoded since we don't want to generate random prices each time users logs in
                     * loop through pizzasPrices and pizzas and if indexes match create new objecte
                     * { [recipe_id]: price }
                     * this will ensure prices always stay the same for specific pizza
                     */
                    pizzas.forEach(({ recipe_id }, pizzaIndex) => {
                        pizzasPrices.forEach((price, priceIndex) => {
                            if (pizzaIndex === priceIndex) {
                                state.pizzaPrices = {
                                    ...state.pizzaPrices,
                                    [recipe_id]: price
                                };
                            }
                        });
                    });

                    state.pizzas = pizzas;
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
                    const selectedPizza = action.payload;

                    selectedPizza.price =
                        state.pizzaPrices[selectedPizza.recipe_id];

                    state.selectedPizza = selectedPizza;
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
