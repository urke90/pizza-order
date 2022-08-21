import { useState, useEffect } from 'react';

import Button from 'shared/form/Button';
import './Ingredients.scss';

// import Input from 'shared/form/Input';
import IngredientItem from './IngredientItem';

import { IConvertedIngredients } from 'ts/ingredients';

interface IIngredientsProps {
    ingredients: IConvertedIngredients[];
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
    console.log('ingredients in Ingredients component', ingredients);

    const [ingValueConstant, setIngValueConstant] = useState<number>(0.25);

    const handleConstantValueChange = (value: number) =>
        setIngValueConstant(value);

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
                    <IngredientItem />
                    <IngredientItem />
                    <IngredientItem />
                </ul>
            </div>
        </div>
    );
};
export default Ingredients;
