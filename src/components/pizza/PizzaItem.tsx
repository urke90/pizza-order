import { memo } from 'react';
import { useAppDispatch } from 'hooks/use-redux';
import { savePizzaId } from 'redux/reducers/pizza-reducer';

import './PizzaItem.scss';

interface IPizzaItemProps {
    imageUrl: string;
    recipeId: string;
    title: string;
}

const PizzaItem: React.FC<IPizzaItemProps> = ({
    recipeId,
    title,
    imageUrl
}) => {
    const dispatch = useAppDispatch();

    const handleGetPizzaId = () => dispatch(savePizzaId(recipeId));

    return (
        <li className="pizza__item" onClick={handleGetPizzaId}>
            <img
                className="pizza__img"
                src={imageUrl}
                alt={title}
                width={150}
            />
            <h3 className="pizza__title">{title}</h3>
        </li>
    );
};

export default memo(PizzaItem);
