import { useCallback, useState } from 'react';
import type { TIngredientActionType } from 'ts/ingredients';
import { IUpdatableIngredients } from 'ts/ingredients';
import IngredientConstValue from './IngredientConstValue';

import IngredientItem from './IngredientItem';

import './Ingredients.scss';

interface IIngredientsProps {
    ingredients: IUpdatableIngredients;
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

    const handleIngredientConstValueChange = useCallback(
        (value: number) => setIngValueConstant(value),
        []
    );

    // will return array [{ id, title, quantity }] for single ingredient
    const ingredientsToRender = Object.values(ingredients);

    return (
        <div className="ingredients">
            <IngredientConstValue
                ingValueConstant={ingValueConstant}
                onValueChange={handleIngredientConstValueChange}
            />
            <h4 className="ingredients__list-title">Ingredients</h4>
            <ul className="ingredients__list">
                {ingredientsToRender.length > 0 &&
                    ingredientsToRender.map((ingredient) => (
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
