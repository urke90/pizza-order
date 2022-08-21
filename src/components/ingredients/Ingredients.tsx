import { useState, useEffect } from 'react';

import Button from 'shared/form/Button';
import './Ingredients.scss';

// import Input from 'shared/form/Input';
import IngredientItem from './IngredientItem';

import { IUpdatableIngredients } from 'ts/ingredients';

interface IIngredientsProps {
    ingredients: IUpdatableIngredients;
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
    console.log('Updatable Ingredients in Ingredients.TSX', ingredients);

    const [ingValueConstant, setIngValueConstant] = useState<number>(0.25);

    const handleConstantValueChange = (value: number) =>
        setIngValueConstant(value);

    // const ingredientsIDs = Object.keys(ingredients);

    const ingredientsToRender = Object.values(ingredients);

    // console.log('ingredientsToRender', ingredientsToRender);

    return (
        <div className="ingredients">
            <div className="ingredients__heading">
                <p>Increment or decrement by:</p>
                <div className="ingredients__buttons-wrapper">
                    <Button
                        type="button"
                        onClick={() => handleConstantValueChange(0.25)}
                    >
                        0.25
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleConstantValueChange(1)}
                    >
                        1
                    </Button>
                </div>
                <ul className="ingredients__list">
                    {ingredientsToRender.map((ingredient) => (
                        <IngredientItem
                            key={ingredient.id}
                            ingredient={ingredient}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Ingredients;
