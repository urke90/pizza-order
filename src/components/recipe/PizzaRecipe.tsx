import { IoFastFood } from 'react-icons/io5';
import { BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import {
    AiOutlinePlus,
    AiOutlineMinus,
    AiFillMinusCircle
} from 'react-icons/ai';
import type { TIngredientActionType } from 'ts/ingredients';

import Button from 'shared/form/Button';

import './PizzaRecipe.scss';

interface IPizzaRecipeProps {
    title: string;
    image_url: string;
    source_url: string;
    ingredients: string[];
    onAddToCart: () => void;
    pizzaQuantity: number;
    onChangePizzaQuantity: (type: TIngredientActionType) => void;
}

const PizzaRecipe: React.FC<IPizzaRecipeProps> = ({
    title,
    image_url,
    source_url,
    ingredients,
    onAddToCart,
    pizzaQuantity,
    onChangePizzaQuantity
}) => {
    return (
        <div className="recipe">
            <div className="recipe__heading">
                <h2>{title}</h2>
            </div>
            <div className="recipe__image">
                <img src={image_url} alt={title} />
            </div>
            <div className="recipe__link">
                <a href={source_url} target="_blank" rel="noopener">
                    Chech the recipe online
                </a>
            </div>
            <ul className="recipe__ingredients-list">
                {ingredients.map((ingredient) => (
                    <li
                        key={ingredient + Math.random()}
                        className="recipe__ingredient-item"
                    >
                        <span className="recipe__ingredient-icon">
                            <IoFastFood color="#c80037" />
                        </span>{' '}
                        {ingredient}
                    </li>
                ))}
            </ul>
            <div className="recipe__buttons-wrapper">
                <p className="recipe__quantity">Quantity:</p>
                <div className="recipe__buttons-wrapper--quantity">
                    <Button
                        type="button"
                        onClick={() => onChangePizzaQuantity('inc')}
                    >
                        <div className="recipe__button--img">
                            <AiOutlinePlus />
                        </div>
                    </Button>
                    <span className="recipe__pizza--quantity">
                        {pizzaQuantity}
                    </span>
                    <Button
                        type="button"
                        onClick={() => onChangePizzaQuantity('dec')}
                        disabled={pizzaQuantity <= 1}
                    >
                        <div className="recipe__button--img">
                            <AiOutlineMinus />
                        </div>
                    </Button>
                </div>
                <Button type="button" onClick={onAddToCart}>
                    Add <BsFillCartPlusFill />
                </Button>
            </div>
        </div>
    );
};
export default PizzaRecipe;
