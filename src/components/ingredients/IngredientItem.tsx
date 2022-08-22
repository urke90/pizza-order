import Button from 'shared/form/Button';
import { IConvertedIngredients } from 'ts/ingredients';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import type { TIngredientActionType } from 'ts/ingredients';

import './IngredientItem.scss';

interface IIngredientItemProps {
    ingredient: IConvertedIngredients;
    onIngredientQtyChange: (id: string, type: TIngredientActionType) => void;
}

const IngredientItem: React.FC<IIngredientItemProps> = (props) => {
    const { id, title, quantity } = props.ingredient;
    const { onIngredientQtyChange } = props;

    return (
        <li className="ingredient-item">
            <p className="ingredient-item__title">{title}</p>
            <div className="ingredient-item__wrapper">
                <Button
                    type="button"
                    onClick={() => onIngredientQtyChange(id, 'inc')}
                >
                    <div className="ingredient-item__button-img">
                        <AiOutlinePlus />
                    </div>
                </Button>
                <span className="ingredient-item__value">
                    {quantity.toFixed(2)}
                </span>
                <Button
                    type="button"
                    onClick={() => onIngredientQtyChange(id, 'dec')}
                >
                    <div className="ingredient-item__button-img">
                        <AiOutlineMinus />
                    </div>
                </Button>
            </div>
        </li>
    );
};
export default IngredientItem;
