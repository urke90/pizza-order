// generate class if pizza is fetched by ID
export const generateClassName = (recipeId: string, classToAdd: string) =>
    recipeId !== '' ? classToAdd : '';
