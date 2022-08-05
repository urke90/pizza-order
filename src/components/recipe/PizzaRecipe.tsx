import { useAppSelector } from 'hooks/useRedux';

import { IoFastFood } from 'react-icons/io5';

import './PizzaRecipe.scss';

type PizzaRecipeProps = {};

const PizzaRecipe: React.FC<PizzaRecipeProps> = () => {
    const pizzaToRender = useAppSelector(
        (state) => state.pizzaReducer.selectedPizza
    );

    const { title, image_url, source_url, ingredients } = pizzaToRender;

    console.log('pizzaToRender', pizzaToRender);

    return (
        <div className="recipe">
            <div className="recipe__heading">
                <h2>{title}</h2>
            </div>
            <div className="recipe__image">
                <img src={image_url} alt={title} />
            </div>
            <ul className="recipe__ingredients-list">
                {ingredients.map((ingredient) => (
                    <li className="recipe__ingredient-item">
                        <span className="recipe__ingredient-icon">
                            <IoFastFood color="#c80037" />
                        </span>{' '}
                        {ingredient}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PizzaRecipe;
