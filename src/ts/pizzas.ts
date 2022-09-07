export interface IPizzas {
    image_url: string;
    publisher: string;
    publisher_url: string;
    recipe_id: string;
    social_rank: number;
    source_url: string;
    title: string;
}

export interface ISelectedPizza {
    image_url: string;
    ingredients: string[];
    publisher: string;
    publisher_url: string;
    recipe_id: string;
    social_rank: number;
    source_url: string;
    title: string;
}
