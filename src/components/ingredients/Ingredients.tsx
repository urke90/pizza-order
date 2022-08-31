import { useState } from 'react';
import type { TIngredientActionType } from 'ts/ingredients';
import { IUpdatableIngredients } from 'ts/ingredients';

import Button from 'shared/form/Button';
import IngredientItem from './IngredientItem';

import './Ingredients.scss';

interface IIngredientsProps {
    ingredients: IUpdatableIngredients;
    bla?: IUpdatableIngredients;
    onIngredientQtyChange: (
        id: string,
        value: number,
        type: TIngredientActionType
    ) => void;
    onIngredientRemove: (id: string) => void;
}

const Ingredients: React.FC<IIngredientsProps> = ({
    ingredients,
    onIngredientQtyChange,
    onIngredientRemove
}) => {
    const [ingValueConstant, setIngValueConstant] = useState<number>(0.25);

    // will return array [{ id, title, quantity }] for single ingredient
    const ingredientsToRender = Object.values(ingredients);

    return (
        <div className="ingredients">
            <div className="ingredients__heading">
                <h4>Increment or decrement by:</h4>
            </div>
            <div className="ingredients__buttons-wrapper">
                <Button
                    type="button"
                    onClick={() => setIngValueConstant(0.25)}
                    secondary={ingValueConstant === 0.25 ? true : false}
                >
                    0.25
                </Button>
                <span className="ingredients__constant-value">
                    {ingValueConstant}
                </span>
                <Button
                    type="button"
                    onClick={() => setIngValueConstant(1)}
                    secondary={ingValueConstant === 1 ? true : false}
                >
                    1
                </Button>
            </div>
            <h4 className="ingredients__list-title">Ingredients</h4>
            <ul className="ingredients__list">
                {ingredientsToRender.map((ingredient) => (
                    <IngredientItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        onIngredientQtyChange={onIngredientQtyChange}
                        onIngredientRemove={onIngredientRemove}
                        ingValueConstant={ingValueConstant}
                    />
                ))}
            </ul>
        </div>
    );
};
export default Ingredients;
