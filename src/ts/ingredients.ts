export interface IConvertedIngredients {
    id: string;
    title: string;
    quantity: number;
}

export interface IUpdatableIngredients {
    [key: string]: IConvertedIngredients;
}
