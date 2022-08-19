import { IConvertedIngredients } from 'ts/ingredients';

// used to count ingredinet quantity if it's in format 1-1/4, 1-1/3 etc
const getIngredientQuantity = (ingQty: string): number => {
    const splitIngQty = ingQty.split('-');

    const ingQtyWholeNum = parseInt(splitIngQty[0]);
    const ingQtyFraction = splitIngQty[1];
    const countedFraction = countFractionQuantity(ingQtyFraction);

    const totalQuantity = ingQtyWholeNum + countedFraction;

    return totalQuantity;
};

// used to count fraction numbers like 1/4, 1/3 etc
const countFractionQuantity = (ingQtyFraction: string): number => {
    const ingQtyFractionSplit = ingQtyFraction.split('/');

    const firstNum = parseInt(ingQtyFractionSplit[0]);
    const secondNum = parseInt(ingQtyFractionSplit[1]);

    return firstNum / secondNum;
};

/**
 * INGRREDIENTS IF IF-ELSE CHECK STATEMENTS
 */

const ingredientIncludesDash = (ingredient: string): boolean =>
    ingredient.includes('-');

const ingredientIncludesSlash = (ingredient: string): boolean =>
    ingredient.includes('/');

const ingredientIsWholeNumber = (ingredient: string): boolean =>
    !!Number(ingredient);

export const ingredientIsFraction = (ingredient: string): boolean =>
    ingredient !== undefined &&
    ingredient.includes('/') &&
    !ingredient.includes('-');

// interface IConvertedIngredients {
//     title: string;
//     quantity: number;
// }

export const convertIngredientsForRendering = (
    ingredients: string[]
): IConvertedIngredients[] => {
    return ingredients.map((ing) => {
        const splitIng = ing.split(' ');
        const ingSplitFirstPart = splitIng[0];
        const ingSplitSecondPart = splitIng[1];

        let ingredientQuantity: number = 1;
        let ingredientTitle: string | string[] = '';

        if (ingredientIncludesDash(ingSplitFirstPart)) {
            // code to execute if ing first part is 1-1/4
            ingredientQuantity = getIngredientQuantity(ingSplitFirstPart);
        } else if (ingredientIncludesSlash(ingSplitFirstPart)) {
            // console.log('2');
            // code to execute if ing first part is exm: 1/4
            ingredientQuantity = countFractionQuantity(ingSplitFirstPart);
            // console.log('fractionSplit');
        }

        if (ingredientIsWholeNumber(ingSplitFirstPart)) {
            ingredientQuantity = Number(ingSplitFirstPart);
        }

        if (ingredientIsFraction(ingSplitSecondPart)) {
            const countedFraction = countFractionQuantity(ingSplitSecondPart);
            ingredientQuantity += countedFraction;
        }

        /**
         * *PART WHERE WE CHECK LABEL
         */

        if (
            ingredientIsWholeNumber(ingSplitFirstPart) ||
            ingredientIsFraction(ingSplitFirstPart) ||
            ingredientIncludesSlash(ingSplitFirstPart)
        ) {
            // if first part of sliced ingredient is 1 || 1-1/3 || 1/3
            if (
                ingredientIsWholeNumber(ingSplitSecondPart) ||
                ingredientIsFraction(ingSplitSecondPart) ||
                ingredientIncludesSlash(ingSplitSecondPart)
            ) {
                // if second part of sliced ingredient is 1 || 1-1/3 || 1/3
                ingredientTitle = splitIng.slice(2).join(' ');
            } else {
                ingredientTitle = splitIng.slice(1).join(' ');
            }
        } else {
            ingredientTitle = ing;
        }

        ingredientTitle = ingredientTitle.replace(/\s*\(.*?\)\s*/g, ' ').trim();

        return {
            title: ingredientTitle,
            quantity: ingredientQuantity
        };
        // return {
        //     [ingredientTitle]: ingredientQuantity
        //     // quantity: ingredientQuantity
        // };
    });
};
