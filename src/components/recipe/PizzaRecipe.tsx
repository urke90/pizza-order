import { IoFastFood } from 'react-icons/io5';

import './PizzaRecipe.scss';

interface IPizzaRecipeProps {
    title: string;
    image_url: string;
    source_url: string;
    ingredients: string[];
}

const PizzaRecipe: React.FC<IPizzaRecipeProps> = ({
    title,
    image_url,
    source_url,
    ingredients
}) => {
    return (
        <div className="recipe">
            <div className="recipe__heading">
                <h2>{title}</h2>
            </div>
            <div className="recipe__image">
                <img src={image_url} alt={title} />
            </div>
            <a href={source_url}>Chech the recipe online</a>
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
        </div>
    );
};
export default PizzaRecipe;
