import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.config';
import { API_ENDPOINTS } from 'api/endpoints';

import { IPizzas, ISelectedPizza } from 'ts/pizzas';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<{ recipes: IPizzas[] }>(
                API_ENDPOINTS.pizzas
            );

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchPizzaById = createAsyncThunk(
    'pizzas/fetchPizzaById',
    async (pizzaId: string, thunkAPI) => {
        try {
            const response = await axios.get<{ recipe: ISelectedPizza }>(
                API_ENDPOINTS.pizzaId + pizzaId
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
