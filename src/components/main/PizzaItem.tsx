import React from 'react';
import { useAppDispatch } from 'hooks/useRedux';
import { savePizzaId } from 'redux/reducers/pizzaReducer';

import './PizzaItem.scss';

interface IPizzaItemProps {
    image_url: string;
    recipe_id: string;
    title: string;
}

const PizzaItem: React.FC<IPizzaItemProps> = ({
    recipe_id,
    title,
    image_url
}) => {
    const dispatch = useAppDispatch();

    const handleGetPizzaId = () =>
        dispatch(savePizzaId({ pizzaId: recipe_id }));

    return (
        <li className="pizza__item" onClick={handleGetPizzaId}>
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
