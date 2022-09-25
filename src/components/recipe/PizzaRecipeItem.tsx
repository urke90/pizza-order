import { IoFastFood } from 'react-icons/io5';

import './PizzaRecipeItem.scss';

interface IPizzaRecipeItemProps {
    ingredient: string;
}

const PizzaRecipeItem: React.FC<IPizzaRecipeItemProps> = ({ ingredient }) => {
    return (
        <li className="recipe__ingredient-item">
            <span className="recipe__ingredient-icon">
                <IoFastFood />
            </span>{' '}
            <span>{ingredient}</span>
        </li>
    );
};
export default PizzaRecipeItem;
