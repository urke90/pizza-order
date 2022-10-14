import { memo } from 'react';

import { BsFillCartPlusFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import type { TIngredientActionType } from 'ts/ingredients';

import PizzaRecipeItem from './PizzaRecipeItem';
import Button from 'shared/form/Button';

import './PizzaRecipe.scss';

interface IPizzaRecipeProps {
    title: string;
    imageUrl: string;
    sourceUrl: string;
    ingredients: string[];
    pizzaQuantity: number;
    pizzaPrice: number;
    onAddToCart: () => void;
    onChangePizzaQuantity: (type: TIngredientActionType) => void;
}

const PizzaRecipe: React.FC<IPizzaRecipeProps> = ({
    title,
    imageUrl,
    sourceUrl,
    ingredients,
    onAddToCart,
    pizzaQuantity,
    pizzaPrice,
    onChangePizzaQuantity
}) => {
    const totalPrice = (pizzaPrice * pizzaQuantity).toFixed(2);

    return (
        <div className="recipe">
            <h2 className="recipe__heading">{title}</h2>
            <img className="recipe__image" src={imageUrl} alt={title} />
            <a
                className="recipe__link"
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
            >
                Chech the recipe online
            </a>
            <ul className="recipe__ingredients-list">
                {ingredients.length > 0 &&
                    ingredients.map((ingredient) => (
                        <PizzaRecipeItem
                            key={ingredient + Math.random()}
                            ingredient={ingredient}
                        />
                    ))}
            </ul>
            <h4 className="recipe__quantity--heading">Quantity:</h4>
            <div className="recipe__buttons-wrapper--quantity">
                <Button
                    type="button"
                    onClick={() => onChangePizzaQuantity('inc')}
                >
                    <AiOutlinePlus className="recipe__button-img" />
                </Button>
                <span className="recipe__pizza--quantity">{pizzaQuantity}</span>
                <Button
                    type="button"
                    onClick={() => onChangePizzaQuantity('dec')}
                    disabled={pizzaQuantity <= 1}
                >
                    <AiOutlineMinus className="recipe__button-img" />
                </Button>
            </div>
            <div className="recipe__price-cart-btn">
                <p className="recipe__price">Price: {totalPrice} $</p>
                <Button type="button" onClick={onAddToCart}>
                    Add <BsFillCartPlusFill />
                </Button>
            </div>
        </div>
    );
};
export default memo(PizzaRecipe);
