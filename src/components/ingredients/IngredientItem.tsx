import Button from 'shared/form/Button';
import { IConvertedIngredients } from 'ts/ingredients';
import {
    AiOutlinePlus,
    AiOutlineMinus,
    AiFillMinusCircle
} from 'react-icons/ai';
import type { TIngredientActionType } from 'ts/ingredients';

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
                    {/* <div className="ingredient-item__button-img">
                        <AiOutlinePlus />
                    </div> */}
                    +
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
                    {/* <div className="ingredient-item__button-img">
                        <AiOutlineMinus />
                    </div> */}
                    -
                </Button>
            </div>
            <div className="ingredient-item__button--remove">
                <div className="ingredient-item__button--remove-icon">
                    <AiFillMinusCircle
                        size={30}
                        onClick={() => onIngredientRemove(id)}
                    />
                </div>
                <p>Remove Ingredient</p>
            </div>
        </li>
    );
};
export default IngredientItem;
