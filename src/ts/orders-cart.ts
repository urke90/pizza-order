import { IUpdatableIngredients } from './ingredients';
import { IAddress } from './address';

export interface ICartItem {
    pizzaId: string;
    userId: string;
    title: string;
    recipeId: string;
    quantity: number;
    price: number;
    imageUrl: string;
    sourceUrl: string;
    ingredients: IUpdatableIngredients;
}

export interface IOrder {
    orderId: string;
    totalPrice: number;
    items: ICartItem[];
    address: IAddress;
}
