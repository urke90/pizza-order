import React from 'react';

import { IConvertedIngredients } from 'ts/ingredients';

interface IIngredientsProps {
    ingredients: IConvertedIngredients[];
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
    console.log('ingredients in Ingredients component', ingredients);

    return <div>Ingredients component</div>;
};
export default Ingredients;
