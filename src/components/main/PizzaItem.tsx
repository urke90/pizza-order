import React from 'react';

import './PizzaItem.scss';

interface IPizzaItemProps {
    image_url: string;
    recipe_id: string;
    title: string;
    onGetRecipeId: (pizzaId: string) => void;
}

const PizzaItem: React.FC<IPizzaItemProps> = ({
    recipe_id,
    title,
    image_url,
    onGetRecipeId
}) => {
    return (
        <li className="pizza__item" onClick={() => onGetRecipeId(recipe_id)}>
            <div className="pizza__img">
                <img src={image_url} alt={title} width={150} />
            </div>
            <div className="pizza__title">
                <h3>{title}</h3>
            </div>
        </li>
    );
};
export default PizzaItem;
