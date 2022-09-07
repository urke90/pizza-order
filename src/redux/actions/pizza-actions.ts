import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.config';
import { API_ENDPOINTS } from 'api/endpoints';
import { IPizzas } from 'ts/pizzas';

export const getPizzas = createAsyncThunk(
    'pizzas/getPizzas',
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
