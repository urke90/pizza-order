import Button from 'shared/form/Button';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './IngredientItem.scss';

interface IIngredientItemProps {}

const IngredientItem: React.FC<IIngredientItemProps> = () => {
    return (
        <li className="ingredient-item">
            <div className="ingredient-item__wrapper">
                <Button type="button" onClick={() => {}}>
                    <div className="ingredient-item__button-img">
                        <AiOutlinePlus />
                    </div>
                </Button>
                <span className="ingredient-item__value">0.25</span>
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
