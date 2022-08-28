// const orderedPizza = {
//     uid --- userID (string)
//     title, ----- pizza title (string)
//     recipeId --- recipe_id (string)
//     quantity --- number of pizzas ordered (nunnber)
//     imageUrl --- string
//     sourceUrl --- string
//     ingredients: {} ovo ce biti updatable ingredients (updatableIngredients) (IUpdatableIngredients)
// };

import { IUpdatableIngredients } from './ingredients';

export interface ICartItem {
    uid: string;
    title: string;
    recipeId: string;
    quantity: number;
    imageUrl: string;
    sourceUrl: string;
    ingredients: IUpdatableIngredients;
}
