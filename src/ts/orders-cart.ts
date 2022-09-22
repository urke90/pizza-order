import { IUpdatableIngredients } from './ingredients';
import { IAddress } from './address';

export interface ICartItem {
    pizzaId: string;
    userId: string;
    title: string;
    recipeId: string;
    quantity: number;
    imageUrl: string;
    sourceUrl: string;
    ingredients: IUpdatableIngredients;
}

export interface IOrderItem extends ICartItem {
    address: IAddress;
}
