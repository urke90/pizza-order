// checks if value provided is undefined (mostly for objects)
export const isUndefined = (value: any): boolean => value === undefined;

/**
 * TODO CHECK WHAT WILL WE DO WITH THIS
 */

export const isPizzaFetchedSuccessfully = (
    isLoading: boolean,
    recipeId: string,
    ingredients: string[],
    imageUrl: string,
    sourceUrl: string,
    title: string,
    error: string | null
): boolean => {
    console.log('!isLoading', !isLoading);
    console.log('!!recipeId.trim()', !recipeId.trim());
    console.log('ingredients.length === 0', ingredients.length === 0);
    console.log('!imageUrl.trim()', !imageUrl.trim());
    console.log('!sourceUrl.trim()', !sourceUrl.trim());
    console.log('!title.trim()', !title.trim());
    console.log('!error', !error);
    console.log(
        '================================================================'
    );

    return (
        !isLoading &&
        !recipeId.trim() &&
        ingredients.length === 0 &&
        !imageUrl.trim() &&
        !sourceUrl.trim() &&
        !title.trim() &&
        !error
    );
};
