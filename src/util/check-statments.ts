// checks if value provided is undefined (mostly for objects)
export const isUndefined = (value: any): boolean => value === undefined;

export const isPizzaFetchedSuccessfully = (
    isLoading: boolean,
    recipeId: string,
    ingredients: string[],
    imageUrl: string,
    sourceUrl: string,
    title: string,
    error: string | null
): boolean =>
    !isLoading &&
    !!recipeId.trim() &&
    ingredients.length > 0 &&
    !!imageUrl.trim() &&
    !!sourceUrl.trim() &&
    !!title.trim() &&
    !error;

// checks if there is at least 1 key in the provided object
export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;
