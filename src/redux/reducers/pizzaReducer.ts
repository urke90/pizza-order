import { createSlice } from '@reduxjs/toolkit';

interface IPizzas {
    image_url: string;
    publisher: string;
    publisher_url: string;
    recipe_id: string;
    social_rank: number;
    source_url: string;
    title: string;
}

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

const initialState: IInitialState = {
    pizzas: [],
    pizzaId: '',
    selectedPizza: {
        image_url: '',
        ingredients: [],
        publisher: '',
        publisher_url: '',
        recipe_id: '',
        social_rank: 0,
        source_url: '',
        title: ''
    }
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {}
});

const pizzaReducer = pizzaSlice.reducer;

export default pizzaReducer;
