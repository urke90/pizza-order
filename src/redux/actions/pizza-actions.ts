import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../api/axios.config';
import { PIZZA_ENDPOINTS } from 'api/endpoints';

import { IPizzas, ISelectedPizza } from 'ts/pizzas';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (_, thunkAPI) => {
        try {
            const url = PIZZA_ENDPOINTS.pizzas;

            const response = await axiosRequest({ url, method: 'GET' });
            const recipes: IPizzas[] = response.data.recipes;

            return recipes;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchPizzaById = createAsyncThunk(
    'pizzas/fetchPizzaById',
    async (pizzaId: string, thunkAPI) => {
        try {
            const url = PIZZA_ENDPOINTS.pizzaId + pizzaId;

            const response = await axiosRequest({ url, method: 'GET' });
            const selectedPizza: ISelectedPizza = response.data.recipe;

            return selectedPizza;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
