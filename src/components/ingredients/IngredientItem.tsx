import {
    AiOutlinePlus,
    AiOutlineMinus,
    AiFillMinusCircle
} from 'react-icons/ai';
import { IConvertedIngredients } from 'ts/ingredients';
import type { TIngredientActionType } from 'ts/ingredients';

import Button from 'shared/form/Button';

import './IngredientItem.scss';

interface IIngredientItemProps {
    ingredient: IConvertedIngredients;
    onIngredientQtyChange: (
        id: string,
        value: number,
        type: TIngredientActionType
    ) => void;
    onIngredientRemove: (id: string) => void;
    ingValueConstant: number;
}

const IngredientItem: React.FC<IIngredientItemProps> = (props) => {
    const { id, title, quantity } = props.ingredient;
    const { ingValueConstant, onIngredientQtyChange, onIngredientRemove } =
        props;

    return (
        <li className="ingredient-item">
            <h4 className="ingredient-item__title">{title}</h4>
            <div className="ingredient-item__wrapper">
                <Button
                    type="button"
                    onClick={() =>
                        onIngredientQtyChange(id, ingValueConstant, 'inc')
                    }
                >
                    <AiOutlinePlus className="ingredient-item__button-icon" />
                </Button>
                <span className="ingredient-item__value">
                    {quantity.toFixed(2)}
                </span>
                <Button
                    type="button"
                    onClick={() =>
                        onIngredientQtyChange(id, ingValueConstant, 'dec')
                    }
                    disabled={ingValueConstant >= quantity}
                >
                    <AiOutlineMinus className="ingredient-item__button-icon" />
                </Button>
            </div>
            <div
                className="ingredient-item__button--remove"
                onClick={() => onIngredientRemove(id)}
            >
                <AiFillMinusCircle
                    className="ingredient-item__button--remove-icon"
                    size={30}
                />
                <p>Remove Ingredient</p>
            </div>
        </li>
    );
};
export default IngredientItem;
