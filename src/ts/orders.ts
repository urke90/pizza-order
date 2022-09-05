import { IUpdatableIngredients } from './ingredients';

export interface ICartItem {
    pizzaId: string;
    uid: string;
    title: string;
    recipeId: string;
    quantity: number;
    imageUrl: string;
    sourceUrl: string;
    ingredients: IUpdatableIngredients;
}
