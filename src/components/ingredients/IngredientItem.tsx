import Button from 'shared/form/Button';
import { IConvertedIngredients } from 'ts/ingredients';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import './IngredientItem.scss';

interface IIngredientItemProps {
    ingredient: IConvertedIngredients;
}

const IngredientItem: React.FC<IIngredientItemProps> = (props) => {
    const { id, title, quantity } = props.ingredient;

    return (
        <li className="ingredient-item">
            <p className="ingredient-item__title">{title}</p>
            <div className="ingredient-item__wrapper">
                <Button type="button" onClick={() => {}}>
                    <div className="ingredient-item__button-img">
                        <AiOutlinePlus />
                    </div>
                </Button>
                <span className="ingredient-item__value">{quantity}</span>
                <Button secondary type="button" onClick={() => {}}>
                    <div className="ingredient-item__button-img">
                        <AiOutlineMinus />
                    </div>
                </Button>
            </div>
        </li>
    );
};
export default IngredientItem;
