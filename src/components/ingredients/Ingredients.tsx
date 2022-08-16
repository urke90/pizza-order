import React from 'react';

interface IIngredientsProps {
    ingredients: string[];
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
    console.log('ingredients in Ingredients component', ingredients);

    return <div>Ingredients component</div>;
};
export default Ingredients;
