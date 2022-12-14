// used to check common boolean
export const generateGeneralClassName = (
    value: boolean,
    truthyClass: string,
    falsyClass: string = ''
): string => (value ? truthyClass : falsyClass);

// generates className for inputs
export const isInvalid = (
    isValid: boolean,
    isTouched: boolean,
    classToAdd: string
): string => (!isValid && isTouched ? classToAdd : '');

// generate class if pizza is fetched by ID
export const isValidRecipeId = (recipeId: string, classToAdd: string) =>
    !!recipeId.trim() ? classToAdd : '';
