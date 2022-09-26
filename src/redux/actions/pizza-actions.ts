import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../api/axios.config';
import { PIZZA_ENDPOINTS } from 'api/endpoints';
import { IPizzas, ISelectedPizza } from 'ts/pizzas';

enum PizzaActionTypes {
    GET_PIZZAS = 'pizzas/getPizzas',
    GET_PIZZA_BY_ID = 'pizzas/getPizzaById'
}

export const getPizzas = createAsyncThunk(
    PizzaActionTypes.GET_PIZZAS,
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

export const getPizzaById = createAsyncThunk(
    PizzaActionTypes.GET_PIZZA_BY_ID,
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
